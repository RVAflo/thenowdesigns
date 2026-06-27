import { Suspense, lazy, useEffect, useState } from 'react'
import KineticHeading, { type Seg } from './KineticHeading'
import { useCapability } from '../three/useCapability'
import SafeBoundary from './SafeBoundary'

// Shared subpage hero with kinetic type and a lightweight, capability-gated,
// lazy-loaded floating-cherry 3D accent in the corner (poster-free; the blue
// panel is the fallback when 3D is off).
const HeroAccentCanvas = lazy(() => import('../three/HeroAccentCanvas'))

export default function PageHero({
  eyebrow,
  heading,
  lead,
}: {
  eyebrow: string
  heading: Seg[]
  lead: string
}) {
  const enabled = useCapability()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="page-hero">
      {mounted && enabled && (
        <div className="page-hero__accent" aria-hidden="true">
          <SafeBoundary>
            <Suspense fallback={null}>
              <HeroAccentCanvas />
            </Suspense>
          </SafeBoundary>
        </div>
      )}
      <div className="wrap">
        <span className="eyebrow" data-reveal>{eyebrow}</span>
        <KineticHeading as="h1" segments={heading} />
        <p className="lead" data-reveal data-d="2">{lead}</p>
      </div>
    </header>
  )
}
