import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// The brand cherry, built procedurally: two glossy fruit + two stems meeting at
// a top point. Idle float + spin, damped pointer parallax, and a scroll-driven
// "pull-in" scale. To swap in a Higgsfield-generated mesh later, load
// /models/cherry.glb with useGLTF and render it in place of this group.
export default function Cherry({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null)

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

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    // idle spin + bob
    g.rotation.y += delta * 0.22
    g.position.y = -0.1 + Math.sin(t * 1.1) * 0.06
    // damped pointer parallax
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.16, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.12, 0.05)
    // scroll "pull-in": grow + drift toward the viewer as the hero scrolls
    const s = scroll.current
    const target = 1 + s * 0.55
    const cur = g.scale.x
    g.scale.setScalar(THREE.MathUtils.lerp(cur, target, 0.08))
  })

  return (
    <group ref={group} position={[0, -0.1, 0]} rotation={[0.05, 0, 0]}>
      {/* fruit */}
      <mesh position={[-0.5, -0.25, 0]} castShadow>
        <sphereGeometry args={[0.62, 64, 64]} />
        <meshPhysicalMaterial
          color="#E1452E"
          roughness={0.18}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.14}
          sheen={0.5}
          sheenColor="#ff7a5c"
          envMapIntensity={1.1}
        />
      </mesh>
      <mesh position={[0.5, -0.4, 0.12]} castShadow>
        <sphereGeometry args={[0.62, 64, 64]} />
        <meshPhysicalMaterial
          color="#C5391F"
          roughness={0.2}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.16}
          sheen={0.5}
          sheenColor="#ff7a5c"
          envMapIntensity={1.05}
        />
      </mesh>
      {/* stems */}
      <mesh geometry={stemGeoA}>
        <meshStandardMaterial color="#3f5a23" roughness={0.6} metalness={0} />
      </mesh>
      <mesh geometry={stemGeoB}>
        <meshStandardMaterial color="#46612a" roughness={0.6} metalness={0} />
      </mesh>
    </group>
  )
}
