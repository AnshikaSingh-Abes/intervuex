import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        IntervueX
      </Link>

      <nav className="navbar-links">
        <a href="#how-it-works">How it works</a>

        <Link to="/setup" className="navbar-cta">
          Start Interview
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;