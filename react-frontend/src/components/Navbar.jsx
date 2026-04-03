import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'var(--white)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
    }}>
      <div className="container" style={{ width: '100%' }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            fontSize: '26px',
            fontWeight: 800,
            color: 'var(--secondary)',
            letterSpacing: '-1px'
          }}>
            SHIV<span style={{ color: 'var(--primary)' }}>TRAVEL</span>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links" style={{
            display: 'flex',
            gap: '30px',
            alignItems: 'center',
            fontSize: '16px',
            fontWeight: 600
          }}>
            <Link to="/" style={{ transition: 'var(--transition)' }}>Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/contact" className="btn" style={{ padding: '10px 24px', fontSize: '14px' }}>Book Now</Link>
          </div>

          {/* Mobile Toggle would go here if we implemented mobile styling fully */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
