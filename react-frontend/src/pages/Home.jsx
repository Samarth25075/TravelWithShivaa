import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRight, Globe, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('/api/packages/featured')
      .then(res => setFeatured(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" style={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("/api/uploads/hero.png") no-repeat center center/cover',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 style={{ fontSize: '72px', fontWeight: 800, marginBottom: '20px', lineHeight: 1.1 }}>Discover Your Next <br /> <span style={{ color: 'var(--primary)' }}>Adventure</span></h1>
            <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.9, maxWidth: '700px', margin: '0 auto 40px' }}>Explore the world's most breathtaking destinations with our personalized travel packages. From mountain heights to coastal shores, your dream journey starts here.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <Link to="/packages" className="btn">Explore Packages <ArrowRight size={18} /></Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div className="section-title">
          <h2>Why Travel With Us?</h2>
          <div className="divider"></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {[
            { icon: <Globe />, title: 'Diverse Destinations', desc: 'We offer a wide range of travel options tailored to diverse preferences and interests.' },
            { icon: <Shield />, title: 'Best Prices', desc: 'Enjoy competitive and transparent pricing on all our travel packages.' },
            { icon: <Clock />, title: '24/7 Support', desc: 'Our dedicated team is available around the clock to assist you with any inquiries.' }
          ].map((item, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '50px 40px', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
              <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section style={{ backgroundColor: 'white', padding: '100px 0' }}>
        <div className="container">
          <div className="section-title">
            <h2>Featured Packages</h2>
            <div className="divider"></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
            {featured.map(pkg => (
              <div key={pkg.id} className="package-card" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                <img src={`/api/uploads/${pkg.image}`} alt={pkg.title} style={{ height: '250px', width: '100%', objectFit: 'cover' }} />
                <div style={{ padding: '30px' }}>
                  <p style={{ color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '12px', marginBottom: '10px' }}>{pkg.location}</p>
                  <h3 style={{ fontSize: '22px', marginBottom: '15px', fontWeight: 800 }}>{pkg.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '24px', fontWeight: 800 }}>₹{pkg.price.toLocaleString()}</p>
                      <span style={{ fontSize: '12px', fontWeight: 400, opacity: 0.6 }}>per person</span>
                    </div>
                    <Link to={`/package/${pkg.id}`} className="btn" style={{ padding: '10px 20px', fontSize: '14px' }}>View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link to="/packages" className="btn btn-secondary">Explore All Destinations</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
