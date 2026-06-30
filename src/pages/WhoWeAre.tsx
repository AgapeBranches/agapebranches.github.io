export default function WhoWeAre() {
  return (
    <main style={{ padding: '120px 0' }}>
      <section className="who">
        <div className="wrap">
          <div className="who-grid">
            <div className="who-portrait reveal in">
              <img src="/images/founder.jpg" alt="A founding member of Agape Branches" />
              <span className="who-portrait-stamp">est. with care</span>
              <div className="who-caption">
                Agape Branches
                <span>Founding member</span>
              </div>
            </div>

            <div className="who-text reveal in">
              <span className="section-label">Who we are</span>
              <p className="lede">
                Agape Branches is committed to building strong, connected
                communities by using digital platforms to inspire <em>generosity,
                compassion, and shared responsibility</em>.
              </p>
              <p>
                By meeting people where they are — online and in everyday life —
                the organisation fosters a sense of belonging and encourages
                individuals to take practical action that supports others in
                meaningful ways.
              </p>
              <p>
                Our vision is to catalyse positive, organic change by serving and
                nurturing communities. Through acts of care, collaboration, and
                shared values, we seek to create lasting local impact while
                contributing to broader conversations around sustainability and
                social wellbeing.
              </p>

              <div className="who-stats">
                <div className="who-stat">
                  <div className="who-stat-num">3</div>
                  <div className="who-stat-label">Food rescue partners</div>
                </div>
                <div className="who-stat">
                  <div className="who-stat-num">90s</div>
                  <div className="who-stat-label">Average episode length</div>
                </div>
                <div className="who-stat">
                  <div className="who-stat-num">∞</div>
                  <div className="who-stat-label">Meals worth sharing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
