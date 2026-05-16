import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { siteLogo } = useSettings();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('admin/login', { username, password });
      localStorage.setItem('admin_token', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Access Denied. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      backgroundColor: '#050505',
      overflow: 'hidden',
    }} className="admin-login-split">
      
      {/* Left Side: Cinematic Visual */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          position: 'relative',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        <img 
          src="/api/uploads/luxury_travel_login_bg_1776972207052.png" 
          alt="Luxury Experience" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', inset: 0, 
          background: 'linear-gradient(to right, transparent 70%, #050505 100%), linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 30%)' 
        }} />
        
        <div style={{ position: 'absolute', bottom: '60px', left: '60px', zIndex: 10 }}>
           <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
             style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--primary-gold)', marginBottom: '15px' }}
           >
              <div style={{ height: '1px', width: '40px', background: 'var(--primary-gold)' }}></div>
              <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '4px', textTransform: 'uppercase' }}>Established 2018</span>
           </motion.div>
           <motion.h2 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
             style={{ fontSize: '56px', fontWeight: 950, color: 'white', lineHeight: 1, letterSpacing: '-2px', maxWidth: '500px' }}
           >
              Beyond Ordinary <br /> <span style={{ color: 'var(--primary-gold)' }}>Expeditions.</span>
           </motion.h2>
        </div>
      </motion.div>

      {/* Right Side: Login Form */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            width: '100%',
            maxWidth: '420px',
            position: 'relative',
            zIndex: 1
          }}
        >
          <div style={{ marginBottom: '50px' }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ marginBottom: '40px' }}
            >
              {siteLogo ? (
                <img src={siteLogo.startsWith('http') ? siteLogo : `/api/uploads/${siteLogo}`} alt="Brand Logo" style={{ height: '40px', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))' }} />
              ) : (
                <div style={{ 
                  width: '60px', height: '60px', background: 'var(--gradient-gold)', borderRadius: '18px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' 
                }}>
                  <ShieldCheck size={30} />
                </div>
              )}
            </motion.div>
            
            <h1 style={{ 
              fontSize: '32px', fontWeight: 950, color: 'white', marginBottom: '10px', 
              letterSpacing: '-1.5px', fontFamily: 'var(--font-heading)' 
            }}>
              Management <span style={{ color: 'var(--primary-gold)' }}>Portal</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Identity Verification Required
            </p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', 
                color: '#ef4444', padding: '15px', borderRadius: '16px', marginBottom: '30px', 
                fontSize: '13px', fontWeight: 800, textAlign: 'center'
              }}>
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '22px', top: '22px', color: 'var(--primary-gold)', opacity: 0.7 }} />
              <input 
                type="text" 
                placeholder="Agent Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '22px 22px 22px 60px',
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  outline: 'none',
                  transition: '0.4s'
                }}
                required
                className="luxury-input"
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '22px', top: '22px', color: 'var(--primary-gold)', opacity: 0.7 }} />
              <input 
                type="password" 
                placeholder="Security Access Key" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '22px 22px 22px 60px',
                  borderRadius: '18px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  outline: 'none',
                  transition: '0.4s'
                }}
                required
                className="luxury-input"
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              style={{
                marginTop: '20px',
                background: 'var(--gradient-gold)',
                color: 'black',
                padding: '22px',
                borderRadius: '50px',
                border: 'none',
                fontSize: '15px',
                fontWeight: 950,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: '0.4s',
                boxShadow: '0 20px 40px rgba(212, 175, 55, 0.25)',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}
            >
              {loading ? 'Authenticating...' : (
                <>Establish Connection <ArrowRight size={18} /></>
              )}
            </motion.button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <p style={{ 
              fontSize: '10px', color: 'rgba(255,255,255,0.2)', fontWeight: 900, 
              textTransform: 'uppercase', letterSpacing: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' 
            }}>
              <div style={{ height: '1px', width: '20px', background: 'rgba(255,255,255,0.1)' }}></div>
              Digital Concierge System
              <div style={{ height: '1px', width: '20px', background: 'rgba(255,255,255,0.1)' }}></div>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
