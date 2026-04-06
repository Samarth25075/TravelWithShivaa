import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';

const Contact = ({ isGujarati }) => {
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="contact-page">
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">{isGujarati ? 'સંપર્ક કરો' : 'Connect With Us'}</h1>
          <p className="page-subtitle">{isGujarati ? 'તમારી આગામી સફર માટે અમે તૈયાર છીએ.' : "Ready for your next adventure? Let's talk travel."}</p>
        </div>
      </header>

      <section className="contact-section">
        <div className="container">
           <div className="contact-grid">
              <div className="contact-info card">
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

                 <hr />
                 <div className="social-connect">
                    <p>{isGujarati ? 'અમને ફોલો કરો' : 'Follow our journey'}</p>
                    <div className="social-links-row">
                       <a href="#"><Instagram /></a>
                       <a href="#"><Facebook /></a>
                       <a href="#"><Twitter /></a>
                    </div>
                 </div>
              </div>

              <div className="contact-form-container card">
                 {formSent ? (
                   <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="success-msg">
                      <div className="success-icon"><ShieldCheck size={48} /></div>
                      <h3>Thank You!</h3>
                      <p>We've received your message and will get back to you within 24 hours.</p>
                      <button className="btn-primary" onClick={() => setFormSent(false)}>Send another</button>
                   </motion.div>
                 ) : (
                   <>
                     <h2>{isGujarati ? 'સંદેશ મોકલો' : 'Send a Message'}</h2>
                     <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}>
                        <div className="form-group">
                           <input type="text" placeholder={isGujarati ? 'તમારું નામ' : 'Your Full Name'} required />
                        </div>
                        <div className="form-group">
                           <input type="email" placeholder={isGujarati ? 'તમારો ઇમેલ' : 'Your Email Address'} required />
                        </div>
                        <div className="form-group">
                           <input type="tel" placeholder={isGujarati ? 'તમારો મોબાઈલ' : 'Phone Number'} required />
                        </div>
                        <div className="form-group">
                           <textarea placeholder={isGujarati ? 'સંદેશ...' : 'How can we help you?'} rows="5" required></textarea>
                        </div>
                        <button type="submit" className="btn-primary-full">
                           {isGujarati ? 'સંદેશ મોકલો' : 'Send Inquiry'} <Send size={18} />
                        </button>
                     </form>
                   </>
                 )}
              </div>
           </div>
        </div>
      </section>

      <section className="map-section">
         <div className="container">
            <div className="map-wrapper card">
               <iframe 
                  title="TravelBookShiva Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.884179344443!2d72.54013111500!3d23.0270034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzM3LjIiTiA3MsKwMzInMzIuNSJF!5e0!3m2!1sen!2sin!4v1617000000000!5m2!1sen!2sin" 
                  width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
               ></iframe>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Contact;
