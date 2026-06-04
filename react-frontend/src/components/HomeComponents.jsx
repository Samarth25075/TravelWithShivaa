'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MapPin, Star, UserCheck, Heart, ArrowRight, Instagram, Phone, MessageCircle, Clock, Users, IndianRupee, Quote, Mountain, Trees, TreePine, Compass, Tent, Crown, Sunset, Sunrise, Leaf, Waves } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const resolveImageUrl = (image) => {
  if (!image) return 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&fm=webp';
  if (image.startsWith('http') || image.startsWith('/')) {
    if (image.includes('unsplash.com') && !image.includes('fm=webp')) {
      return `${image}&fm=webp`;
    }
    return image;
  }
  return `/api/uploads/${image}`;
};

export const TripCard = ({ isGujarati }) => {
  return (
    <div className="trip-card">
      {/* Placeholder for now */}
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
              <p style={{ opacity: 0.6, fontSize: '15px', lineHeight: '1.7', color: 'var(--text-light)' }}>{card.desc}</p>
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
      background: 'rgba(232, 102, 10, 0.02)', 
      borderRadius: 'var(--radius-card)', 
      border: '1px solid rgba(232, 102, 10, 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <p style={{ fontWeight: 500, color: 'rgba(255,255,255,0.4)', fontSize: '18px', letterSpacing: '1px' }}>
        {isGujarati ? 'ટૂંક સમયમાં નવા સ્થળો ઉમેરવામાં આવશે.' : 'Our next signature destinations are currently being curated for the season.'}
      </p>
    </div>
  );

  const getImageUrl = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&fm=webp';
    if (image.startsWith('http')) {
      if (image.includes('unsplash.com') && !image.includes('fm=webp')) {
        return `${image}&fm=webp`;
      }
      return image;
    }
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
          <Link href={`/packages/${dest.slug || dest.id}`} className="dest-card-premium" style={{ 
            display: 'block', 
            position: 'relative', 
            borderRadius: 'var(--radius-card)', 
            overflow: 'hidden',
            aspectRatio: '16/9',
            textDecoration: 'none',
            background: '#111',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <motion.div 
              style={{ width: '100%', height: '100%', position: 'relative' }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image 
                src={getImageUrl(dest.image)} 
                alt={dest.title} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80'; }}
              />
            </motion.div>

            {/* Price/Type Tag */}
            <div style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '20px',
              background: 'rgba(5, 5, 5, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(232, 102, 10, 0.3)',
              color: 'var(--primary-gold)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-badge)',
              fontSize: '12px',
              fontWeight: 600,
              zIndex: 5,
              fontFamily: 'var(--font-label)'
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
                fontWeight: 600, 
                textTransform: 'uppercase', 
                letterSpacing: '2px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-label)'
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
                fontWeight: 600,
                letterSpacing: '1px',
                opacity: 0.8,
                fontFamily: 'var(--font-label)'
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
    <section className="testimonials" style={{ background: 'var(--primary-black)', padding: '150px 0' }}>
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
                color: 'var(--text-light)', 
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
                  <h4 style={{ color: 'var(--text-light)', margin: '0 0 5px 0', fontSize: '18px', fontWeight: 500 }}>{rev.name}</h4>
                  <p style={{ color: 'var(--primary-gold)', fontSize: '11px', margin: 0, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'var(--font-label)' }}>{rev.location}</p>
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
            <div key={i} className="insta-post-card" style={{ flexShrink: 0, width: '300px', height: '300px', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
              <Image 
                src={getFullImageUrl(img)} 
                alt="Shiv Travel Instagram" 
                fill
                sizes="300px"
                className="object-cover"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'; }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const DestinationBar = ({ isGujarati }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('settings/destinations')
      .then(res => {
        setDestinations(res.data.destinations || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch destinations:", err);
        setLoading(false);
      });
  }, []);

  if (loading || destinations.length === 0) {
    return (
      <section className="destination-bar-section" style={{ 
        padding: '20px 0', 
        background: 'transparent', 
        borderBottom: 'none'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'var(--text-light)',
            opacity: 0.6,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1px',
            fontFamily: 'var(--font-label)'
          }}>
            Loading Destinations...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="destination-bar-section" style={{ 
      padding: '10px 0', 
      background: 'transparent', 
      borderBottom: 'none'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '20px',
          overflowX: 'auto',
          padding: '4px 0',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }} className="no-scrollbar">
          {destinations.map((dest, i) => (
            <Link 
              key={i} 
              href={`/packages?search=${dest.searchKey}`}
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  minWidth: '90px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(232, 102, 10, 0.03)',
                  border: '1.5px solid rgba(232, 102, 10, 0.35)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}
                className="dest-icon-container"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-gold)';
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(232, 102, 10, 0.5)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(232, 102, 10, 0.35)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.0)';
                }}
                >
                  <Image 
                    src={resolveImageUrl(dest.image)} 
                    alt={isGujarati ? dest.name_gu : dest.name_en} 
                    fill 
                    sizes="56px"
                    className="object-cover"
                    style={{ transition: 'transform 0.3s ease' }}
                    onError={(e) => { 
                      e.currentTarget.onerror = null; 
                      e.currentTarget.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=150&q=80"; 
                    }}
                  />
                </div>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--text-light)',
                  opacity: 0.8,
                  letterSpacing: '1.2px',
                  fontFamily: 'var(--font-label)',
                  textTransform: 'uppercase'
                }}>
                  {isGujarati ? dest.name_gu : dest.name_en}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};




