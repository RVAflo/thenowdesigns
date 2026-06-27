import { Fragment } from 'react'

// "Maximize the impact of each letter" — splits a heading into per-letter spans
// that reveal with a staggered transition. Dependency-free; driven by the same
// IntersectionObserver `.in` mechanism as the rest of the site, and fully inert
// under prefers-reduced-motion (see app.css). Words stay intact (no mid-word wrap).
export type Seg = { text: string; em?: boolean }

export default function KineticHeading({
  segments,
  as: Tag = 'h1',
  className,
}: {
  segments: Seg[]
  as?: keyof JSX.IntrinsicElements
  className?: string
}) {
  let idx = 0
  return (
    <Tag className={className} data-kinetic="">
      {segments.map((seg, si) => {
        const tokens = seg.text.split(/(\s+)/)
        return (
          <Fragment key={si}>
            {tokens.map((tok, ti) => {
              if (tok === '') return null
              if (/^\s+$/.test(tok)) return <span key={ti} className="kspace"> </span>
              return (
                <span key={ti} className={'kw' + (seg.em ? ' kw--em' : '')}>
                  {[...tok].map((ch, ci) => {
                    const i = idx++
                    return (
                      <span key={ci} className="kl" style={{ ['--i' as string]: i } as React.CSSProperties}>
                        {ch}
                      </span>
                    )
                  })}
                </span>
              )
            })}
          </Fragment>
        )
      })}
    </Tag>
  )
}
