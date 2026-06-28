import { Suspense, lazy, useEffect, useState } from 'react'
import { useCapability } from '../three/useCapability'
import SafeBoundary from './SafeBoundary'

// three.js is code-split here: it only downloads + mounts after the page has
// loaded AND the device passes the capability gate. The poster stays the LCP
// element and the fallback; the canvas cross-fades in over its exact box.
const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

export default function HeroVisual() {
  const enabled = useCapability()
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <figure className="hero__visual hero__media" data-reveal data-d="2">
      <div className={'hero__frame hero__frame--video' + (ready ? ' is-3d-ready' : '')}>
        <img className="hero__video" src="/img/hero-cherry.jpg" alt="A glossy cherry — the Now Designs mark" fetchPriority="high" />
        {mounted && enabled && (
          <SafeBoundary>
            <Suspense fallback={null}>
              <HeroCanvas onReady={() => setReady(true)} />
            </Suspense>
          </SafeBoundary>
        )}
      </div>
    </figure>
  )
}
