import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Beta*tips
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/vip" className="navbar-item">VIP</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
