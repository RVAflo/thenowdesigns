import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import HashLink from '../components/HashLink'
import KineticHeading from '../components/KineticHeading'
import Marquee from '../components/Marquee'
import HeroVisual from '../components/HeroVisual'
import ContactForm from '../components/ContactForm'

const SERVICES = [
  { name: 'Web Design', tag: 'Built by hand' },
  { name: 'Branding', tag: 'A point of view' },
  { name: 'Search Engine Optimization', tag: 'Found on Google' },
  { name: 'WordPress Support', tag: 'Fixed & looked after' },
  { name: 'Website Maintenance', tag: 'Always up to date' },
]

// Selected work shown on the homepage. Honest by design: one real, clickable
// live preview hosted on this domain + three labelled in-house concept builds.
// Swap these for real client domains as projects ship.
const WORKS = [
  { title: 'Karis Hair Salon', caption: 'Karis Hair Salon', img: '/preview/karis/img/karis-hero.jpg', href: '/preview/karis/', live: true },
  { title: 'Brown Bloom', caption: 'Brown Bloom · café', img: '/img/work-cafe.jpg', href: '/work/', live: false },
  { title: 'Velura', caption: 'Velura · e-commerce', img: '/img/work-skincare.jpg', href: '/work/', live: false },
  { title: 'Meridian Legal', caption: 'Meridian Legal · professional', img: '/img/work-law.jpg', href: '/work/', live: false },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>The Now Designs — AI-accelerated web studio</title>
        <meta name="description" content="AI-accelerated web studio. We design, build, and launch your whole website for you — live in weeks, owned outright by you. Neuro-informed design, hand-finished." />
        <meta property="og:title" content="The Now Designs — AI-accelerated web studio" />
        <meta property="og:description" content="Your whole website, done for you. Designed, built, and launched — AI-accelerated, hand-finished, yours to keep." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thenowdesigns.com/" />
        <meta property="og:image" content="https://thenowdesigns.com/img/og-card.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://thenowdesigns.com/" />
      </Head>

      {/* 1 · SEE — hero pattern interrupt (salience: 3D + kinetic type + loss hook) */}
      <header className="hero hero--split">
        <div className="hero__inner hero__grid">
          <div className="hero__copy">
            <span className="aco-pill" data-reveal>
              <span className="live-dot" aria-hidden="true"></span> AI-accelerated · 100% human-finished
            </span>
            <KineticHeading
              className="display"
              segments={[{ text: 'Your whole website. ' }, { text: 'Done for you.', em: true }]}
            />
            <p className="lead" data-reveal data-d="2">
              A slow, forgettable site quietly costs you customers. We build the fast,
              unforgettable one — live in weeks, yours to keep.
            </p>
            <div className="hero__cta" data-reveal data-d="3">
              <HashLink to="/#contact" className="btn btn--cherry btn--lg">
                Get a free teardown <span className="arrow">→</span>
              </HashLink>
              <Link to="/work/" className="hero__link">
                see the work <span className="arrow">→</span>
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>
      </header>

      {/* 2 · MARQUEE */}
      <Marquee />

      {/* 3 · WANT — the gap (loss aversion: current self vs ideal self) */}
      <section className="sec gap" id="gap">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">The difference</span>
            <h2 className="h-sec">Same business. <em>Different result.</em></h2>
          </div>
          <div className="gap__grid">
            <div className="gap__col" data-reveal>
              <span className="gap__tag gap__tag--now">Right now</span>
              <ul className="gap__list">
                <li>Loads slow — they leave before it paints.</li>
                <li>Looks like a template — instantly forgettable.</li>
                <li>Reads flat — no reason to act today.</li>
              </ul>
            </div>
            <div className="gap__col gap__col--win" data-reveal data-d="1">
              <span className="gap__tag gap__tag--win">With us</span>
              <ul className="gap__list gap__list--win">
                <li>Loads before they blink.</li>
                <li>Looks like nobody else.</li>
                <li>Built to make them act now.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · WANT — the cherry (desire / novelty) */}
      <section className="sec split" id="cherry">
        <div className="wrap split__grid">
          <figure className="split__media" data-reveal>
            <div className="split__frame">
              <img src="/img/cherry-plate.jpg" alt="A single fresh cherry resting on a clean plate" loading="lazy" />
            </div>
          </figure>
          <div className="split__copy" data-reveal data-d="1">
            <span className="eyebrow">Why the cherry</span>
            <KineticHeading
              as="h2"
              className="h-sec"
              segments={[{ text: 'Plain vanilla. ' }, { text: 'Cherry on top.', em: true }]}
            />
            <p className="split__sub">Anyone can build a site that works. We build the one people remember.</p>
            <p className="split__line">AI-accelerated scaffolding. 100% human-finished design. Agency-grade in weeks — without the agency invoice.</p>
          </div>
        </div>
      </section>

      {/* 4.5 · PROOF — selected work on the main stage (real live preview + honest concepts) */}
      <section className="sec sec--cream works" id="works">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">Selected work</span>
            <h2 className="h-sec">Proof, not <em>promises.</em></h2>
          </div>
          <div className="works-grid">
            {WORKS.map((w, i) => {
              const inner = (
                <>
                  <div className="workpiece__media">
                    <span className={'workpiece__flag' + (w.live ? ' is-live' : '')}>
                      {w.live ? 'Live preview' : 'Concept'}
                    </span>
                    <img src={w.img} alt={w.title + ' — The Now Designs'} loading="lazy" />
                  </div>
                  <div className="workpiece__cap">
                    <span>{w.caption}</span>
                    <span className="arrow">{w.live ? '↗' : '→'}</span>
                  </div>
                </>
              )
              return w.live ? (
                <a key={w.title} href={w.href} target="_blank" rel="noopener" className="workpiece" data-reveal data-d={(i % 4) + 1}>
                  {inner}
                </a>
              ) : (
                <Link key={w.title} to={w.href} className="workpiece" data-reveal data-d={(i % 4) + 1}>
                  {inner}
                </Link>
              )
            })}
          </div>
          <p className="works-note" data-reveal>
            One live client preview, three in-house concept builds — your project takes a slot here
            when it ships. <Link to="/work/">See all work →</Link>
          </p>
        </div>
      </section>

      {/* MID-PAGE CTA — catch convinced visitors before the long scroll to contact */}
      <section className="sec mid-cta" aria-labelledby="mid-cta-h">
        <div className="wrap mid-cta__wrap">
          <p id="mid-cta-h" className="mid-cta__line" data-reveal>
            Like what you see? <em>Let's build yours next.</em>
          </p>
          <HashLink to="/#contact" className="btn btn--cherry btn--lg">
            Book a free call <span className="arrow">→</span>
          </HashLink>
        </div>
      </section>

      {/* 5 · WANT — neuro-informed design (dopamine: anticipation, then payoff) */}
      <section className="sec sec--ink neuro" id="method">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">Our method · neuro-informed design</span>
            <h2 className="h-sec">We design for the brain — <em>before</em> the eye.</h2>
            <p>Attention is decided in the first five seconds, below conscious thought. We engineer every page around how the brain actually reads, feels, and decides.</p>
          </div>
          <div className="neuro__grid">
            <div className="neuro__item" data-reveal data-d="1">
              <h3><span className="ic">⚡</span> The 5-second window</h3>
              <p>Visitors decide to trust you or bounce in 5 seconds. We design the top of your site to pass the blink test before conscious thought even kicks in.</p>
            </div>
            <div className="neuro__item" data-reveal data-d="2">
              <h3><span className="ic">◆</span> Anticipation, then payoff</h3>
              <p>People don't read websites; they scan them. We build visual momentum and layout pacing that naturally pulls a visitor's thumb down the page.</p>
            </div>
            <div className="neuro__item" data-reveal data-d="3">
              <h3><span className="ic">🧠</span> VRIBE — our in-silico lab</h3>
              <p>We pressure-test our creative against predicted attention models before it ships. You get a site backed by visual behavioral data, not just agency guesswork.</p>
            </div>
          </div>
          <p className="neuro__note" data-reveal>Methodology and R&amp;D, not a per-visitor service or mind-reading. VRIBE is in-house research; we apply what it teaches.</p>
        </div>
      </section>

      {/* 6 · SERVICES — five lean cards */}
      <section className="sec" id="services">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">What we do</span>
            <h2 className="h-sec">Everything you need. <em>Nothing you don't.</em></h2>
          </div>
          <div className="svc-grid svc-grid--lean">
            {SERVICES.map((s, i) => (
              <article className="svc svc--lean" data-reveal data-d={(i % 4) + 1} key={s.name}>
                <span className="svc__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="svc__name">{s.name}</h3>
                <span className="svc__tag">{s.tag}</span>
              </article>
            ))}
          </div>
          <p className="svc-more" data-reveal>
            <Link to="/services/">See all services →</Link>
          </p>
        </div>
      </section>

      {/* 7 · WHY US — quiet blue panel */}
      <section className="sec sec--blue why why--lean" id="why">
        <div className="wrap">
          <p className="why-quote" data-reveal>Few clients. Full attention. <em>Real results.</em></p>
          <div className="why-grid">
            <div className="why-item" data-reveal data-d="1"><h3><span className="i">01</span> Text the person who builds it.</h3></div>
            <div className="why-item" data-reveal data-d="2"><h3><span className="i">02</span> Loads in under a second.</h3></div>
            <div className="why-item" data-reveal data-d="3"><h3><span className="i">03</span> You own the code, domain &amp; data — forever.</h3></div>
          </div>
        </div>
      </section>

      {/* 8 · CALL — process + de-escalated micro-step CTA */}
      <section className="sec sec--cream" id="process">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">How it works</span>
            <h2 className="h-sec">Live in <em>weeks</em>, not months.</h2>
          </div>
          <div className="steps steps--flow steps--roll">
            <div className="step" data-reveal data-d="1"><div className="step__n">01</div><h4>Call</h4><p>A free, no-pitch chat about what you're building.</p></div>
            <div className="step" data-reveal data-d="2"><div className="step__n">02</div><h4>Design</h4><p>Real screens in your brand — shaped with you.</p></div>
            <div className="step" data-reveal data-d="3"><div className="step__n">03</div><h4>Build</h4><p>Hand-coded, fast, and SEO-ready.</p></div>
            <div className="step" data-reveal data-d="4"><div className="step__n">04</div><h4>Launch</h4><p>We ship it and hand you the keys.</p></div>
          </div>
          <div className="callout" data-reveal>
            <p className="callout__line">
              Start with a <em>free 5-minute teardown</em> of your current site. No pitch — just a
              diagnostic. Not a fit? We'll tell you who to call instead.
            </p>
            <HashLink to="/#contact" className="btn btn--cherry btn--lg">
              Get my teardown <span className="arrow">→</span>
            </HashLink>
          </div>
        </div>
      </section>

      {/* 9 · CLOSE — the standard / stats (the logical alibi) */}
      <section className="sec" id="standard">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">The standard</span>
            <h2 className="h-sec">Built to a <em>standard.</em></h2>
          </div>
          <div className="stats">
            <div data-reveal data-d="1"><div className="stat__n">100<em>%</em></div><div className="stat__l">Human-coded front end, never templated</div></div>
            <div data-reveal data-d="2"><div className="stat__n">Sub<em>-second</em></div><div className="stat__l">Load times we engineer for</div></div>
            <div data-reveal data-d="3"><div className="stat__n">SEO<em>-first</em></div><div className="stat__l">Built to rank from line one</div></div>
            <div data-reveal data-d="4"><div className="stat__n">6</div><div className="stat__l">Clients at a time, on purpose</div></div>
          </div>
        </div>
      </section>

      {/* 10 · CLOSE — trust band (risk reversal) */}
      <section className="sec sec--ink trust" id="trust">
        <div className="wrap">
          <div className="trust-band trust-band--solo" data-reveal>
            <span className="trust-band__lbl">Secured by</span>
            <span className="trust-chip"><b>Cloudflare</b></span>
            <span className="trust-chip"><b>Automated</b> Daily Backups</span>
            <span className="trust-chip"><b>Enterprise</b> Spam Shielding</span>
            <span className="trust-chip">You own everything</span>
          </div>
        </div>
      </section>

      {/* 11 · CLOSE — budget statement (replaces pricing; kills the price-shock) */}
      <section className="sec budget" id="pricing">
        <div className="wrap budget__wrap">
          <span className="eyebrow" data-reveal>What it costs</span>
          <KineticHeading
            as="h2"
            className="budget__head"
            segments={[{ text: 'We cater to ' }, { text: 'your budget.', em: true }]}
          />
          <p className="budget__line" data-reveal data-d="1">
            Tell us what you've set aside for your website — we'll build the best site that number
            can buy. No tiers, no games, and you own everything when it ships.
          </p>
          <div data-reveal data-d="2">
            <HashLink to="/#contact" className="btn btn--cherry btn--lg">
              Tell us your budget <span className="arrow">→</span>
            </HashLink>
          </div>
        </div>
      </section>

      {/* 12 · ACTION — contact */}
      <section className="sec sec--cream contact" id="contact">
        <div className="wrap contact-grid">
          <div data-reveal>
            <span className="eyebrow" style={{ color: 'var(--ink)' }}>Let's team up</span>
            <h2 className="h-sec" style={{ marginTop: 16 }}>Tell us what <em>you're building.</em></h2>
            <p className="lead" style={{ color: 'rgba(21,20,15,.72)' }}>
              We'll tell you what we'd do — and what it costs. Free. Same-day reply from the person who builds it.
            </p>
            <ContactForm />
          </div>
          <aside className="contact__aside" data-reveal data-d="2">
            <h3>What the first call is</h3>
            <div className="pts">
              <div><span className="c">✓</span> 15 minutes — no slide decks</div>
              <div><span className="c">✓</span> Leave with 3 fixes, hire us or not</div>
              <div><span className="c">✓</span> Same-day reply from the person who builds it</div>
            </div>
            <p className="aside__or">Prefer email?</p>
            <a className="mail" href="mailto:aiden@thenowdesigns.com">aiden@thenowdesigns.com</a>
          </aside>
        </div>
      </section>
    </>
  )
}
