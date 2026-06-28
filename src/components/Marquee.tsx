import { Fragment } from 'react'

// Ink band with scrolling text + cherry pips (ported 1:1 from the static site).
export default function Marquee({ text = 'All done for you', repeat = 6 }: { text?: string; repeat?: number }) {
  const Line = () => (
    <span>
      {Array.from({ length: repeat }).map((_, i) => (
        <Fragment key={i}>
          {text} <i className="pip"></i>{' '}
        </Fragment>
      ))}
    </span>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <Line />
        <Line />
      </div>
    </div>
  )
}
