import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, ShieldCheck, Heart, History, Star, MapPin } from 'lucide-react';

const About = ({ isGujarati }) => {
  const values = [
    { icon: <Compass size={32} />, title: isGujarati ? 'સાહસ' : 'Adventure', desc: isGujarati ? 'અમે અવનવા રસ્તાઓ શોધવા માટે જાણીતા છીએ.' : 'Pushing boundaries and exploring the unexplored.' },
    { icon: <ShieldCheck size={32} />, title: isGujarati ? 'વિશ્વસનીયતા' : 'Authenticity', desc: isGujarati ? 'સાચો અને શુદ્ધ અનુભવ પ્રદાન કરીએ છીએ.' : 'Real people, real stories, real connections.' },
    { icon: <IndianRupee size={32} />, title: isGujarati ? 'પરવડે તેવું' : 'Affordability', desc: isGujarati ? 'બધા માટે પ્રવાસ સુલભ બનાવવો.' : 'Premium travel made accessible for everyone.' },
    { icon: <UserCheck size={32} />, title: isGujarati ? 'જવાબદારી' : 'Accountability', desc: isGujarati ? 'તમારી મુસાફરીની પૂરી જવાબદારી અમારી.' : 'We take ownership of every single experience.' }
  ];

  const timeline = [
    { year: '2019', event: isGujarati ? 'ટ્રાવેલ બુક શિવાની સ્થાપના' : 'Founded TravelBookShiva in Ahmedabad' },
    { year: '2020', event: isGujarati ? 'પ્રથમ સ્પિતિ વેલી ગ્રુપ ટ્રિપ' : 'Launched first flagship Spiti expedition' },
    { year: '2022', event: isGujarati ? '10,000+ ખુશ પ્રવાસીઓનો માઈલસ્ટોન' : 'Celebrated 10,000 active travellers' },
    { year: '2024', event: isGujarati ? '52,000+ ઇન્સ્ટાગ્રામ પરિવાર' : 'Grown to 52K+ Instagram community' }
  ];

  return (
    <div className="about-page">
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">{isGujarati ? 'અમારા વિશે' : 'Our Story & Mission'}</h1>
          <p className="page-subtitle">{isGujarati ? 'અમદાવાદથી શરૂ થયેલી એક અનોખી સફર.' : 'From a passion project to a leading travel brand in Ahmedabad.'}</p>
        </div>
      </header>

      <section className="story-section">
        <div className="container">
           <div className="story-grid">
              <div className="story-img">
                 <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80" alt="Founders" className="card" />
                 <div className="img-badge"><Star size={20} fill="white" /> {isGujarati ? 'અમદાવાદમાં રહેઠાણ' : 'Based in Ahmedabad'}</div>
              </div>
              <div className="story-content">
                 <h2>{isGujarati ? 'અમે કોણ છીએ?' : 'Who We Are'}</h2>
                 <p>
                    {isGujarati ? 
                      "ટ્રાવેલ બુક શિવા અમદાવાદ સ્થિત એક પ્રીમિયમ ટ્રાવેલ કંપની છે. અમે પ્રવાસીઓને અજોડ અને યાદગાર અનુભવો પ્રદાન કરવા માટે જાણીતા છીએ." : 
                      "Founded by a group of passionate wanderers from Ahmedabad, TravelBookShiva was born with a simple mission: to make travel meaningful, safe, and wildly fun for the youth of India. We don't just sell packages; we curate memories."
                    }
                 </p>
                 <div className="stats-mini">
                    <div className="s-item"><h3>52K+</h3><p>Followers</p></div>
                    <div className="s-item"><h3>4.9★</h3><p>Avg. Rating</p></div>
                    <div className="s-item"><h3>50+</h3><p>Destinations</p></div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
           <h2 className="section-title">{isGujarati ? 'અમારા મૂલ્યો' : 'Our Core Values'}</h2>
           <div className="values-grid">
              {values.map((v, i) => (
                <div key={i} className="value-card">
                   <div className="v-icon">{v.icon}</div>
                   <h3>{v.title}</h3>
                   <p>{v.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="timeline-section">
         <div className="container">
            <h2 className="section-title">{isGujarati ? 'અત્યાર સુધીની સફર' : 'Our Journey'}</h2>
            <div className="timeline-container">
               {timeline.map((t, i) => (
                 <div key={i} className="timeline-item">
                    <div className="t-year">{t.year}</div>
                    <div className="t-dot"></div>
                    <div className="t-event">{t.event}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <section className="press-section">
         <div className="container">
            <p className="press-label">{isGujarati ? 'અમને અહીં જોવામાં આવ્યા છે' : 'As Featured In'}</p>
            <div className="press-logos">
               <span className="logo-placeholder">JUSTDIAL</span>
               <span className="logo-placeholder">DIVE</span>
               <span className="logo-placeholder">TRIPOTO</span>
               <span className="logo-placeholder">TRIPADVISOR</span>
            </div>
         </div>
      </section>
    </div>
  );
};

// Inline helper for missing icons
const Compass = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
const IndianRupee = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 1 5-5"/></svg>;
const UserCheck = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>;

export default About;
