import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';

const Contact = ({ isGujarati }) => {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="contact-page">
      <header className="page-header-premium">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-title" 
            style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 950, marginBottom: '15px' }}
          >
            {isGujarati ? 'સંપર્ક કરો' : 'Connect With Us'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="page-subtitle" 
            style={{ fontSize: '18px', fontWeight: 600, opacity: 0.9 }}
          >
            {isGujarati ? 'તમારી આગામી સફર માટે અમે તૈયાર છીએ.' : "Ready to explore? We're here to guide you."}
          </motion.p>
        </div>
      </header>

      <section className="contact-section">
        <div className="container">
           <div className="contact-grid">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="contact-info"
              >
                 <h2>{isGujarati ? 'અમને શોધો' : 'Find Us At'}</h2>
                 <div className="info-item">
                    <div className="icon-circle"><MapPin size={24} /></div>
                    <div className="text-info">
                       <h4>Office Address</h4>
                       <p>508/608, 3rd Eye Vision, Above Nexa Showroom, IIM Road, Ahmedabad – 380015</p>
                    </div>
                 </div>
                 <div className="info-item">
                    <div className="icon-circle"><Phone size={24} /></div>
                    <div className="text-info">
                       <h4>Call / WhatsApp</h4>
                       <p>+91 90995 99331</p>
                    </div>
                 </div>
                 <div className="info-item">
                    <div className="icon-circle"><Mail size={24} /></div>
                    <div className="text-info">
                       <h4>Email Us</h4>
                       <p>travelbookshiva@gmail.com</p>
                    </div>
                 </div>
                 <div className="info-item">
                    <div className="icon-circle"><Clock size={24} /></div>
                    <div className="text-info">
                       <h4>Office Hours</h4>
                       <p>Mon - Sat: 11:00 AM - 08:30 PM</p>
                    </div>
                 </div>

                 <div className="social-connect" style={{ marginTop: '50px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#ffcc00', marginBottom: '25px' }}>
                        {isGujarati ? 'અમને ફોલો કરો' : 'Follow Our Journey'}
                    </p>
                    <div className="social-links-row" style={{ display: 'flex', gap: '20px' }}>
                       <motion.a whileHover={{ scale: 1.2, color: '#ffcc00' }} href="#" style={{ color: 'white', opacity: 0.8, transition: '0.3s' }}><Instagram size={24} /></motion.a>
                       <motion.a whileHover={{ scale: 1.2, color: '#ffcc00' }} href="#" style={{ color: 'white', opacity: 0.8, transition: '0.3s' }}><Facebook size={24} /></motion.a>
                       <motion.a whileHover={{ scale: 1.2, color: '#ffcc00' }} href="#" style={{ color: 'white', opacity: 0.8, transition: '0.3s' }}><Twitter size={24} /></motion.a>
                    </div>
                 </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="contact-form-container"
              >
                 {formSent ? (
                   <div className="success-state">
                      <div className="success-icon"><ShieldCheck size={64} /></div>
                      <h3>Thank You!</h3>
                      <p>Our specialists will respond to your inquiry shortly.</p>
                      <button className="btn-submit" style={{ marginTop: '40px', maxWidth: '220px' }} onClick={() => setFormSent(false)}>Send New Message</button>
                   </div>
                 ) : (
                   <>
                     <h2>{isGujarati ? 'સંદેશ મોકલો' : 'Request dynamic quote'}</h2>
                     <p style={{ color: '#64748b', marginBottom: '35px', fontWeight: 500 }}>{isGujarati ? 'અમને તમારી યોજના વિશે જણાવો.' : 'Share your travel requirements with our experts.'}</p>
                     
                     <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}>
                        <div className="form-group" style={{ marginBottom: '25px' }}>
                           <label>Full Name</label>
                           <input type="text" placeholder={isGujarati ? 'તમારું નામ' : 'Enter your name'} required />
                        </div>
                        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="email@example.com" required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="+91..." required />
                            </div>
                        </div>
                        <div className="form-group" style={{ marginBottom: '35px' }}>
                           <label>How can we help?</label>
                           <textarea placeholder={isGujarati ? 'સંદેશ...' : 'Tell us about your upcoming plans...'} required></textarea>
                        </div>
                        <button type="submit" className="btn-submit">
                           {isGujarati ? 'સંદેશ મોકલો' : 'Submit Inquiry'} <Send size={18} style={{ marginLeft: '10px' }} />
                        </button>
                     </form>
                   </>
                 )}
              </motion.div>
           </div>
        </div>
      </section>

      <section className="map-section container">
        <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="map-wrapper"
        >
            <iframe 
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.884179344443!2d72.54013111500!3d23.0270034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzM3LjIiTiA3MsKwMzInMzIuNSJF!5e0!3m2!1sen!2sin!4v1617000000000!5m2!1sen!2sin" 
                width="100%" height="600" style={{ border: 0 }} allowFullScreen="" loading="lazy"
            ></iframe>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
