import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Soft bokeh depth field behind the cherry. Sprite texture is drawn on a canvas
// at runtime (no external asset). Slow drift + gentle pointer parallax.
export default function Particles({ count = 90 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)

  const texture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,240,228,0.95)')
    g.addColorStop(0.4, 'rgba(255,210,190,0.45)')
    g.addColorStop(1, 'rgba(255,210,190,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(c)
  }, [])

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.sin(i * 12.9898) * 43758.5453) % 1 * 9 - 4.5
      positions[i * 3 + 1] = (Math.sin(i * 78.233) * 12543.123) % 1 * 7 - 3.5
      positions[i * 3 + 2] = -1 - ((Math.sin(i * 3.17) * 9123.7) % 1) * 6
      scales[i] = 0.15 + ((Math.sin(i * 5.51) * 2310.2) % 1) * 0.35
    }
    return { positions, scales }
  }, [count])

  useFrame((state, delta) => {
    const p = points.current
    if (!p) return
    p.rotation.y += delta * 0.02
    p.position.x = THREE.MathUtils.lerp(p.position.x, state.pointer.x * 0.4, 0.04)
    p.position.y = THREE.MathUtils.lerp(p.position.y, state.pointer.y * 0.25, 0.04)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.4}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
        color="#ffd9c2"
      />
    </points>
  )
}
