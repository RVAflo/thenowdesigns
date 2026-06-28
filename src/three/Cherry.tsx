import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import SafeBoundary from '../components/SafeBoundary'

// The brand cherry. Prefers a photoreal GLB at /models/cherry.glb if present
// (drop the file in, redeploy — no code change), else a hand-built procedural
// cherry (also the loading state + failure fallback). Lives in an animated
// group: idle float + spin, damped pointer parallax, and a scroll-driven
// "vacuum" — it scales up and rushes toward the camera as you scroll, like
// the page is sucking you in.
const GLB_URL = '/models/cherry.glb'

function ProceduralCherry() {
  const stemGeoA = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.5, 0.35, 0),
      new THREE.Vector3(-0.55, 1.0, -0.1),
      new THREE.Vector3(0.06, 1.3, 0),
    )
    return new THREE.TubeGeometry(curve, 40, 0.05, 10, false)
  }, [])
  const stemGeoB = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0.5, 0.2, 0.12),
      new THREE.Vector3(0.7, 0.95, 0.1),
      new THREE.Vector3(0.06, 1.3, 0),
    )
    return new THREE.TubeGeometry(curve, 40, 0.05, 10, false)
  }, [])
  return (
    <>
      <mesh position={[-0.5, -0.25, 0]} castShadow>
        <sphereGeometry args={[0.62, 64, 64]} />
        <meshPhysicalMaterial color="#E1452E" roughness={0.18} metalness={0} clearcoat={1} clearcoatRoughness={0.14} sheen={0.5} sheenColor="#ff7a5c" envMapIntensity={1.1} />
      </mesh>
      <mesh position={[0.5, -0.4, 0.12]} castShadow>
        <sphereGeometry args={[0.62, 64, 64]} />
        <meshPhysicalMaterial color="#C5391F" roughness={0.2} metalness={0} clearcoat={1} clearcoatRoughness={0.16} sheen={0.5} sheenColor="#ff7a5c" envMapIntensity={1.05} />
      </mesh>
      <mesh geometry={stemGeoA}>
        <meshStandardMaterial color="#3f5a23" roughness={0.6} metalness={0} />
      </mesh>
      <mesh geometry={stemGeoB}>
        <meshStandardMaterial color="#46612a" roughness={0.6} metalness={0} />
      </mesh>
    </>
  )
}

function CherryModel() {
  const { scene } = useGLTF(GLB_URL)
  const obj = useMemo(() => {
    const s = scene.clone(true)
    const box = new THREE.Box3().setFromObject(s)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    s.position.sub(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    s.scale.setScalar(2.2 / maxDim)
    return s
  }, [scene])
  return <primitive object={obj} />
}

export default function Cherry({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null)
  const [useGlb, setUseGlb] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(GLB_URL, { method: 'HEAD' })
      .then((r) => { if (alive && r.ok) setUseGlb(true) })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const s = scroll.current
    // spin (accelerates as you scroll in) + idle bob
    g.rotation.y += delta * (0.22 + s * 1.4)
    g.position.y = -0.1 + Math.sin(t * 1.1) * 0.06
    // damped pointer parallax
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.16, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.12, 0.05)
    // VACUUM: grow hard and rush toward the camera (which sits at z=5)
    const targetScale = 1 + s * 2.2
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, 0.1))
    g.position.z = THREE.MathUtils.lerp(g.position.z, s * 3.2, 0.1)
  })

  return (
    <group ref={group} position={[0, -0.1, 0]} rotation={[0.05, 0, 0]}>
      {useGlb ? (
        <SafeBoundary fallback={<ProceduralCherry />}>
          <Suspense fallback={<ProceduralCherry />}>
            <CherryModel />
          </Suspense>
        </SafeBoundary>
      ) : (
        <ProceduralCherry />
      )}
    </group>
  )
}
