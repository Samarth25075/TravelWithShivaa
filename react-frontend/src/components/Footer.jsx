import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Mountain } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--secondary)', 
      color: 'white', 
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Gradient Background (Premium touch) */}
      <div style={{ 
        position: 'absolute', 
        top: '-150px', 
        right: '-150px', 
        width: '500px', 
        height: '500px', 
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(15, 23, 42, 0) 70%)',
        zIndex: 0
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '30px'
            }}>
              <img 
                src="/logo.png" 
                alt="Shiv Travel Logo" 
                style={{ 
                  height: '75px', 
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'brightness(1.2)' // Slight boost for visibility on dark footer
                }} 
              />
            </Link>
            <p style={{ opacity: 0.6, lineHeight: 1.8, marginBottom: '40px', fontSize: '16px', maxWidth: '400px' }}>
              Shiv Travel is a premier tour agency dedicated to crafting bespoke travel experiences that inspire and exhilarate. We bridge the gap between dreams and reality.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[
                { Icon: Facebook, url: 'https://www.facebook.com/share/1BKC9JVHAL/' },
                { Icon: Instagram, url: 'https://www.instagram.com/travel_book_shiva?igsh=MWh6bXhnZXhlNnh2Zw==' },
                { Icon: Twitter, url: '#' },
                { Icon: Youtube, url: '#' }
              ].map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: 'rgba(255,255,255,0.05)', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: 'white', 
                  transition: '0.3s',
                  border: '1px solid rgba(255,255,255,0.05)'
                }} onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }} onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}><item.Icon size={20} /></a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '35px', color: 'white' }}>Quick Discover</h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { name: 'Home Landing', path: '/' },
                { name: 'Our Packages', path: '/packages' },
                { name: 'Company Story', path: '/about' },
                { name: 'Latest News', path: '/blog' },
                { name: 'Contact Us', path: '/contact' }
              ].map(link => (
                <li key={link.name} style={{ marginBottom: '18px' }}>
                  <Link to={link.path} style={{ color: 'white', opacity: 0.6, textDecoration: 'none', transition: '0.3s', fontWeight: 600, fontSize: '15px' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.6}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '35px', color: 'white' }}>Resources</h4>
            <ul style={{ listStyle: 'none' }}>
              {['Help Center', 'Travel Insurance', 'Terms of Service', 'Privacy Policy', 'Cookie Policy'].map(item => (
                <li key={item} style={{ marginBottom: '18px' }}>
                  <a href="#" style={{ color: 'white', opacity: 0.6, textDecoration: 'none', transition: '0.3s', fontWeight: 600, fontSize: '15px' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.6}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '35px', color: 'white' }}>Contact Center</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <p style={{ opacity: 0.6, fontSize: '15px', lineHeight: 1.6 }}>208, Sahitya Arcade, Haridarshan Cross Rd, Naroda, Ahmedabad, Gujarat 382330</p>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 800 }}>+91 93136 34723</p>
                  <p style={{ opacity: 0.4, fontSize: '12px' }}>Support available 24/7</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <p style={{ fontSize: '16px', fontWeight: 800 }}>shivtravel@gmail.com</p>
                  <p style={{ opacity: 0.4, fontSize: '12px' }}>Response within 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: '100px', 
          paddingTop: '40px', 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '20px'
        }}>
          <p style={{ opacity: 0.4, fontSize: '14px' }}>&copy; {new Date().getFullYear()} Shiv Travel India. Crafted with passion by Travel Experts.</p>
          <div style={{ display: 'flex', gap: '30px', opacity: 0.4, fontSize: '14px' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Security</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 60px;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .footer-brand, .footer-links, .footer-contact {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .footer-brand p { margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

