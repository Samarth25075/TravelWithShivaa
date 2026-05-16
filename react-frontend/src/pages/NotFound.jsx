import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: 'white', textAlign: 'center', padding: '20px' }}>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Compass size={80} color="var(--primary-gold)" style={{ margin: '0 auto 30px', opacity: 0.8 }} />
        <h1 style={{ fontSize: 'clamp(60px, 15vw, 120px)', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--primary-gold)', lineHeight: 1, marginBottom: '20px' }}>
          404
        </h1>
        <h2 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '20px', color: 'rgba(255,255,255,0.8)' }}>
          Wandering off the map?
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginBottom: '40px', lineHeight: 1.6 }}>
          The destination you're looking for might have been moved or doesn't exist. Let's get you back on track to your next signature journey.
        </p>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ 
            background: 'var(--gradient-gold)', color: 'black', padding: '15px 30px', 
            borderRadius: '50px', fontWeight: 900, textDecoration: 'none', 
            display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', fontSize: '14px' 
          }}>
            <Home size={18} /> Return Home
          </Link>
          <Link to="/packages" style={{ 
            background: 'rgba(255,255,255,0.05)', color: 'white', padding: '15px 30px', 
            borderRadius: '50px', fontWeight: 900, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', fontSize: '14px' 
          }}>
            <Search size={18} /> Explore Packages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
