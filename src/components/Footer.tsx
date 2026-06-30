import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" id="newsletter">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-newsletter">
            <span className="section-label">The dispatch</span>
            <h3>
              Recipes, rescues, and the&nbsp;<em>occasional&nbsp;invitation.</em>
            </h3>
            <p>
              A short monthly note from Agape Branches — what we're cooking, who's
              joining, and ways to help. No spam. Unsubscribe anytime.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                name="email"
                placeholder="you@neighbourhood.com"
                required
                aria-label="Email address"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">What we do</Link></li>
              <li><Link to="/videos">Recipes & Videos</Link></li>
              <li><a href="/#join">Get involved</a></li>
              <li><Link to="/portal">Volunteer Portal</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Find us</h4>
            <ul>
              <li><a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a></li>
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="mailto:hello@agapebranches.org">hello@agapebranches.org</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Agape Branches — a community organisation.</span>
          <span className="footer-bottom-mark">— Made with care, one meal at a time.</span>
        </div>
      </div>
    </footer>
  );
}
