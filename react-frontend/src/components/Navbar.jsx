'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Navbar = ({ isGujarati, setIsGujarati }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          background: '#0d0d0fee', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #c9a84c22',
        }}
      >
        <div className="max-w-[1300px] mx-auto px-[15px] md:px-[25px] h-[56px] md:h-[64px] flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <div style={{ fontSize: '18px', fontWeight: 500, fontFamily: 'var(--font-heading)' }}>
              <span style={{ color: '#f5f0e8' }}>Shiv</span>
              <span style={{ color: '#c9a84c' }}> Travel</span>
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
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: isActive ? '#c9a84c' : '#888888',
                    transition: 'color 0.3s ease',
                    fontFamily: 'var(--font-body)',
                    display: 'inline-block',
                    padding: '8px 12px'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#e8c97e';
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
                border: '1px solid #c9a84c55',
                color: '#c9a84c',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'transparent',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#c9a84c14';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {isGujarati ? 'ગુજ | EN' : 'EN | ગુજ'}
            </button>

            <a 
              href="https://wa.me/919313634723?text=Hi%20Shiv%20Travel!%20I%20want%20to%20enquire%20about%20a%20trip."
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex"
              style={{
                background: '#c9a84c',
                color: '#1a1200',
                fontWeight: 500,
                fontSize: '12px',
                padding: '8px 18px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'background 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#b8943e';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#c9a84c';
              }}
            >
              {isGujarati ? 'ટ્રિપ બુક કરો' : 'Book a Trip'}
            </a>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              style={{ background: 'transparent', border: 'none', color: '#f5f0e8', cursor: 'pointer' }}
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
          style={{ background: '#0d0d0f', paddingTop: '56px' }}
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
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: isActive ? '#c9a84c' : '#f5f0e8',
                    fontFamily: 'var(--font-body)',
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
                background: '#c9a84c',
                color: '#1a1200',
                fontWeight: 500,
                fontSize: '15px',
                padding: '14px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
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
