import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--primary-black)',
      backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255, 107, 0, 0.15) 0%, transparent 25%), radial-gradient(circle at 80% 80%, rgba(255, 107, 0, 0.15) 0%, transparent 25%)',
      padding: '20px',
      overflow: 'hidden'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: 'white',
          padding: '60px',
          borderRadius: '40px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          position: 'relative'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            backgroundColor: 'var(--primary-orange)', 
            borderRadius: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 25px',
            color: 'white',
            boxShadow: '0 10px 20px rgba(255, 107, 0, 0.3)',
            transform: 'rotate(-5deg)'
          }}>
            <ShieldCheck size={40} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--primary-black)', marginBottom: '10px' }}>Admin Panel</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Shiv Travel Control Center</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '15px', borderRadius: '16px', marginBottom: '30px', textAlign: 'center', fontSize: '14px', fontWeight: 700 }}>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <User size={20} style={{ position: 'absolute', left: '20px', top: '20px', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '18px 18px 18px 55px',
                borderRadius: '16px',
                border: '2px solid #f1f5f9',
                backgroundColor: '#f8fafc',
                fontSize: '16px',
                fontWeight: 600,
                outline: 'none',
                transition: '0.3s'
              }}
              required
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', left: '20px', top: '20px', color: '#94a3b8' }} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '18px 18px 18px 55px',
                borderRadius: '16px',
                border: '2px solid #f1f5f9',
                backgroundColor: '#f8fafc',
                fontSize: '16px',
                fontWeight: 600,
                outline: 'none',
                transition: '0.3s'
              }}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              marginTop: '15px',
              backgroundColor: 'var(--primary-black)',
              color: 'white',
              padding: '20px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: '0.3s',
              boxShadow: '0 10px 15px rgba(0,0,0,0.2)'
            }}
          >
            {loading ? 'Authorizing...' : 'Authorize Entry'} <ArrowRight size={20} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>
            &copy; 2024 Shiv Travel Official
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
