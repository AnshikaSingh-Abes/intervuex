import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <header>
      <div className="intervuex-logo">
        <Link to="/">IntervueX</Link>
      </div>

      {location.pathname !== "/interview" && (
        <nav className="navbar-links">
          <a href="#how-it-works">How it works</a>

          <Link to="/setup" className="navbar-cta">
            Start Interview
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;