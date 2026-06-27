import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Cherry from './Cherry'
import Particles from './Particles'

// Scene contents: warm key + cool brand-blue rim, an in-code studio environment
// (no external HDR fetch) for glossy reflections, grounded contact shadow, a
// bokeh depth field, and a restrained bloom that only lights the specular pop.
export default function HeroScene({ scroll }: { scroll: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#fff3e6" />
      <directionalLight position={[-4, -1, -2]} intensity={0.85} color="#9FC2EA" />

      <Cherry scroll={scroll} />
      <Particles />

      <ContactShadows position={[0, -1.55, 0]} opacity={0.42} scale={9} blur={2.8} far={3.5} color="#3a1208" />

      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 2.5, 3]} scale={[6, 6, 1]} color="#fff3e6" />
        <Lightformer intensity={1.1} position={[-3, 0, 2]} scale={[4, 4, 1]} color="#9FC2EA" />
        <Lightformer intensity={1.4} position={[3, -1, 2]} scale={[3, 3, 1]} color="#ffd9c2" />
      </Environment>

      <EffectComposer>
        <Bloom intensity={0.55} luminanceThreshold={0.82} luminanceSmoothing={0.25} mipmapBlur />
      </EffectComposer>
    </>
  )
}
