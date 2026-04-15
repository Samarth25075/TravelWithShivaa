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
      <div className="stats-row" style={{
        padding: 'clamp(30px, 5vw, 80px)',
        margin: 'clamp(-50px, -6vw, -100px) auto 80px',
        position: 'relative',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '30px',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '30px',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="stat-card" style={{ flex: '1 1 150px' }}>
            <h3 style={{ 
              fontSize: 'clamp(32px, 4vw, 48px)', 
              background: 'var(--gradient-gold)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900
            }}>{stat.value}</h3>
            <p style={{ fontWeight: 800, fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px' }}>{stat.label}</p>
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
    <section className="why-us" style={{ background: '#080808', py: '100px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h6 style={{ color: 'var(--primary-gold)', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '5px', marginBottom: '15px', fontFamily: 'var(--font-body)' }}>{isGujarati ? 'અમને કેમ પસંદ કરો' : 'Signature Collection'}</h6>
          <h2 className="section-title" style={{ margin: 0, color: 'white', fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-1px' }}>{isGujarati ? 'કેમ ટ્રાવેલ બુક શિવા?' : 'Elegance in Every Journey'}</h2>
        </div>
        <div className="why-grid">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="why-card"
              whileHover={{ y: -15, borderColor: 'var(--primary-gold)' }}
              style={{ 
                padding: 'clamp(30px, 5vw, 60px) clamp(20px, 4vw, 40px)',
                background: '#111',
                borderRadius: '32px',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                transition: 'var(--transition)'
              }}
            >
              <div className="glass-icon" style={{ 
                width: '70px', 
                height: '70px', 
                marginBottom: '30px', 
                background: 'rgba(212, 175, 55, 0.05)',
                color: 'var(--primary-gold)',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}>{card.icon}</div>
              <h3 style={{ fontSize: 'clamp(20px, 3vw, 24px)', marginBottom: '15px', color: 'white' }}>{card.title}</h3>
              <p style={{ opacity: 0.5, fontSize: '15px', lineHeight: '1.8', color: 'white' }}>{card.desc}</p>
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
    <motion.div 
      className="dest-grid"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {destinations.map((dest, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          <Link to={`/package/${dest.id}`} className="dest-card animate-on-hover">
            <div className="dest-img-wrapper">
              <img src={getImageUrl(dest.image)} alt={dest.title} loading="lazy" />
              <div className="dest-tag">{dest.location}</div>
              <div className="dest-overlay">
                <h3>{dest.title}</h3>
                <span className="dest-cta">{isGujarati ? 'પેકેજો જુઓ' : 'Explore Packages'} <ArrowRight size={14} /></span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const Testimonials = ({ isGujarati }) => {
  const reviews = [
    { name: 'Kunal Shah', text: 'Spiti with TravelBookShiva was breathtaking. Everything was managed perfectly.', location: 'Ahmedabad' },
    { name: 'Pooja Patel', text: 'Loved the vibes! Best group trip of my life.', location: 'Vadodara' },
    { name: 'Rohan Mevada', text: 'Highly recommended for budget-friendly international packages.', location: 'Ahmedabad' }
  ];

  return (
    <section className="testimonials" style={{ background: '#050505', padding: '120px 0' }}>
      <div className="container">
        <h2 className="section-title" style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '80px' }}>{isGujarati ? 'અમારા પ્રવાસીઓ' : 'Voices of Sophistication'}</h2>
        <div className="review-grid">
          {reviews.map((rev, i) => (
            <div key={i} className="review-card" style={{ background: '#111', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '24px', padding: '40px' }}>
              <div className="stars" style={{ marginBottom: '25px', display: 'flex', gap: '5px' }}>
                 <Star size={18} fill="var(--primary-gold)" color="none" />
                 <Star size={18} fill="var(--primary-gold)" color="none" />
                 <Star size={18} fill="var(--primary-gold)" color="none" />
                 <Star size={18} fill="var(--primary-gold)" color="none" />
                 <Star size={18} fill="var(--primary-gold)" color="none" />
              </div>
              <p className="review-text" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontStyle: 'italic', lineHeight: '1.8', marginBottom: '30px' }}>"{rev.text}"</p>
              <div className="reviewer" style={{ display: 'flex', alignItems: 'center', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '25px' }}>
                <div style={{ width: '50px', height: '50px', background: 'var(--gradient-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 900, fontSize: '18px' }}>
                    {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ color: 'white', margin: 0 }}>{rev.name}</h4>
                  <p style={{ color: 'var(--primary-gold)', fontSize: '12px', margin: 0, fontWeight: 700 }}>{rev.location}</p>
                </div>
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

export const AdventurePlanner = ({ isGujarati }) => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({ vibe: '', region: '' });
  const [matches, setMatches] = useState([]);
  const [allPackages, setAllPackages] = useState([]);

  useEffect(() => {
    axios.get('packages')
      .then(res => setAllPackages(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChoice = (key, value) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    
    if (step === 1) {
      // Logic to find matches
      const matched = allPackages.filter(pkg => {
        const typeMatch = (pkg.type || "").toLowerCase().includes(newPrefs.vibe.toLowerCase());
        const locMatch = (pkg.location || "").toLowerCase().includes(newPrefs.region.toLowerCase());
        return typeMatch || locMatch;
      }).slice(0, 3);
      setMatches(matched);
      setStep(2);
    } else {
      setStep(step + 1);
    }
  };

  const steps = [
    {
      title: isGujarati ? "તમને શું વધુ ગમે છે?" : "What's Your Vibe?",
      key: 'vibe',
      options: [
        { label: isGujarati ? 'પહાડો' : 'Mountains', value: 'Mountain', icon: '⛰️' },
        { label: isGujarati ? 'દરિયો' : 'Beaches', value: 'Beach', icon: '🏖️' },
        { label: isGujarati ? 'સંસ્કૃતિ' : 'Culture', value: 'Culture', icon: '🏯' }
      ]
    },
    {
      title: isGujarati ? "ક્યાં જવું છે?" : "Where to Go?",
      key: 'region',
      options: [
        { label: isGujarati ? 'ભારત' : 'India', value: 'India', icon: '🇮🇳' },
        { label: isGujarati ? 'વિદેશ' : 'International', value: 'International', icon: '🌍' }
      ]
    }
  ];

  return (
    <section className="adventure-planner-section" style={{ padding: '120px 0', background: '#050505', color: 'white', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, letterSpacing: '-1px', fontFamily: 'var(--font-heading)' }}>
            {isGujarati ? 'તમારી પરફેક્ટ ટ્રિપ શોધો' : 'Bespoke Wanderlust'}
          </h2>
          <p style={{ opacity: 0.5, fontSize: '18px', marginTop: '15px' }}>
            {isGujarati ? 'ફક્ત ૨ પ્રોશ્નો અને તમારો પ્રવાસ તૈયાર!' : 'Answer 2 questions and we will curate your signature experience.'}
          </p>
        </div>

        <div className="planner-container" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '350px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            {step < 2 ? (
              <motion.div 
                key={step} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                style={{ textAlign: 'center' }}
              >
                <h3 style={{ marginBottom: '40px', fontSize: '24px', fontWeight: 800 }}>{steps[step].title}</h3>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {steps[step].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChoice(steps[step].key, opt.value)}
                      style={{
                        padding: '30px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        color: 'white',
                        cursor: 'pointer',
                        minWidth: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '15px'
                      }}
                    >
                      <span style={{ fontSize: '40px' }}>{opt.icon}</span>
                      <span style={{ fontWeight: 800 }}>{opt.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="results" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center' }}
              >
                <h3 style={{ marginBottom: '30px', fontWeight: 900 }}>{isGujarati ? 'અમારા સૂચનો' : 'Our Top Recommendations'}</h3>
                {matches.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                    {matches.map((match, i) => (
                      <Link key={i} to={`/package/${match.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <motion.div 
                          whileHover={{ y: -5 }}
                          style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            borderRadius: '20px', 
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)'
                          }}
                        >
                          <img 
                            src={(match.image || "").startsWith('http') ? match.image : `/api/uploads/${match.image}`} 
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
                            alt={match.title}
                          />
                          <div style={{ padding: '15px' }}>
                            <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{match.title}</h4>
                            <p style={{ color: 'var(--primary-orange)', fontWeight: 900, fontSize: '14px' }}>₹{(match.price || 0).toLocaleString()}</p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '40px', opacity: 0.5 }}>
                    <p>{isGujarati ? 'તમારી પસંદગી મુજબ અત્યારે કોઈ પેકેજ નથી.' : 'No matches found. Try exploring all packages!'}</p>
                    <Link to="/packages"><button className="btn-primary-small" style={{ marginTop: '20px' }}>View All Packages</button></Link>
                  </div>
                )}
                <button 
                  onClick={() => setStep(0)} 
                  style={{ 
                    marginTop: '40px', 
                    background: 'none', 
                    border: 'none', 
                    color: 'rgba(255,255,255,0.4)', 
                    cursor: 'pointer', 
                    fontWeight: 700, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    marginInline: 'auto'
                  }}
                >
                  <ArrowRight size={16} /> {isGujarati ? 'ફરીથી પ્રયાસ કરો' : 'Start Over'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};



