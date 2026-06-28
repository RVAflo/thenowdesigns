import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from './HeroScene'

// Lazy-loaded WebGL hero. Default export so HeroVisual can React.lazy() it,
// keeping three.js out of the critical path until the capability gate passes.
export default function HeroCanvas({ onReady }: { onReady?: () => void }) {
  const scroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      // 0 at the top, ramping to 1 across roughly the first viewport
      scroll.current = Math.min(Math.max(window.scrollY / (window.innerHeight * 1.7), 0), 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Canvas
      className="hero__canvas"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5], fov: 35 }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0)
        onReady?.()
      }}
    >
      <HeroScene scroll={scroll} />
    </Canvas>
  )
}
