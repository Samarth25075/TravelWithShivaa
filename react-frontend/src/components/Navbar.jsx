'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Navbar = ({ isGujarati, setIsGujarati }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');
  const { siteLogo } = useSettings();
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setLogoError(false);
  }, [siteLogo]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Load theme setting
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light', savedTheme === 'light');
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const navLinks = [
    { name: isGujarati ? 'હોમ' : 'Home', path: '/' },
    { name: isGujarati ? 'પેકેજો' : 'Packages', path: '/packages' },
    { name: isGujarati ? 'અમારા વિશે' : 'About', path: '/about' },
    { name: isGujarati ? 'સંપર્ક' : 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-[0_4px_24px_#00000066]' : ''}`}
        style={{ 
          background: 'var(--glass)', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--glass-border)',
        }}
      >
        <div className="max-w-[1300px] mx-auto px-[15px] md:px-[25px] h-[56px] md:h-[64px] flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            {siteLogo && !logoError && (
              <img 
                src={siteLogo.startsWith('http') || siteLogo.startsWith('/') ? siteLogo : `/api/uploads/${siteLogo}`} 
                alt="Shiv Travel Logo" 
                onError={() => setLogoError(true)}
                className="h-[44px] md:h-[54px] w-auto object-contain"
                style={{ 
                  filter: theme === 'light' ? 'invert(1) hue-rotate(180deg)' : 'none',
                  transition: 'filter 0.3s ease'
                }}
              />
            )}
            <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-heading)', letterSpacing: '0.5px' }}>
              <span style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>Travel</span>
              <span style={{ color: 'var(--primary-gold)' }}>Book</span>
              <span style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>Shiva</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? 'var(--primary-gold)' : '#888888',
                    transition: 'color 0.3s ease',
                    fontFamily: 'var(--font-label)',
                    display: 'inline-block',
                    padding: '8px 12px'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-light)';
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#888888';
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsGujarati(!isGujarati)}
              style={{
                border: '1px solid rgba(232, 102, 10, 0.35)',
                color: 'var(--primary-gold)',
                padding: '6px 16px',
                borderRadius: 'var(--radius-button)',
                background: 'transparent',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'var(--font-label)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(232, 102, 10, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {isGujarati ? 'ગુજ | EN' : 'EN | ગુજ'}
            </button>

            <button 
              onClick={toggleTheme}
              style={{
                border: '1px solid rgba(232, 102, 10, 0.35)',
                color: 'var(--primary-gold)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(232, 102, 10, 0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a 
              href="https://wa.me/919313634723?text=Hi%20Shiv%20Travel!%20I%20want%20to%20enquire%20about%20a%20trip."
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex"
              style={{
                background: 'var(--primary-gold)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '12px',
                padding: '8px 18px',
                borderRadius: 'var(--radius-button)',
                textDecoration: 'none',
                fontFamily: 'var(--font-label)',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'var(--accent-gold)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'var(--primary-gold)';
              }}
            >
              {isGujarati ? 'ટ્રિપ બુક કરો' : 'Book a Trip'}
            </a>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer' }}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden flex flex-col"
          style={{ background: 'var(--primary-black)', paddingTop: '56px' }}
        >
          <div className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? 'var(--primary-gold)' : 'var(--text-light)',
                    fontFamily: 'var(--font-label)',
                    display: 'block',
                    padding: '12px 16px'
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <a 
              href="https://wa.me/919313634723?text=Hi%20Shiv%20Travel!%20I%20want%20to%20enquire%20about%20a%20trip."
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              style={{
                background: 'var(--primary-gold)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '15px',
                padding: '14px',
                borderRadius: 'var(--radius-button)',
                textDecoration: 'none',
                fontFamily: 'var(--font-label)',
                textAlign: 'center',
                marginTop: '10px'
              }}
            >
              {isGujarati ? 'ટ્રિપ બુક કરો' : 'Book a Trip'}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
