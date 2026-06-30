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
          <a href="/#who">Who we are</a>
          <Link to="/portal">Portal Login</Link>
        </nav>
        <a href="/#join" className="nav-cta">Get involved</a>
      </div>
    </header>
  );
}
