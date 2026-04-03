import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/admin/login', credentials);
      if (response.data.status === 'success') {
        localStorage.setItem('admin_token', response.data.token);
        navigate('/admin/packages');
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary) 0%, #3498db 100%)'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          backgroundColor: 'white',
          padding: '50px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          width: '100%',
          maxWidth: '450px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Lock size={30} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-muted)' }}>Shiv Travel Agency Management</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#ef4444',
            padding: '12px',
            borderRadius: 'var(--radius)',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px 12px 45px',
                  borderRadius: 'var(--radius)',
                  border: '1px solid #ddd',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px 12px 45px',
                  borderRadius: 'var(--radius)',
                  border: '1px solid #ddd',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn" 
            style={{ width: '100%', padding: '15px', display: 'flex', justifyContent: 'center', gap: '10px' }}
          >
            {loading ? 'Logging in...' : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
