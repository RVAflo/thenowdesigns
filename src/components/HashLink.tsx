import { useNavigate, useLocation } from 'react-router-dom'
import type { MouseEvent, ReactNode } from 'react'

// Same-page hash links don't update history (no rerender = no scroll) when
// you're already on the target route, so vanilla <Link to="/#contact"> from /
// looks "broken." This handles the scroll itself: if already on the target
// pathname, scroll to the hash (via Lenis if running); otherwise navigate.
type LenisLike = { scrollTo: (t: Element | number | string, o?: object) => void }
const getLenis = (): LenisLike | undefined =>
  (typeof window !== 'undefined' && (window as unknown as { __lenis?: LenisLike }).__lenis) || undefined

export default function HashLink({
  to,
  className,
  onClick,
  children,
  target,
  rel,
}: {
  to: string
  className?: string
  onClick?: () => void
  children: ReactNode
  target?: string
  rel?: string
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [path, hashRaw] = to.split('#')
  const targetPath = path || '/'
  const hash = hashRaw ? '#' + hashRaw : ''

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // let modified clicks (cmd/ctrl/middle) behave like normal anchors
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
    if (target && target !== '_self') return
    e.preventDefault()
    onClick?.()
    const samePath = pathname === targetPath || pathname === targetPath + '/'
    if (samePath && hash) {
      const el = document.querySelector(hash)
      if (el) {
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(el, { offset: -80 })
        else el.scrollIntoView({ behavior: 'smooth' })
        // keep the URL in sync (no history thrash)
        if (window.location.hash !== hash) history.replaceState(null, '', targetPath + hash)
        return
      }
    }
    navigate(to)
  }

  return (
    <a href={to} className={className} onClick={handleClick} target={target} rel={rel}>
      {children}
    </a>
  )
}
