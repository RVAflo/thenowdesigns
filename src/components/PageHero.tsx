import KineticHeading, { type Seg } from './KineticHeading'

// Shared subpage hero. Phase 5 mounts a lightweight floating-cherry 3D accent
// in the corner here (capability-gated); for now it is clean kinetic type.
export default function PageHero({
  eyebrow,
  heading,
  lead,
}: {
  eyebrow: string
  heading: Seg[]
  lead: string
}) {
  return (
    <header className="page-hero">
      <div className="wrap">
        <span className="eyebrow" data-reveal>{eyebrow}</span>
        <KineticHeading as="h1" segments={heading} />
        <p className="lead" data-reveal data-d="2">{lead}</p>
      </div>
    </header>
  )
}
