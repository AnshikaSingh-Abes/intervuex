import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        IntervueX
      </Link>

      <Link className="nav-link" to="/setup">
        Start Interview →
      </Link>
    </nav>
  );
}

export default Navbar;