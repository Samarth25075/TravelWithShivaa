import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await axios.post('/api/enquiries', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main>
      <section style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '140px 0 100px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '64px', fontWeight: 900, marginBottom: '20px', letterSpacing: '-1px' }}
          >
            Get in <span style={{ color: 'var(--primary)' }}>Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '22px', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}
          >
            Have questions? We're here to help you plan your next dream vacation with Shiv Travel.
          </motion.p>
        </div>
      </section>

      <section className="container" style={{ padding: '120px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '100px' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '50px', letterSpacing: '-1px' }}>Contact Details</h2>
            {[
              { icon: <Phone size={24} />, title: 'Call Us', value: '+91 98765 43210', detail: 'Mon-Sat: 10am - 7pm' },
              { icon: <Mail size={24} />, title: 'Email Us', value: 'hello@shivtravel.com', detail: 'We reply within 24 hours' },
              { icon: <MapPin size={24} />, title: 'Visit Us', value: '123 Adventure St, Mumbai, India', detail: 'Near Gateway of India' }
            ].map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                style={{ display: 'flex', gap: '25px', marginBottom: '45px' }}
              >
                <div style={{ width: '64px', height: '64px', backgroundColor: '#fff7ed', color: 'var(--primary)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(255, 126, 95, 0.1)' }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>{item.title}</h4>
                  <p style={{ fontWeight: 600, fontSize: '16px', color: 'var(--secondary)' }}>{item.value}</p>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ backgroundColor: 'white', padding: '60px', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '40px 0' }}
                >
                  <div style={{ width: '80px', height: '80px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                    <CheckCircle size={40} />
                  </div>
                  <h3 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '15px' }}>Message Sent!</h3>
                  <p style={{ color: '#64748b', fontSize: '18px' }}>We've received your message and will get back to you shortly.</p>
                  <button onClick={() => setStatus('idle')} className="btn btn-secondary" style={{ marginTop: '30px', padding: '12px 30px' }}>Send Another</button>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <h3 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '35px', letterSpacing: '-1px' }}>Message Us</h3>
                  <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                    <div style={{ gridColumn: '1 / 2' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: '#64748b', marginBottom: '10px', display: 'block' }}>Your Name</label>
                        <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required type="text" placeholder="John Doe" style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', outline: 'none' }} />
                    </div>
                    <div style={{ gridColumn: '2 / 3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: '#64748b', marginBottom: '10px', display: 'block' }}>Email Address</label>
                        <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required type="email" placeholder="john@example.com" style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', outline: 'none' }} />
                    </div>
                    <div style={{ gridColumn: '1 / 3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: '#64748b', marginBottom: '10px', display: 'block' }}>Subject</label>
                        <input value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required type="text" placeholder="Planning a trip to Goa" style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', outline: 'none' }} />
                    </div>
                    <div style={{ gridColumn: '1 / 3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: '#64748b', marginBottom: '10px', display: 'block' }}>Detailed Message</label>
                        <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required rows="5" placeholder="Tell us what you're looking for..." style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', outline: 'none', resize: 'none' }}></textarea>
                    </div>
                    <button disabled={status === 'loading'} className="btn" style={{ gridColumn: '1 / 2', padding: '22px', borderRadius: '18px', fontSize: '17px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                      {status === 'loading' ? 'Sending...' : <>Send Message <Send size={20} /></>}
                    </button>
                    {status === 'error' && <p style={{ color: '#ef4444', fontWeight: 700, marginTop: '10px' }}>Error sending message. Please try again.</p>}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
