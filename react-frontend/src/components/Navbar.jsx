import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Phone, Instagram } from 'lucide-react';

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

  const iconStyle = { 
    color: '#000', 
    width: '40px', 
    height: '40px', 
    borderRadius: '10px', 
    background: '#fff', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)' 
  };

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
              style={{ color: isScrolled ? 'var(--primary-gold)' : 'white' }}
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
              color: isScrolled ? 'var(--primary-gold)' : 'white',
              borderColor: isScrolled ? 'var(--primary-gold)' : 'rgba(255,255,255,0.3)',
              background: isScrolled ? 'black' : 'rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-body)',
              fontWeight: 800
            }}
          >
            <Globe size={16} />
            <span>{isGujarati ? 'GJ' : 'EN'}</span>
          </button>
          
          <a href="tel:+919313634723" className="nav-phone-btn hide-mobile" style={{ background: 'var(--gradient-gold)', color: 'black' }}>
            <Phone size={18} />
          </a>

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: isScrolled ? 'var(--primary-gold)' : 'white' }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      <div className={`mobile-backdrop ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)}></div>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header" style={{ width: '100%', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, borderBottom: '1px solid #f1f5f9' }}>
             <img src="/logo.png" alt="Shiv Travel" style={{ height: '35px' }} />
             <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#000' }}>
                 <X size={24} />
             </button>
        </div>
        
        <div className="mobile-links-container" style={{ width: '100%', marginTop: '20px' }}>
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
        </div>

        <div className="mobile-menu-footer" style={{ marginTop: 'auto', padding: '30px', width: '100%', background: '#f8fafc' }}>
             <p style={{ color: '#64748b', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>{isGujarati ? 'અમને અનુસરો' : 'FOLLOW US'}</p>
             <div style={{ display: 'flex', gap: '15px' }}>
                 <a href="https://instagram.com/travelbookshiva" target="_blank" rel="noreferrer" style={iconStyle}>
                    <Instagram size={18} />
                 </a>
                 <a href="tel:+919099599331" style={iconStyle}>
                    <Phone size={18} />
                 </a>
             </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
