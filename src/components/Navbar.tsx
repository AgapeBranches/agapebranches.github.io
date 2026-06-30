import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link to="/" className="brand" aria-label="Agape Branches home">
          <img src="/images/ab-logo.png" alt="Agape Branches" className="brand-mark" />
          <span className="brand-text">Agape <em>Branches</em></span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link to="/">Mission</Link>
          <Link to="/videos">Recipes & Videos</Link>
          <Link to="/who-we-are">Who we are</Link>
          <Link to="/portal">Portal Login</Link>
        </nav>
        <Link to="/get-involved" className="nav-cta">Get involved</Link>
      </div>
    </header>
  );
}
