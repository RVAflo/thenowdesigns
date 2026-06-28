import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import CookieBanner from './CookieBanner'

export default function Layout() {
  const { pathname, hash } = useLocation()
  const lenisRef = useRef<{ scrollTo: (t: Element | number, o?: object) => void; raf: (t: number) => void; destroy: () => void } | null>(null)

  // Weighted smooth scroll (Lenis) — desktop mouse only. Skipped on touch /
  // small screens / reduced-motion so mobile keeps fast, native scrolling.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    if (reduce || !fine || window.innerWidth < 760) return
    let raf = 0
    let cancelled = false
    let instance: { raf: (t: number) => void; destroy: () => void } | null = null
    import('lenis')
      .then(({ default: Lenis }) => {
        if (cancelled) return
        try {
          const lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.85 })
          instance = lenis
          lenisRef.current = lenis as never
          const loop = (t: number) => {
            lenis.raf(t)
            raf = requestAnimationFrame(loop)
          }
          raf = requestAnimationFrame(loop)
        } catch {
          /* fall back to native scroll */
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
      if (raf) cancelAnimationFrame(raf)
      if (instance) instance.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll behaviour on navigation: hash target (via Lenis when active) else top.
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -80 })
        else el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    if (lenisRef.current) lenisRef.current.scrollTo(0)
    else window.scrollTo({ top: 0 })
  }, [pathname, hash])

  // Scroll-reveal + kinetic headings (ports the IntersectionObserver). Per route.
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

  // Tab-hopper: swap the title to a cherry nudge when the visitor leaves.
  useEffect(() => {
    let saved = ''
    let everVisible = !document.hidden
    const onVis = () => {
      if (!document.hidden) everVisible = true
      if (document.hidden && everVisible && !saved) {
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
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
