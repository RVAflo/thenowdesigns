import { useEffect, useState } from 'react'

// Decides whether to mount WebGL at all. SSR-safe: returns false on the server
// and during the first client render, then flips true only on capable devices.
// Honors prefers-reduced-motion, WebGL availability, viewport, cores, memory,
// and data-saver — so mobile / low-end / reduced-motion fall back to the poster.
export function useCapability(): boolean {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl2') || c.getContext('webgl')
      if (!gl) return
      const wideEnough = window.innerWidth >= 760
      const enoughCores = (navigator.hardwareConcurrency || 4) >= 4
      const dm = (navigator as unknown as { deviceMemory?: number }).deviceMemory
      const enoughMem = dm == null ? true : dm >= 4
      const saveData = (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData
      if (wideEnough && enoughCores && enoughMem && !saveData) setOk(true)
    } catch {
      /* leave 3D off on any probe failure */
    }
  }, [])
  return ok
}
