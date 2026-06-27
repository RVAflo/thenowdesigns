import { Component, type ReactNode } from 'react'

// Catches any failure from the lazy 3D subtree (chunk load error, WebGL/driver
// error, runtime throw) so the rest of the page — and the poster fallback —
// keep working. Renders `fallback` (default: nothing) instead of crashing.
export default class SafeBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    /* swallow — 3D is purely additive */
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
