import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Marquee from '../components/Marquee'

export default function About() {
  return (
    <>
      <Head>
        <title>About — The Now Designs</title>
        <meta name="description" content="The Now Designs is a done-for-you web studio that hand-builds fast, beautiful, conversion-first websites. Few clients. Full attention. Real results." />
        <meta property="og:title" content="About — The Now Designs" />
        <meta property="og:description" content="A small studio that builds like a big one — fast, beautiful, conversion-first websites, all done for you." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thenowdesigns.com/about/" />
        <meta property="og:image" content="https://thenowdesigns.com/img/og-card.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://thenowdesigns.com/about/" />
      </Head>

      <PageHero
        eyebrow="About the studio"
        heading={[{ text: 'A small studio that builds like a ' }, { text: 'big', em: true }, { text: ' one.' }]}
        lead="We hand-build fast, beautiful websites that earn their keep — and we take a handful of clients at a time so yours gets built like it's the only one."
      />

      <Marquee />

      {/* STORY */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">Why we exist</span>
            <h2 className="h-sec">We got tired of <em>template factories.</em></h2>
          </div>
          <div className="story" data-reveal data-d="1">
            <div>
              <p className="big">Most websites are sold like furniture: pick a template, swap the photos, ship it. Then it loads slow, looks like everyone else, and quietly costs you customers.</p>
              <p>We started The Now Designs to do the opposite. Every site is hand-built — designed around your brand and your buyers, coded to load before they blink, and written to actually convert.</p>
            </div>
            <div>
              <p>The name's the whole philosophy: design for the <em>now</em>. The web your customers use today — fast, mobile-first, beautiful, and honest.</p>
              <p>Keep the roster small and you don't get handed to a junior or buried in a queue. You talk to the person building it, see real progress weekly, and own everything when it's done.</p>
              <p style={{ marginTop: 8 }}><Link to="/#contact" className="btn btn--cherry">Start a project <span className="arrow">→</span></Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="sec sec--blue why">
        <div className="wrap">
          <p className="why-quote" data-reveal>Few clients. Full attention. <em>Real results.</em></p>
          <div className="why-grid">
            <div className="why-item" data-reveal data-d="1"><h3><span className="i">01</span> You text the designer</h3><p>No ticket system, no account manager who's never touched code. You message the person building your site — and get an answer the same day.</p></div>
            <div className="why-item" data-reveal data-d="2"><h3><span className="i">02</span> Built to load instantly</h3><p>Zero bloat, every kilobyte justified. Your site loads before they blink — Google notices, and your visitors notice more.</p></div>
            <div className="why-item" data-reveal data-d="3"><h3><span className="i">03</span> You own everything</h3><p>Your code, your domain, your data. No lock-in, no hostage situations. If we're not earning it, you walk with everything.</p></div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="sec sec--cream">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">How we work</span>
            <h2 className="h-sec">Honest, fast, <em>and</em> good.</h2>
            <p>Three things most agencies make you choose between. We don't.</p>
          </div>
          <div className="steps">
            <div className="step" data-reveal data-d="1"><div className="step__n">01</div><h4>Transparent</h4><p>Straight talk on cost — no hidden fees. A monthly report you can read in 60 seconds. Numbers you can verify yourself.</p></div>
            <div className="step" data-reveal data-d="2"><div className="step__n">02</div><h4>Fast</h4><p>4–6 week launches, not 4–6 months. Same-day replies. Weekly progress you can actually see.</p></div>
            <div className="step" data-reveal data-d="3"><div className="step__n">03</div><h4>Crafted</h4><p>Hand-coded, accessible, and tuned for speed and search. Work that looks effortless because the effort went where you can't see it.</p></div>
            <div className="step" data-reveal data-d="4"><div className="step__n">04</div><h4>Yours</h4><p>You keep the code, the domain, and the data — forever. We earn the relationship every month instead of locking you in.</p></div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head" data-reveal>
            <span className="eyebrow">How we build</span>
            <h2 className="h-sec">Small studio, <em>serious</em> standards.</h2>
          </div>
          <div className="stats">
            <div data-reveal data-d="1"><div className="stat__n">100<em>%</em></div><div className="stat__l">Hand-built — never templated</div></div>
            <div data-reveal data-d="2"><div className="stat__n">Sub<em>-second</em></div><div className="stat__l">Load times we engineer for</div></div>
            <div data-reveal data-d="3"><div className="stat__n">SEO<em>-first</em></div><div className="stat__l">Built to rank from line one</div></div>
            <div data-reveal data-d="4"><div className="stat__n">6</div><div className="stat__l">Clients at a time — on purpose</div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="wrap">
          <h2 data-reveal>When you're ready, <em>we're here.</em></h2>
          <p data-reveal data-d="1">If your site is costing you customers, let's talk. Free, no pitch.</p>
          <div data-reveal data-d="2"><Link to="/#contact" className="btn btn--cherry">Book a free call <span className="arrow">→</span></Link></div>
        </div>
      </section>
    </>
  )
}
