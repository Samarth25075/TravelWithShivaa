'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { motion } from 'framer-motion';

const Footer = ({ isGujarati }) => {
  const currentYear = new Date().getFullYear();
  const { siteLogo } = useSettings();

  const stats = [
    { value: '52K+', label: isGujarati ? 'ખુશ પ્રવાસીઓ' : 'Global Explorers' },
    { value: '4.9★', label: isGujarati ? 'જસ્ટડાયલ રેટિંગ' : 'Impeccable Rating' },
    { value: '50+', label: isGujarati ? 'નવા સ્થળો' : 'Hidden Gems' },
    { value: '5+', label: isGujarati ? 'વર્ષનો અનુભવ' : 'Years of Excellence' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Counter Stats Section */}
        <div className="stats-row" style={{
          padding: 'clamp(30px, 4vw, 60px) 20px',
          margin: '0 auto 80px',
          position: 'relative',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '30px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'var(--radius-card)',
          border: '1px solid rgba(232, 102, 10, 0.15)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="stat-card" 
              style={{ flex: '1 1 180px', textAlign: 'center' }}
            >
              <h3 style={{ 
                fontSize: 'clamp(28px, 4vw, 44px)', 
                background: 'var(--gradient-gold)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                marginBottom: '8px'
              }}>{stat.value}</h3>
              <p style={{ 
                fontWeight: 600, 
                fontSize: '11px', 
                color: 'rgba(255,255,255,0.4)', 
                letterSpacing: '3px', 
                textTransform: 'uppercase',
                fontFamily: 'var(--font-label)'
              }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="footer-grid">
          <div className="footer-logo-area">
              <div style={{ position: 'relative', width: '200px', height: '68px', marginBottom: '20px' }}>
                <Image 
                  src={siteLogo || '/api/uploads/logo.png'} 
                  alt="Shiv Travel Logo" 
                  fill
                  sizes="200px"
                  className="object-contain"
                  onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                />
              </div>
            <h5 className="footer-brand-title">EXPERIENCES</h5>
            <p className="footer-tagline">
              {isGujarati ? '"અમે તમને ગમતા પ્રવાસ અનુભવો બનાવીએ છીએ ❤️"' : '"We curate Travel Experiences you love ❤️"'}
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com/travelbookshiva" target="_blank" rel="noreferrer" className="social-icon-btn"><Instagram size={20} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn"><Facebook size={20} /></a>
              <a href="https://twitter.com/travelbookshiva" target="_blank" rel="noreferrer" className="social-icon-btn"><Twitter size={20} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{isGujarati ? 'ઝડપી લિંક્સ' : 'Explore'}</h4>
            <ul className="footer-links">
              <li><Link href="/packages"><ArrowRight size={14} /> {isGujarati ? 'ટૂર પેકેજો' : 'Tour Packages'}</Link></li>
              <li><Link href="/group-trips"><ArrowRight size={14} /> {isGujarati ? 'ગ્રુપ ટ્રિપ્સ' : 'Group Trips'}</Link></li>
              <li><Link href="/custom-package"><ArrowRight size={14} /> {isGujarati ? 'કસ્ટમાઇઝ ટ્રિપ' : 'Custom Trip'}</Link></li>
              <li><Link href="/about"><ArrowRight size={14} /> {isGujarati ? 'અમારા વિશે' : 'About Us'}</Link></li>
              <li><Link href="/blog"><ArrowRight size={14} /> {isGujarati ? 'બ્લોગ' : 'Blog'}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{isGujarati ? 'સંપર્ક વિગત' : 'Contact Us'}</h4>
            <div className="contact-item-footer">
              <MapPin size={20} className="contact-icon-footer" />
              <div className="contact-text-footer">
                <p>208, SAHITYA ARCADE, NR HARIDARSHAN CROS ROAD, NAVA NARODA, AHMEDABAD GUJARAT - 382330</p>
              </div>
            </div>
            <div className="contact-item-footer">
              <Phone size={20} className="contact-icon-footer" />
              <div className="contact-text-footer">
                <p>+91 93136 34723<br />+91 87802 76978</p>
              </div>
            </div>
            <div className="contact-item-footer">
              <Mail size={20} className="contact-icon-footer" />
              <div className="contact-text-footer">
                <p>travelbookshiva@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4>{isGujarati ? 'સમાચાર પત્ર' : 'Stay Connected'}</h4>
            <div className="newsletter-footer">
              <p>{isGujarati ? 'ઓફર્સ માટે સબ્સ્ક્રાઇબ કરો.' : 'Subscribe for exclusive early-bird offers.'}</p>
              <div className="footer-input-group">
                <input 
                  aria-label={isGujarati ? 'ઈમેલ એડ્રેસ' : 'Email Address'}
                  type="email" 
                  placeholder={isGujarati ? 'તમારા ઈમેલ' : 'Email Address'} 
                />
                <button type="submit"><Send size={18} /></button>
              </div>
            </div>
            <div style={{ marginTop: '30px' }}>
                <Link href="/admin/login" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontWeight: 700 }}>
                    ADMIN LOGIN
                </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} <span style={{ color: '#ffffff' }}>Travel</span><span style={{ color: 'var(--primary-gold)' }}>Book</span><span style={{ color: '#ffffff' }}>Shiva</span>. All rights reserved.</p>
          <div className="footer-legal-links">
            <Link href="/privacy">{isGujarati ? 'ગોપનીયતા' : 'Privacy'}</Link>
            <Link href="/terms">{isGujarati ? 'નિયમો' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
