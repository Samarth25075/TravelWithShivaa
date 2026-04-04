import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, Globe, Shield, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('packages/featured')
      .then(res => setFeatured(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.7)), url("/api/uploads/hero.png") no-repeat center center/cover',
        color: 'var(--white)',
        position: 'relative',
        padding: '100px 0'
      }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ maxWidth: '850px' }}
          >
            <span style={{ 
              backgroundColor: 'rgba(245, 158, 11, 0.2)', 
              color: 'var(--primary)', 
              padding: '10px 24px', 
              borderRadius: '50px', 
              fontSize: '14px', 
              fontWeight: 800, 
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '25px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              Start Your Journey Today
            </span>
            <h1 style={{ 
              fontSize: 'clamp(48px, 8vw, 84px)', 
              fontWeight: 900, 
              marginBottom: '30px', 
              lineHeight: 1,
              letterSpacing: '-3px'
            }}>
              Explore the World <br /> 
              <span style={{ color: 'var(--primary)', textShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>Without Limits</span>
            </h1>
            <p style={{ 
              fontSize: 'clamp(18px, 2vw, 22px)', 
              marginBottom: '50px', 
              opacity: 0.9, 
              maxWidth: '650px',
              lineHeight: 1.6 
            }}>
              Shiv Travel crafts elite experiences for the modern explorer. From hidden trails to luxury escapes, we make your dream destinations a reality.
            </p>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '20px' 
            }}>
              <Link to="/packages" className="btn">View All Tours <ArrowRight size={20} /></Link>
              <Link to="/contact" className="btn btn-secondary glass" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>Contact Our Experts</Link>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Scroll Indicator (Optional but looks premium) */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ width: '2px', height: '40px', background: 'var(--white)', opacity: 0.5 }}></motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '120px 0', backgroundColor: '#fdfdfd' }}>
        <div className="container">
          <div className="section-title">
            <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px' }}>The Shiv Travel Edge</span>
            <h2>Why Travelers Choose Us</h2>
            <div className="divider" style={{ marginTop: '20px' }}></div>
          </div>
          <div className="grid-auto">
            {[
              { icon: <Globe size={32} />, title: 'Curated Destinations', desc: 'Hand-picked luxury spots and hidden gems around the globe, verified by travel experts.' },
              { icon: <Shield size={32} />, title: 'Secure Bookings', desc: '100% transparent pricing and secure payment gateways for a worry-free experience.' },
              { icon: <Clock size={32} />, title: '24/7 Concierge', desc: 'Our dedicated support team is always active to assist you at every step of your journey.' }
            ].map((item, index) => (
              <motion.div 
                whileHover={{ y: -15 }}
                key={index} 
                style={{ 
                  padding: '60px 40px', 
                  backgroundColor: 'white', 
                  borderRadius: 'var(--radius-lg)', 
                  boxShadow: 'var(--shadow)',
                  border: '1px solid var(--border)',
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  color: 'white', 
                  backgroundColor: 'var(--secondary)',
                  width: '80px',
                  height: '80px',
                  borderRadius: '24px',
                  margin: '0 auto 30px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 10px 20px rgba(15, 23, 42, 0.1)'
                }}>{item.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '20px', color: 'var(--secondary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section style={{ backgroundColor: 'var(--secondary)', padding: '120px 0', color: 'white' }}>
        <div className="container">
          <div className="section-title">
            <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px' }}>Trending Now</span>
            <h2 style={{ color: 'white' }}>Most Loved Experiences</h2>
            <div className="divider" style={{ marginTop: '20px' }}></div>
          </div>
          
          {featured.length > 0 ? (
            <div className="grid-auto">
              {featured.map((pkg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={pkg.id} 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                    borderRadius: 'var(--radius-lg)', 
                    overflow: 'hidden', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative'
                  }}
                >
                  <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
                    <img src={`/api/uploads/${pkg.image}`} alt={pkg.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', padding: '10px 20px', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '50px', fontWeight: 900, fontSize: '14px' }}>
                      ₹{pkg.price.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ padding: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '15px' }}>
                      <MapPin size={16} />
                      <p style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>{pkg.location}</p>
                    </div>
                    <h3 style={{ fontSize: '28px', marginBottom: '25px', fontWeight: 900 }}>{pkg.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Link to={`/package/${pkg.id}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        Discover Details <ArrowRight size={18} color="var(--primary)" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
              <p>Adventures are currently being curated. Please check back soon!</p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <Link to="/packages" className="btn">See All Tours</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

