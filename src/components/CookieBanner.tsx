import { useEffect, useState } from 'react'

// Essential-cookie notice, shows once, choice stored locally. Ports script.js.
export default function CookieBanner() {
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('tnd-cookie-choice')) {
        setMounted(true)
        requestAnimationFrame(() => setShow(true))
      }
    } catch {
      /* private mode: skip */
    }
  }, [])

  if (!mounted) return null

  const close = (choice: string) => {
    try {
      localStorage.setItem('tnd-cookie-choice', choice)
    } catch {
      /* ignore */
    }
    setShow(false)
    setTimeout(() => setMounted(false), 500)
  }

  return (
    <div className={'cookie-banner' + (show ? ' show' : '')}>
      <p>
        We use only essential cookies to make this site work, plus minimal third-party services
        (checkout &amp; fonts). See our <a href="/cookies/">Cookie Policy</a>.
      </p>
      <div className="cookie-actions">
        <button className="decline" type="button" onClick={() => close('declined')}>
          Decline
        </button>
        <button className="accept" type="button" onClick={() => close('accepted')}>
          Accept
        </button>
      </div>
    </div>
  )
}
