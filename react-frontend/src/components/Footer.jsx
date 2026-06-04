'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Footer = ({ isGujarati }) => {
  const currentYear = new Date().getFullYear();
  const { siteLogo } = useSettings();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-logo-area">
             <div style={{ position: 'relative', width: '120px', height: '40px', marginBottom: '20px' }}>
               <Image 
                 src={siteLogo || '/api/uploads/logo.png'} 
                 alt="Shiv Travel Logo" 
                 fill
                 sizes="120px"
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
                <p>508/608, 3rd Eye Vision, Above Nexa Showroom, IIM Road, Ahmedabad – 380015</p>
              </div>
            </div>
            <div className="contact-item-footer">
              <Phone size={20} className="contact-icon-footer" />
              <div className="contact-text-footer">
                <p>+91 90995 99331</p>
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
          <p>&copy; {currentYear} <span style={{ color: 'var(--primary-gold)' }}>TravelBookShiva</span>. All rights reserved.</p>
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
