import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// Fixed nav: backdrop blur on scroll, mobile slide-in menu. Ports script.js behaviour.
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)
  const active = (p: string) => (pathname === p || pathname === p + '/' ? 'active' : undefined)

  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')} id="nav">
      <Link to="/" className="brand" aria-label="The Now Designs">
        The N<span className="cherry-o" aria-hidden="true"></span>w Designs
        <span className="brand-dot live-dot" aria-hidden="true"></span>
      </Link>
      <div className={'nav-links' + (open ? ' open' : '')} id="navlinks">
        <Link to="/services/" className={active('/services')} onClick={close}>Services</Link>
        <Link to="/work/" className={active('/work')} onClick={close}>Work</Link>
        <Link to="/about/" className={active('/about')} onClick={close}>About</Link>
        <Link to="/#contact" className="btn btn--ink" onClick={close}>Book</Link>
      </div>
      <button
        className={'nav-toggle' + (open ? ' open' : '')}
        id="toggle"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  )
}
