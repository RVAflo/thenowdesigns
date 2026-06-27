// Hero visual. Phase 2: static poster (also the LCP element). Phase 4 layers a
// lazy-loaded WebGL cherry canvas on top of this exact box (zero layout shift).
export default function HeroVisual() {
  return (
    <figure className="hero__visual hero__media" data-reveal data-d="2">
      <div className="hero__frame hero__frame--video">
        <img
          className="hero__video"
          src="/img/hero-cherry.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />
      </div>
    </figure>
  )
}
