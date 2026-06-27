import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import CookieBanner from './CookieBanner'

export default function Layout() {
  const { pathname, hash } = useLocation()

  // Scroll behaviour on navigation: jump to a hash target if present, else top.
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  // Scroll-reveal — ports the IntersectionObserver from the old script.js, and
  // also drives the per-letter kinetic headings. Re-runs on each route change.
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll('[data-reveal]:not(.in),[data-kinetic]:not(.in)'),
    )
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.14 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  // Tab-hopper: when the visitor leaves the tab, swap the title to a cherry nudge;
  // restore it (respecting the current route's title) when they come back.
  useEffect(() => {
    let saved = ''
    const onVis = () => {
      if (document.hidden) {
        saved = document.title
        document.title = "🍒 Don't settle for vanilla."
      } else if (saved) {
        document.title = saved
        saved = ''
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <CookieBanner />
    </>
  )
}
