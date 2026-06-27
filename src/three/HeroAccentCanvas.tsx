import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import Cherry from './Cherry'

// Lightweight subpage accent: the floating cherry only — no particles, no
// bloom, no scroll journey — so /about, /services, /work stay fast.
export default function HeroAccentCanvas() {
  const scroll = useRef(0) // no pull-in on subpages
  return (
    <Canvas
      className="accent__canvas"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5], fov: 35 }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#fff3e6" />
      <directionalLight position={[-4, -1, -2]} intensity={0.8} color="#9FC2EA" />
      <Cherry scroll={scroll} />
      <ContactShadows position={[0, -1.55, 0]} opacity={0.32} scale={9} blur={2.8} far={3.5} color="#3a1208" />
      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 2.5, 3]} scale={[6, 6, 1]} color="#fff3e6" />
        <Lightformer intensity={1.1} position={[-3, 0, 2]} scale={[4, 4, 1]} color="#9FC2EA" />
      </Environment>
    </Canvas>
  )
}
