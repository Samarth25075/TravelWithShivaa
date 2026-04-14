import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Star, UserCheck, Heart, ArrowRight, Instagram, Phone, MessageCircle, Clock, Users, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TripCard = ({ isGujarati }) => {
  return (
    <div className="trip-card">
      {/* Placeholder for now */}
    </div>
  );
};

export const CounterStats = ({ isGujarati }) => {
  const stats = [
    { value: '52K+', label: isGujarati ? 'ખુશ પ્રવાસીઓ' : 'Happy Travellers' },
    { value: '4.9★', label: isGujarati ? 'જસ્ટડાયલ રેટિંગ' : 'Rated on Justdial' },
    { value: '50+', label: isGujarati ? 'નવા સ્થળો' : 'Destinations' },
    { value: '5+', label: isGujarati ? 'વર્ષનો અનુભવ' : 'Years Experience' }
  ];

  return (
    <div className="container">
      <div className="stats-row premium-card" style={{
        padding: 'clamp(20px, 5vw, 60px)',
        margin: 'clamp(-40px, -5vw, -80px) auto 60px',
        position: 'relative',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="stat-card" style={{ flex: '1 1 150px' }}>
            <h3 style={{ fontSize: 'clamp(28px, 4vw, 42px)', background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</h3>
            <p style={{ fontWeight: 800, fontSize: '12px' }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WhyChooseUs = ({ isGujarati }) => {
  const cards = [
    { icon: <ShieldCheck size={36} />, title: isGujarati ? 'સુરક્ષિત પ્રવાસ' : 'Curated Experiences', desc: isGujarati ? 'ચકાસાયેલ અને સુરક્ષિત પ્રવાસ પ્રદાન કરીએ છીએ.' : 'Handpicked itineraries by experts.' },
    { icon: <MapPin size={36} />, title: isGujarati ? 'સ્થાનિક ગાઇડ' : 'Expert Local Guides', desc: isGujarati ? 'અમે ભોમિયાઓ સાથે પ્રવાસ કરાવીએ છીએ.' : 'Native storytellers on Every Trip.' },
    { icon: <IndianRupee size={36} />, title: isGujarati ? 'શ્રેષ્ઠ ભાવ' : 'Best Price Guarantee', desc: isGujarati ? 'સસ્તા અને સારા ટ્રાવેલ પેકેજો.' : 'Quality travel that fits your budget.' },
    { icon: <Heart size={36} />, title: isGujarati ? '24/7 સપોર્ટ' : '24/7 Customer Support', desc: isGujarati ? 'અમે હંમેશા તમારી સાથે છીએ.' : 'Peace of mind guaranteed anywhere.' }
  ];

  return (
    <section className="why-us">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <h6 style={{ color: 'var(--primary-orange)', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '15px' }}>{isGujarati ? 'અમને કેમ પસંદ કરો' : 'Discover the Difference'}</h6>
          <h2 className="section-title" style={{ margin: 0 }}>{isGujarati ? 'કેમ ટ્રાવેલ બુક શિવા?' : 'Experience Beyond Borders'}</h2>
        </div>
        <div className="why-grid">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="why-card premium-card"
              whileHover={{ y: -10 }}
              style={{ padding: 'clamp(25px, 5vw, 50px) clamp(20px, 4vw, 40px)' }}
            >
              <div className="glass-icon" style={{ width: '60px', height: '60px', marginBottom: '20px' }}>{card.icon}</div>
              <h3 style={{ fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '12px' }}>{card.title}</h3>
              <p style={{ opacity: 0.7, fontSize: '14px', lineHeight: '1.6' }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DestinationGrid = ({ isGujarati }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('packages')
      .then(res => {
        const popular = res.data.filter(pkg => pkg.is_popular);
        setDestinations(popular);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading popular destinations...</div>;
  if (destinations.length === 0) return (
    <div style={{ textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
      <p style={{ fontWeight: 800, color: 'var(--primary-black)' }}>{isGujarati ? 'ટૂંક સમયમાં નવા સ્થળો ઉમેરવામાં આવશે.' : 'Handpicked destinations are coming soon.'}</p>
    </div>
  );

  const getImageUrl = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80';
    if (image.startsWith('http')) return image;
    return `/api/uploads/${image}`;
  };

  return (
    <div className="dest-grid">
      {destinations.map((dest, i) => (
        <Link key={i} to={`/package/${dest.id}`} className="dest-card animate-on-hover">
          <div className="dest-img-wrapper">
            <img src={getImageUrl(dest.image)} alt={dest.title} loading="lazy" />
            <div className="dest-tag">{dest.location}</div>
            <div className="dest-overlay">
              <h3>{dest.title}</h3>
              <span className="dest-cta">{isGujarati ? 'પેકેજો જુઓ' : 'Explore Packages'} <ArrowRight size={14} /></span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const Testimonials = ({ isGujarati }) => {
  const reviews = [
    { name: 'Kunal Shah', text: 'Spiti with TravelBookShiva was breathtaking. Everything was managed perfectly.', location: 'Ahmedabad' },
    { name: 'Pooja Patel', text: 'Loved the vibes! Best group trip of my life.', location: 'Vadodara' },
    { name: 'Rohan Mevada', text: 'Highly recommended for budget-friendly international packages.', location: 'Ahmedabad' }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">{isGujarati ? 'અમારા પ્રવાસીઓ' : 'What Our Travellers Say'}</h2>
        <div className="review-grid">
          {reviews.map((rev, i) => (
            <div key={i} className="review-card card">
              <div className="stars"><Star size={16} fill="var(--primary-orange)" color="none" /> <Star size={16} fill="var(--primary-orange)" color="none" /> <Star size={16} fill="var(--primary-orange)" color="none" /> <Star size={16} fill="var(--primary-orange)" color="none" /> <Star size={16} fill="var(--primary-orange)" color="none" /></div>
              <p className="review-text">"{rev.text}"</p>
              <hr />
              <div className="reviewer">
                <h4>{rev.name}</h4>
                <p>{rev.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const InstagramFeed = ({ isGujarati }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('settings/insta-posts')
      .then(res => setPosts(res.data.images))
      .catch(err => console.error("Insta feed error:", err));
  }, []);

  const getFullImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith('http')) return img;
    return `/api/uploads/${img}`;
  };

  if (posts.length === 0) return null;

  return (
    <section className="insta-feed">
      <div className="insta-header">
        <a href="https://instagram.com/travelbookshiva" target="_blank" rel="noreferrer">
          <Instagram size={28} />
          <h2>@travelbookshiva</h2>
        </a>
      </div>

      <div className="insta-marquee-container">
        <div className="insta-marquee-track">
          {/* Double the array for infinite scroll effect */}
          {[...posts, ...posts].map((img, i) => (
            <div key={i} className="insta-post-card">
              <div className="insta-overlay-hover"><Heart size={24} fill="white" stroke="none" /></div>
              <img src={getFullImageUrl(img)} alt="Shiv Travel Instagram" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



