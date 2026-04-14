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
              style={{ color: isScrolled ? '#ff6b00' : (location.pathname === '/' || location.pathname.startsWith('/package') || location.pathname.startsWith('/destination') ? 'white' : 'white') }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button 
            className="lang-btn" 
            onClick={() => setIsGujarati(!isGujarati)}
            style={{ 
              color: isScrolled ? '#ff6b00' : 'white',
              borderColor: isScrolled ? '#ff6b00' : 'rgba(255,255,255,0.3)',
              background: isScrolled ? 'black' : 'rgba(255,255,255,0.1)'
            }}
          >
            <Globe size={16} />
            <span>{isGujarati ? 'GJ' : 'EN'}</span>
          </button>
          
          <a href="tel:+919099599331" className="nav-phone-btn hide-mobile">
            <Phone size={18} />
          </a>

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: isScrolled ? '#ff6b00' : 'white' }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header" style={{ width: '100%', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0 }}>
             <img src="/logo.png" alt="Shiv Travel" style={{ height: '40px' }} />
             <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#ff6b00' }}>
                 <X size={32} />
             </button>
        </div>
        <div className="mobile-links-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', width: '100%' }}>
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
        <div className="mobile-menu-footer" style={{ position: 'absolute', bottom: '50px', width: '100%', textAlign: 'center' }}>
             <p style={{ color: '#fff', opacity: 0.5, fontSize: '13px', marginBottom: '20px' }}>{isGujarati ? 'અમને અનુસરો' : 'FOLLOW US'}</p>
             <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                 <a href="https://instagram.com/travelbookshiva" style={{ color: '#ff6b00' }}><Globe size={20} /></a>
                 <a href="tel:+919099599331" style={{ color: '#ff6b00' }}><Phone size={20} /></a>
             </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
