import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tour Packages', path: '/packages' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header style={{
        height: scrolled ? '70px' : '90px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'var(--white)',
        position: 'sticky',
        top: 0,
        zIndex: 2000,
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : '0 2px 10px rgba(0,0,0,0.02)',
        transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none'
      }}>
        <div className="container" style={{ width: '100%' }}>
          <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Link to="/" style={{
              fontSize: '28px',
              fontWeight: 900,
              color: 'var(--secondary)',
              letterSpacing: '-1.5px',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Globe size={24} />
              </div>
              <span className="logo-text">SHIV<span style={{ color: 'var(--primary)' }}>TRAVEL</span></span>
            </Link>

            {/* Desktop Nav */}
            <div className="desktop-nav" style={{
              display: 'flex',
              gap: '35px',
              alignItems: 'center'
            }}>
              {navLinks.map(link => (
                <div key={link.path} style={{ position: 'relative' }}>
                  <Link 
                    to={link.path} 
                    style={{ 
                      textDecoration: 'none', 
                      color: location.pathname === link.path ? 'var(--primary)' : 'var(--secondary)',
                      fontWeight: 700,
                      fontSize: '15px',
                      transition: '0.3s'
                    }}
                    className="nav-item"
                  >
                    {link.name}
                  </Link>
                  {location.pathname === link.path && (
                    <motion.div layoutId="underline" style={{ position: 'absolute', bottom: '-8px', left: 0, right: 0, height: '4px', background: 'var(--primary)', borderRadius: '2px' }} />
                  )}
                </div>
              ))}
              <div style={{ height: '24px', width: '1px', background: '#e2e8f0', margin: '0 5px' }}></div>
              <Link to="/contact" className="btn" style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '14px' }}>
                Book Now
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--secondary)',
                cursor: 'pointer'
              }}
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: '400px',
              backgroundColor: 'white',
              zIndex: 3000,
              padding: '100px 40px 40px',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px'
            }}
          >
            <button 
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={32} />
            </button>

            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                style={{ 
                  textDecoration: 'none', 
                  color: location.pathname === link.path ? 'var(--primary)' : 'var(--secondary)',
                  fontSize: '24px',
                  fontWeight: 900,
                  letterSpacing: '-1px'
                }}
              >
                {link.name}
              </Link>
            ))}
            
            <div style={{ marginTop: 'auto', borderTop: '1px solid #efefef', paddingTop: '30px' }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginBottom: '15px', textTransform: 'uppercase' }}>Available 24/7</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 800 }}>+91 91040 10214</p>
                  <p style={{ fontSize: '13px', color: '#94a3b8' }}>shivtravel@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Dim for Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)', zIndex: 2500 }}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .logo-text { font-size: 24px; }
        }
      `}</style>
    </>
  );
};

export default Navbar;

