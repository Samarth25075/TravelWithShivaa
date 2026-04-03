import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '100px 0 50px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '60px', marginBottom: '80px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '25px', color: 'var(--primary)' }}>Shiv Travel</h2>
            <p style={{ opacity: 0.7, lineHeight: 1.8, marginBottom: '30px' }}>Your trusted partner for unforgettable journeys. We believe in creating memories that last a lifetime through curated travel experiences and exceptional service.</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{ width: '45px', height: '45px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'var(--transition)' }}><Facebook size={20} /></a>
              <a href="#" style={{ width: '45px', height: '45px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'var(--transition)' }}><Twitter size={20} /></a>
              <a href="#" style={{ width: '45px', height: '45px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'var(--transition)' }}><Instagram size={20} /></a>
              <a href="#" style={{ width: '45px', height: '45px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transition: 'var(--transition)' }}><Youtube size={20} /></a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '30px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '15px' }}><Link to="/" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: 'var(--transition)' }}>Home</Link></li>
              <li style={{ marginBottom: '15px' }}><Link to="/about" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: 'var(--transition)' }}>About Us</Link></li>
              <li style={{ marginBottom: '15px' }}><Link to="/packages" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: 'var(--transition)' }}>Tour Packages</Link></li>
              <li style={{ marginBottom: '15px' }}><Link to="/contact" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: 'var(--transition)' }}>Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '30px' }}>Support</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '15px' }}><a href="#" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: 'var(--transition)' }}>FAQs</a></li>
              <li style={{ marginBottom: '15px' }}><a href="#" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: 'var(--transition)' }}>Privacy Policy</a></li>
              <li style={{ marginBottom: '15px' }}><a href="#" style={{ color: 'white', opacity: 0.7, textDecoration: 'none', transition: 'var(--transition)' }}>Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '30px' }}>Contact Info</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', opacity: 0.7 }}>
              <MapPin size={20} color="var(--primary)" />
              <p>123 Travel Street, Adventure City, India</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', opacity: 0.7 }}>
              <Phone size={20} color="var(--primary)" />
              <p>+91 98765 43210</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', opacity: 0.7 }}>
              <Mail size={20} color="var(--primary)" />
              <p>info@shivtravel.com</p>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', textAlign: 'center', opacity: 0.5, fontSize: '14px' }}>
          <p>&copy; {new Date().getFullYear()} Shiv Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
