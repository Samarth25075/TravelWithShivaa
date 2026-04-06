import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone } from 'lucide-react';

const Navbar = ({ isGujarati, setIsGujarati }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: isGujarati ? 'હોમ' : 'Home', path: '/' },
    { name: isGujarati ? 'ટૂર પેકેજો' : 'Packages', path: '/packages' },
    { name: isGujarati ? 'ગ્રુપ ટ્રિપ્સ' : 'Group Trips', path: '/group-trips' },
    { name: isGujarati ? 'કસ્ટમાઇઝ ટ્રિપ' : 'Plan Trip', path: '/custom-package' },
    { name: isGujarati ? 'અમારા વિશે' : 'About', path: '/about' },
    { name: isGujarati ? 'બ્લોગ' : 'Blog', path: '/blog' },
    { name: isGujarati ? 'સંપર્ક' : 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="Shiv Travel" className="header-logo" />
          <div className="logo-text-group">
            <span className="logo-title">
              <span className="logo-part-1">TRAVELBOOK</span>
              <span className="logo-part-2">SHIVA</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button 
            className="lang-btn" 
            onClick={() => setIsGujarati(!isGujarati)}
          >
            <Globe size={16} />
            <span>{isGujarati ? 'GJ' : 'EN'}</span>
          </button>
          
          <a href="tel:+919099599331" className="nav-phone-btn hide-mobile">
            <Phone size={18} />
          </a>

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: isScrolled ? 'var(--primary-green)' : 'white' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', color: 'var(--primary-green)' }}>
            <X size={32} />
        </button>
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path} 
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
