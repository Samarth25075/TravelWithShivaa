import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Star, UserCheck, Heart, ArrowRight, Instagram, Phone, MessageCircle, Clock, Users, IndianRupee, Quote } from 'lucide-react';
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
    { value: '52K+', label: isGujarati ? 'ખુશ પ્રવાસીઓ' : 'Global Explorers' },
    { value: '4.9★', label: isGujarati ? 'જસ્ટડાયલ રેટિંગ' : 'Impeccable Rating' },
    { value: '50+', label: isGujarati ? 'નવા સ્થળો' : 'Hidden Gems' },
    { value: '5+', label: isGujarati ? 'વર્ષનો અનુભવ' : 'Years of Excellence' }
  ];

  return (
    <div className="container">
      <div className="stats-row" style={{
        padding: 'clamp(40px, 6vw, 100px)',
        margin: 'clamp(-60px, -8vw, -120px) auto 100px',
        position: 'relative',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '40px',
        background: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(30px)',
        borderRadius: '40px',
        border: '1px solid rgba(212, 175, 55, 0.15)',
        boxShadow: '0 50px 100px rgba(0,0,0,0.9)'
      }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="stat-card" 
            style={{ flex: '1 1 180px', textAlign: 'center' }}
          >
            <h3 style={{ 
              fontSize: 'clamp(36px, 5vw, 56px)', 
              background: 'var(--gradient-gold)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              marginBottom: '10px'
            }}>{stat.value}</h3>
            <p style={{ 
              fontWeight: 700, 
              fontSize: '11px', 
              color: 'rgba(255,255,255,0.4)', 
              letterSpacing: '3px', 
              textTransform: 'uppercase' 
            }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const WhyChooseUs = ({ isGujarati }) => {
  const cards = [
    { icon: <ShieldCheck size={32} />, title: isGujarati ? 'સુરક્ષિત પ્રવાસ' : 'Elite Curation', desc: isGujarati ? 'ચકાસાયેલ અને સુરક્ષિત પ્રવાસ પ્રદાન કરીએ છીએ.' : 'Every itinerary is hand-selected and vetted by our global travel experts.' },
    { icon: <MapPin size={32} />, title: isGujarati ? 'સ્થાનિક ગાઇડ' : 'Local Connoisseurs', desc: isGujarati ? 'અમે ભોમિયાઓ સાથે પ્રવાસ કરાવીએ છીએ.' : 'Access hidden local secrets with guides who live and breathe the culture.' },
    { icon: <IndianRupee size={32} />, title: isGujarati ? 'શ્રેષ્ઠ ભાવ' : 'Transparent Luxury', desc: isGujarati ? 'સસ્તા અને સારા ટ્રાવેલ પેકેજો.' : 'Experience the pinnacle of luxury with pricing that remains fair and clear.' },
    { icon: <Heart size={32} />, title: isGujarati ? '24/7 સપોર્ટ' : 'Concierge Support', desc: isGujarati ? 'અમે હંમેશા તમારી સાથે છીએ.' : 'Round-the-clock assistance ensuring your journey is seamless from start to finish.' }
  ];

  return (
    <section className="why-us" style={{ background: 'var(--primary-black)', padding: '150px 0' }}>
      <div className="container">
        <div className="section-header">
          <h6>{isGujarati ? 'અમને કેમ પસંદ કરો' : 'The Shiva Standard'}</h6>
          <h2>{isGujarati ? 'કેમ ટ્રાવેલ બુક શિવા?' : 'Redefining the Journey'}</h2>
        </div>
        <div className="why-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '30px' 
        }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="premium-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              style={{ padding: '50px 40px' }}
            >
              <div className="glass-icon" style={{ marginBottom: '35px' }}>{card.icon}</div>
              <h3 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 500 }}>{card.title}</h3>
              <p style={{ opacity: 0.6, fontSize: '15px', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)' }}>{card.desc}</p>
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
        const dataArray = Array.isArray(res.data) ? res.data : (res.data.data || []);
        let popular = dataArray.filter(pkg => pkg.is_popular);
        // Fallback: If no packages are marked popular, show the latest 6 packages
        if (popular.length === 0) {
          popular = dataArray.slice(0, 6);
        }
        setDestinations(popular);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-gold)', fontFamily: 'var(--font-heading)', fontSize: '20px', letterSpacing: '2px' }}>Curating Portfolios...</div>;
  
  if (destinations.length === 0) return (
    <div style={{ 
      textAlign: 'center', 
      padding: '120px 40px', 
      background: 'rgba(212, 175, 55, 0.02)', 
      borderRadius: '40px', 
      border: '1px solid rgba(212, 175, 55, 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <p style={{ fontWeight: 500, color: 'rgba(255,255,255,0.4)', fontSize: '18px', letterSpacing: '1px' }}>
        {isGujarati ? 'ટૂંક સમયમાં નવા સ્થળો ઉમેરવામાં આવશે.' : 'Our next signature destinations are currently being curated for the season.'}
      </p>
    </div>
  );

  const getImageUrl = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80';
    if (image.startsWith('http')) return image;
    return `/api/uploads/${image}`;
  };

  return (
    <div className="dest-grid" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '25px' 
    }}>
      {destinations.map((dest, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Link to={`/package/${dest.id}`} className="dest-card-premium" style={{ 
            display: 'block', 
            position: 'relative', 
            borderRadius: '40px', 
            overflow: 'hidden',
            aspectRatio: '4/5',
            textDecoration: 'none',
            background: '#111',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <motion.div 
              style={{ width: '100%', height: '100%' }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img 
                src={getImageUrl(dest.image)} 
                alt={dest.title} 
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>

            {/* Price/Type Tag */}
            <div style={{ 
              position: 'absolute', 
              top: '30px', 
              right: '30px',
              background: 'rgba(5, 5, 5, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: 'var(--primary-gold)',
              padding: '8px 18px',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: 800,
              zIndex: 5
            }}>
              {dest.price ? `From ₹${dest.price}` : 'Signature'}
            </div>

            {/* Bottom Overlay */}
            <div style={{ 
              position: 'absolute', 
              bottom: 0, left: 0, right: 0, 
              padding: '30px',
              background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.8) 40%, transparent 100%)',
              zIndex: 4,
              transition: 'var(--transition)'
            }}>
              <div style={{ 
                color: 'var(--primary-gold)', 
                fontSize: '10px', 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                letterSpacing: '2px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <MapPin size={10} /> {dest.location}
              </div>
              
              <h3 style={{ 
                color: 'white', 
                fontSize: 'clamp(20px, 2vw, 24px)', 
                marginBottom: '15px', 
                fontWeight: 300, 
                fontFamily: 'var(--font-heading)',
                lineHeight: 1.2
              }}>
                {dest.title}
              </h3>

              <div className="explore-btn" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                color: 'white', 
                fontSize: '12px', 
                fontWeight: 700,
                letterSpacing: '1px',
                opacity: 0.8
              }}>
                <span style={{ borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '4px' }}>
                  {isGujarati ? 'પેકેજો જુઓ' : 'View Portfolio'}
                </span>
                <ArrowRight size={16} />
              </div>
            </div>

            {/* Hover Shine Effect */}
            <div className="card-shine" style={{
              position: 'absolute',
              top: 0, left: '-100%',
              width: '50%', height: '100%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)',
              transform: 'skewX(-25deg)',
              transition: '0.8s',
              zIndex: 3
            }}></div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export const Testimonials = ({ isGujarati }) => {
  const reviews = [
    { name: 'Kunal Shah', text: 'Spiti with TravelBookShiva was breathtaking. The attention to detail was beyond anything I have experienced before.', location: 'Ahmedabad' },
    { name: 'Pooja Patel', text: 'The group vibe was incredible. I felt safe, pampered, and truly inspired throughout the journey.', location: 'Vadodara' },
    { name: 'Rohan Mevada', text: 'Luxury travel made accessible. Their international curation is simply world-class.', location: 'Ahmedabad' }
  ];

  return (
    <section className="testimonials" style={{ background: '#080808', padding: '150px 0' }}>
      <div className="container">
        <div className="section-header">
          <h6>{isGujarati ? 'અમારા પ્રવાસીઓ' : 'Voices of Sophistication'}</h6>
          <h2>{isGujarati ? 'અમારા પ્રવાસીઓ' : 'Testimonials of Trust'}</h2>
        </div>
        <div className="review-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '30px' 
        }}>
          {reviews.map((rev, i) => (
            <motion.div 
              key={i} 
              className="premium-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              style={{ padding: '40px' }}
            >
              <Quote size={40} color="var(--primary-gold)" style={{ opacity: 0.2, marginBottom: '30px' }} />
              <p className="review-text" style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '18px', 
                lineHeight: '1.8', 
                marginBottom: '40px',
                fontWeight: 300,
                fontStyle: 'italic'
              }}>"{rev.text}"</p>
              <div className="reviewer" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  width: '60px', height: '60px', 
                  background: 'var(--gradient-gold)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#000', 
                  fontWeight: 900, 
                  fontSize: '20px' 
                }}>
                    {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '18px', fontWeight: 500 }}>{rev.name}</h4>
                  <p style={{ color: 'var(--primary-gold)', fontSize: '11px', margin: 0, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>{rev.location}</p>
                </div>
              </div>
            </motion.div>
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
    <section className="insta-feed" style={{ padding: '100px 0', background: 'var(--primary-black)' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <a href="https://instagram.com/travelbookshiva" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', color: 'white' }}>
            <Instagram size={32} />
            <h2 style={{ fontSize: '24px', margin: 0, fontWeight: 300 }}>@travelbookshiva</h2>
          </div>
        </a>
      </div>

      <div className="insta-marquee-container" style={{ overflow: 'hidden', padding: '20px 0' }}>
        <div className="insta-marquee-track" style={{ display: 'flex', gap: '20px' }}>
          {/* Double the array for infinite scroll effect */}
          {[...posts, ...posts].map((img, i) => (
            <div key={i} className="insta-post-card" style={{ flexShrink: 0, width: '300px', height: '300px', borderRadius: '24px', overflow: 'hidden' }}>
              <img src={getFullImageUrl(img)} alt="Shiv Travel Instagram" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
      .then(res => {
        const dataArray = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setAllPackages(dataArray);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChoice = (key, value) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    
    if (step === 1) {
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
      title: isGujarati ? "તમને શું વધુ ગમે છે?" : "What defines your journey?",
      key: 'vibe',
      options: [
        { label: isGujarati ? 'પહાડો' : 'The Mountains', value: 'Mountain', icon: '⛰️' },
        { label: isGujarati ? 'દરિયો' : 'Coastal Serenity', value: 'Beach', icon: '🏖️' },
        { label: isGujarati ? 'સંસ્કૃતિ' : 'Cultural Heritage', value: 'Culture', icon: '🏯' }
      ]
    },
    {
      title: isGujarati ? "ક્યાં જવું છે?" : "Where shall we go?",
      key: 'region',
      options: [
        { label: isGujarati ? 'ભારત' : 'Domestic Elegance', value: 'India', icon: '🇮🇳' },
        { label: isGujarati ? 'વિદેશ' : 'Global Expeditions', value: 'International', icon: '🌍' }
      ]
    }
  ];

  return (
    <section className="adventure-planner-section" style={{ padding: '150px 0', background: 'var(--secondary-black)', color: 'white', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
      <div className="container">
        <div className="section-header">
          <h6>{isGujarati ? 'તમારી પરફેક્ટ ટ્રિપ શોધો' : 'The Bespoke Experience'}</h6>
          <h2>{isGujarati ? 'તમારી પરફેક્ટ ટ્રિપ શોધો' : 'Your Signature Itinerary'}</h2>
          <p style={{ opacity: 0.5, fontSize: '18px', marginTop: '20px', maxWidth: '600px', marginInline: 'auto' }}>
            {isGujarati ? 'ફક્ત ૨ પ્રોશ્નો અને તમારો પ્રવાસ તૈયાર!' : 'Answer two simple questions and let us curate a journey that resonates with your soul.'}
          </p>
        </div>

        <div className="planner-container" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '400px', position: 'relative' }}>
          <AnimatePresence mode="wait">
            {step < 2 ? (
              <motion.div 
                key={step} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                style={{ textAlign: 'center' }}
              >
                <h3 style={{ marginBottom: '50px', fontSize: '28px', fontWeight: 300, fontFamily: 'var(--font-heading)' }}>{steps[step].title}</h3>
                <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {steps[step].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05, borderColor: 'var(--primary-gold)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleChoice(steps[step].key, opt.value)}
                      style={{
                        padding: '40px 30px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '30px',
                        color: 'white',
                        cursor: 'pointer',
                        minWidth: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                        transition: 'var(--transition)'
                      }}
                    >
                      <span style={{ fontSize: '48px' }}>{opt.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>{opt.label}</span>
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
                <h3 style={{ marginBottom: '40px', fontWeight: 300, fontSize: '28px', fontFamily: 'var(--font-heading)' }}>{isGujarati ? 'અમારા સૂચનો' : 'Curated Just for You'}</h3>
                {matches.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
                    {matches.map((match, i) => (
                      <Link key={i} to={`/package/${match.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <motion.div 
                          whileHover={{ y: -10 }}
                          className="premium-card"
                          style={{ padding: '0', borderRadius: '30px' }}
                        >
                          <img 
                            src={(match.image || "").startsWith('http') ? match.image : `/api/uploads/${match.image}`} 
                            style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                            loading="lazy"
                            alt={match.title}
                          />
                          <div style={{ padding: '25px', textAlign: 'left' }}>
                            <h4 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 500 }}>{match.title}</h4>
                            <p style={{ color: 'var(--primary-gold)', fontWeight: 800, fontSize: '16px' }}>₹{(match.price || 0).toLocaleString()}</p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '60px', opacity: 0.5 }}>
                    <p>{isGujarati ? 'તમારી પસંદગી મુજબ અત્યારે કોઈ પેકેજ નથી.' : 'No signature matches found. Perhaps explore our entire collection?'}</p>
                    <Link to="/packages"><button className="btn-primary-large" style={{ marginTop: '30px' }}>View All Packages</button></Link>
                  </div>
                )}
                <button 
                  onClick={() => setStep(0)} 
                  style={{ 
                    marginTop: '50px', 
                    background: 'none', 
                    border: 'none', 
                    color: 'rgba(255,255,255,0.4)', 
                    cursor: 'pointer', 
                    fontWeight: 700, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    marginInline: 'auto',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}
                >
                   {isGujarati ? 'ફરીથી પ્રયાસ કરો' : 'Start Over'} <ArrowRight size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};



