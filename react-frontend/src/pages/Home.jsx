import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripCard, DestinationGrid, Testimonials, CounterStats, WhyChooseUs, InstagramFeed, AdventurePlanner } from '../components/HomeComponents';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = ({ isGujarati }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [heroImages, setHeroImages] = useState([
    "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1549111451-40be357bd1b4?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80"
  ]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/settings/home-images');
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          setHeroImages(data.images);
        }
      } catch (err) {
        console.error("Failed to fetch carousel images:", err);
      }
    };
    fetchImages();

    const timer = setInterval(() => {
      setHeroImages(prevImages => {
        if (prevImages.length > 0) {
          setCurrentImage((prev) => (prev + 1) % prevImages.length);
        }
        return prevImages;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getFullImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith('http')) return img;
    return `/api/uploads/${img}`;
  };

  const content = {
    hero: {
      headline: isGujarati ? "તમારી આગામી સાહસ અહીંથી શરૂ થાય છે" : "Your Next Adventure Starts Here",
      subline: isGujarati ? "ગ્રુપ ટ્રિપ્સ | કસ્ટમાઇઝ્ડ ટ્રાવેલ પેકેજો" : "Group Trips | Customised Travel Packages",
      cta1: isGujarati ? "પેકેજો જુઓ" : "Explore Packages",
      cta2: isGujarati ? "મારી ટ્રિપ પ્લાન કરો" : "Plan My Custom Trip"
    },
    sections: {
      destinations: isGujarati ? "લોકપ્રિય સ્થળો" : "Popular Destinations",
      whyTravelBookShiva: isGujarati ? "કેમ ટ્રાવેલ બુક શિવા?" : "Why TravelBookShiva?",
      testimonials: isGujarati ? "પ્રવાસીઓનો અનુભવ" : "What Our Travellers Say"
    }
  };

  return (
    <div className="home-page">
      {/* Cinematic Hero Slider */}
      <section className="hero" style={{ height: '100vh', position: 'relative' }}>
        <div className="hero-carousel" style={{ height: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={getFullImageUrl(heroImages[currentImage])}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="carousel-img"
              alt="Shiv Travel Destinations"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </AnimatePresence>
        </div>
        <div className="hero-overlay" style={{ 
          background: 'linear-gradient(rgba(0,0,0,0.4) 0%, rgba(5,5,5,1) 100%)',
          zIndex: 2 
        }}></div>
        
        <div className="hero-content" style={{ zIndex: 10, paddingBottom: '100px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="hero-headline"
            style={{ 
              fontSize: 'clamp(50px, 12vw, 120px)', 
              fontWeight: 400, 
              lineHeight: 0.9, 
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-2px',
              color: 'white',
              marginBottom: '30px'
            }}
          >
            {content.hero.headline}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subline"
          >
            {content.hero.subline}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-ctas"
          >
            <Link to="/packages"><button className="btn-primary-large">{content.hero.cta1}</button></Link>
            <Link to="/custom-package"><button className="btn-secondary-large">{content.hero.cta2}</button></Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <CounterStats isGujarati={isGujarati} />

      {/* Why Choose Us */}
      <WhyChooseUs isGujarati={isGujarati} />

      {/* Adventure Planner - Interactive Section */}
      <AdventurePlanner isGujarati={isGujarati} />

      {/* Featured Destinations Section */}
      <section className="destinations-section" style={{ padding: 'clamp(60px, 10vw, 100px) 0', background: 'white' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'baseline', 
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h6 style={{ color: 'var(--primary-orange)', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '12px' }}>{isGujarati ? 'સ્થળો' : 'Explore the World'}</h6>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 36px)', margin: 0 }}>{content.sections.destinations}</h2>
            </div>
            <Link to="/packages" style={{ color: 'var(--primary-black)', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              {isGujarati ? 'બધા જુઓ' : 'View All'} <ArrowRight size={16} />
            </Link>
          </div>
          <DestinationGrid isGujarati={isGujarati} />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials isGujarati={isGujarati} />

      {/* Instagram Feed */}
      <InstagramFeed isGujarati={isGujarati} />
    </div>
  );
};

export default Home;
