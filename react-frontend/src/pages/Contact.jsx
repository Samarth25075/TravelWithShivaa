import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, ShieldCheck, Globe, Star, MessageSquare } from 'lucide-react';
import axios from 'axios';

const Contact = ({ isGujarati }) => {
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('enquiries', {
        ...formData,
        subject: 'General Enquiry'
      });
      setFormSent(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again or contact us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    { icon: <MapPin size={24} />, title: 'Headquarters', content: '508/608, 3rd Eye Vision, IIM Road, Ahmedabad – 380015' },
    { icon: <Phone size={24} />, title: 'Concierge Line', content: '+91 93136 34723' },
    { icon: <Mail size={24} />, title: 'Official Email', content: 'travelbookshiva@gmail.com' },
    { icon: <Clock size={24} />, title: 'Office Hours', content: 'Mon - Sat: 11:00 AM - 08:30 PM' }
  ];

  return (
    <div className="contact-page" style={{ background: 'var(--primary-black)', color: 'white' }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img 
          src="/images/contact_hero.png" 
          alt="Luxury Office" 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--primary-black))' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: '800px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ width: '40px', height: '1px', background: 'var(--primary-gold)' }}></span>
              <span style={{ color: 'var(--primary-gold)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', fontSize: '12px' }}>
                {isGujarati ? 'સંપર્ક કરો' : 'Start Your Journey'}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 950, lineHeight: 1, marginBottom: '25px', fontFamily: 'var(--font-heading)' }}>
              {isGujarati ? 'અમે તમારી સાથે જોડાવવા ઈચ્છો છો.' : 'Let’s Design Your \nElite Escape.'}
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px' }}>
              {isGujarati ? 'તમારી આગામી સફર માટે અમે તૈયાર છીએ.' : "Our travel specialists are standing by to curate your next unique experience."}
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '100px 0', position: 'relative' }}>
        <div className="container">
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'start' }}>
            
            {/* Info Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '32px', fontWeight: 950, marginBottom: '40px' }}>{isGujarati ? 'સંપર્ક વિગતો' : 'The Concierge Desk'}</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {contactDetails.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                    <div style={{ width: '50px', height: '50px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-gold)', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary-gold)', marginBottom: '5px', letterSpacing: '1px' }}>{item.title}</h4>
                      <p style={{ fontSize: '16px', color: 'white', lineHeight: 1.5 }}>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '60px', padding: '40px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '30px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px' }}>Digital Presence</h4>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {[
                    { icon: <Instagram size={24} />, url: 'https://instagram.com/travelbookshiva' },
                    { icon: <Facebook size={24} />, url: '#' },
                    { icon: <Twitter size={24} />, url: '#' }
                  ].map((social, idx) => (
                    <motion.a 
                      key={idx}
                      whileHover={{ y: -5, color: 'var(--primary-gold)' }}
                      href={social.url} 
                      target="_blank"
                      style={{ color: 'white', opacity: 0.8 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ padding: '50px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
            >
              {formSent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    style={{ width: '80px', height: '80px', background: 'var(--primary-gold)', color: 'black', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}
                  >
                    <ShieldCheck size={40} />
                  </motion.div>
                  <h3 style={{ fontSize: '28px', fontWeight: 950, marginBottom: '15px' }}>Message Transmitted</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Our specialists have received your inquiry. We will contact you momentarily.</p>
                  <button onClick={() => setFormSent(false)} className="btn-primary-sm" style={{ margin: '0 auto' }}>Send Another</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: '28px', fontWeight: 950, marginBottom: '10px' }}>{isGujarati ? 'સંદેશ મોકલો' : 'Request Private Access'}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '35px' }}>Complete the form below to initiate a private consultation.</p>
                  
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Full Name</label>
                      <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInput} 
                        type="text" 
                        required 
                        style={{ width: '100%', padding: '16px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                        placeholder="e.g. Alexander Knight"
                      />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Email Address</label>
                        <input 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInput} 
                          type="email" 
                          required 
                          style={{ width: '100%', padding: '16px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                          placeholder="client@luxury.com"
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Phone Number</label>
                        <input 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInput} 
                          type="tel" 
                          required 
                          style={{ width: '100%', padding: '16px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none' }}
                          placeholder="+91..."
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '35px' }}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Inquiry Details</label>
                      <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleInput} 
                        required 
                        style={{ width: '100%', height: '120px', padding: '16px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', outline: 'none', resize: 'none' }}
                        placeholder="Describe your vision..."
                      />
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading} 
                      type="submit" 
                      className="btn-primary-sm" 
                      style={{ width: '100%', padding: '20px', justifyContent: 'center' }}
                    >
                      {loading ? 'Transmitting...' : (isGujarati ? 'સબમિટ કરો' : 'Initialize Contact')} <Send size={18} />
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ borderRadius: '40px', overflow: 'hidden', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
          >
            <iframe 
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.884179344443!2d72.54013111500!3d23.0270034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84e85789ca73%3A0x67375bf46f77cc67!2s3rd%20Eye%20Vision!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                width="100%" height="500" style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2)' }} allowFullScreen="" loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
