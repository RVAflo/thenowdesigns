import { useState } from 'react'

// Tap-to-pick options reduce mobile friction vs. an open text field.
const NEEDS = ['Brand New Site', 'Redesign Existing Site', 'E-Commerce', 'Just Exploring']

// Web3Forms AJAX submit with inline status — ports script.js form logic.
export default function ContactForm() {
  const [sending, setSending] = useState(false)
  const [need, setNeed] = useState('')
  const [status, setStatus] = useState<{ msg: string; cls: '' | 'ok' | 'err' }>({ msg: '', cls: '' })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (sending) return
    if (!need) {
      setStatus({ msg: 'Pick what you need so we can point you right.', cls: 'err' })
      return
    }
    const form = e.currentTarget
    setSending(true)
    setStatus({ msg: '', cls: '' })
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      const j = await r.json()
      if (j.success) {
        form.reset()
        setNeed('')
        setStatus({ msg: "Thanks — we'll reply today 🍒", cls: 'ok' })
      } else {
        setStatus({ msg: 'Hmm, that didn’t send. Email us at aiden@thenowdesigns.com', cls: 'err' })
      }
    } catch {
      setStatus({ msg: 'Network error. Email us at aiden@thenowdesigns.com', cls: 'err' })
    } finally {
      setSending(false)
    }
  }

  return (
    <form id="tnd-form" onSubmit={onSubmit} action="https://api.web3forms.com/submit" method="POST">
      <input type="hidden" name="access_key" value="cefe34f9-7266-4558-a8ee-f3a8ad09e6de" />
      <input type="hidden" name="subject" value="New inquiry from thenowdesigns.com" />
      <input type="hidden" name="from_name" value="The Now Designs website" />
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
      <div className="form-row">
        <div className="field">
          <label htmlFor="f-first">First name</label>
          <input id="f-first" type="text" name="First name" required />
        </div>
        <div className="field">
          <label htmlFor="f-last">Last name</label>
          <input id="f-last" type="text" name="Last name" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input id="f-email" type="email" name="email" required />
      </div>
      <div className="field">
        <label id="need-label">What do you need?</label>
        <div className="pills" role="group" aria-labelledby="need-label">
          {NEEDS.map((n) => (
            <button
              type="button"
              key={n}
              className={'pill' + (need === n ? ' is-active' : '')}
              aria-pressed={need === n}
              onClick={() => {
                setNeed(n)
                if (status.cls === 'err') setStatus({ msg: '', cls: '' })
              }}
            >
              {n}
            </button>
          ))}
        </div>
        {/* carries the pick through to Web3Forms */}
        <input type="hidden" name="What do you need" value={need} />
      </div>
      <div className="field">
        <label htmlFor="f-msg">Tell us more</label>
        <textarea id="f-msg" name="Message" placeholder="A sentence or two about your project." />
      </div>
      <button type="submit" id="tnd-submit" className="btn btn--cherry btn--lg" disabled={sending}>
        <span className="btn__label">{sending ? 'Sending…' : 'Send it'}</span> <span className="arrow">→</span>
      </button>
      <p className="form-note">Same-day reply — no pitch, no pressure.</p>
      <p id="tnd-form-status" className={'form-status ' + status.cls} role="status" aria-live="polite">
        {status.msg}
      </p>
    </form>
  )
}
