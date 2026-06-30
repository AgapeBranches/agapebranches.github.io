export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">A community kitchen, on camera</span>
              <h1>
                Rescued food,<br />
                <em>remade</em> as a<br />
                <span className="underline">love letter</span> to the&nbsp;neighbourhood.
              </h1>
              <p className="hero-lede">
                Agape Branches is a community organisation dedicated to promoting
                generosity, sustainability, and human connection through the gift
                of giving — reshaping how people view rescued food by highlighting
                its value, potential, and positive impact on both people and planet.
              </p>
              <div className="hero-cta-row">
                <a className="btn btn-primary" href="#join">
                  Volunteer with us <span className="arrow">→</span>
                </a>
                <a className="btn btn-ghost" href="#mission">
                  Watch the show <span className="arrow">→</span>
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-stamp">
                  Episode<br />01 · 90&nbsp;sec
                </div>
                <div className="hero-card-inner">
                  <img src="/images/ab-logo.png" alt="Agape Branches emblem" />
                </div>
                <div className="hero-card-meta">
                  <span><strong>Now Filming</strong> · Series One</span>
                  <span>TikTok · Facebook</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-marquee" aria-hidden="true">
            <div className="marquee-track">
              <span>Generosity</span><span>Sustainability</span>
              <span>Connection</span><span>Rescued food</span>
              <span>Shared purpose</span><span>One meal at a time</span>
              <span>Generosity</span><span>Sustainability</span>
              <span>Connection</span><span>Rescued food</span>
            </div>
            <div className="marquee-track" aria-hidden="true">
              <span>Generosity</span><span>Sustainability</span>
              <span>Connection</span><span>Rescued food</span>
              <span>Shared purpose</span><span>One meal at a time</span>
              <span>Generosity</span><span>Sustainability</span>
              <span>Connection</span><span>Rescued food</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="mission">
        <div className="wrap">
          <div className="features-head reveal in">
            <div>
              <span className="section-label">What we do</span>
              <h2 className="h2">Three doors into the&nbsp;<em>same table.</em></h2>
            </div>
            <p>
              Our work spans the kitchen, the street, and the screen. Each thread
              feeds the others — surplus becomes story, story becomes invitation,
              invitation becomes a community gathered around a&nbsp;meal.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature feature-wide reveal in">
              <span className="feature-num">— 01</span>
              <span className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="14" width="32" height="22" rx="3"/>
                  <path d="M16 14V9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v5"/>
                  <circle cx="34" cy="25" r="2.5" fill="currentColor"/>
                </svg>
              </span>
              <h3 className="feature-title">A 60–120 second cooking show</h3>
              <p>
                Short, dynamic episodes on TikTok and Facebook that demonstrate
                creative, practical ways to transform rescued food into nutritious,
                appealing meals. Storytelling and hands-on examples — never lectures.
              </p>
              <span className="feature-tag">Now in production</span>
            </article>

            <article className="feature feature-tall reveal in">
              <span className="feature-num">— 02</span>
              <span className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 20h28l-3 18H13z"/>
                  <path d="M16 20V13a8 8 0 0 1 16 0v7"/>
                  <path d="M21 26v6M27 26v6"/>
                </svg>
              </span>
              <h3 className="feature-title">Food rescue, by hand</h3>
              <p>
                Volunteers collect surplus from local partners and route it to the
                kitchen and the community — turning what would be wasted into the
                ingredients of something generous.
              </p>
              <span className="feature-tag">Bakers Delight · Tip Top · Fair Food</span>
            </article>
          </div>
        </div>
      </section>

      <section className="cta" id="join">
        <div className="wrap">
          <div className="cta-grid">
            <div className="reveal in">
              <span className="eyebrow cta-eyebrow">Join us</span>
              <h2>
                We're looking for people who can <em>cook, drive,</em> and&nbsp;care.
              </h2>
              <p className="cta-lede">
                Agape Branches is seeking committed individuals — passionate about
                community service — to transform rescued food into remarkable
                meals on camera, and to help us collect from our food partners.
                Join us on this journey of food, community, and shared purpose.
              </p>
              <div className="cta-actions">
                <a className="btn btn-ochre" href="mailto:hello@agapebranches.org">
                  Apply to volunteer <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
