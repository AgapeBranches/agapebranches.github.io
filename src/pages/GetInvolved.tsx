export default function GetInvolved() {
  return (
    <main>
      <section className="cta" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
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
            
            <div className="reveal in">
              <ul className="roles">
                <li className="role">
                  <span className="role-num">i</span>
                  <div>
                    <h3 className="role-title">On-camera cook</h3>
                    <p className="role-desc">
                      Culinary skills + a story to tell. Help us turn rescue boxes
                      into beautiful, shareable meals.
                    </p>
                  </div>
                </li>
                <li className="role">
                  <span className="role-num">ii</span>
                  <div>
                    <h3 className="role-title">Food rescue driver</h3>
                    <p className="role-desc">
                      Help with weekly pickups from Bakers Delight, Tip Top Ice
                      Cream, and Fair Food.
                    </p>
                  </div>
                </li>
                <li className="role">
                  <span className="role-num">iii</span>
                  <div>
                    <h3 className="role-title">Storyteller</h3>
                    <p className="role-desc">
                      Share personal reflections, values, or inspiration that guide
                      your approach to service and generosity.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
