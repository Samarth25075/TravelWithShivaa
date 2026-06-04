'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TripCard, DestinationGrid, Testimonials, WhyChooseUs, InstagramFeed, DestinationBar } from '../components/HomeComponents';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronDown, Search } from 'lucide-react';
import SEO from '../components/SEO';

const Home = ({ isGujarati }) => {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [heroImages, setHeroImages] = useState([
    "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1549111451-40be357bd1b4?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80"
  ]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const getFullImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith('http')) return img;
    return `/api/uploads/${img}`;
  };

  const content = {
    hero: {
      headline: isGujarati ? "અમદાવાદથી શરૂ થયેલી એક અનોખી સફર" : "The Art of Bespoke Travel",
      subline: isGujarati ? "૫૨,૦૦૦+ પ્રવાસીઓનો વિશ્વાસ" : "Founded in Ahmedabad • 52K+ Instagram Community • 10,000+ Journeys Curated",
      cta1: isGujarati ? "પેકેજો જુઓ" : "Explore Packages",
      cta2: isGujarati ? "મારી ટ્રિપ પ્લાન કરો" : "Custom Itinerary"
    },
    sections: {
      destinations: isGujarati ? "લોકપ્રિય સ્થળો" : "Signature Collection",
      whyTravelBookShiva: isGujarati ? "કેમ ટ્રાવેલ બુક શિવા?" : "The Shiva Standard",
      testimonials: isGujarati ? "પ્રવાસીઓનો અનુભવ" : "Voices of Wanderlust"
    }
  };

  return (
    <div className="home-page" style={{ background: 'var(--primary-black)' }}>
      <SEO title="Home" />
      
      {/* Quick Destinations Navigation - In normal flow below fixed header */}
      <DestinationBar isGujarati={isGujarati} />

      {/* Cinematic Hero Slider */}
      <section className="relative h-[80vh] w-full bg-[#0d0d0f] overflow-hidden flex items-center justify-center text-center">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={getFullImageUrl(heroImages[currentImage])}
                alt="Shiv Travel Destinations"
                priority
                fill
                sizes="100vw"
                className="object-cover"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&w=1920&q=80"; }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(circle at center, rgba(13,13,15,0.3) 0%, rgba(13,13,15,0.9) 100%)' }}></div>
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-20 px-[24px] max-w-[850px] w-full flex flex-col items-center py-[60px]"
          style={{ y: y1, opacity: opacity }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="font-serif leading-[1.1] tracking-[-2px] flex flex-col items-center"
            style={{ fontSize: 'clamp(44px, 7vw, 76px)', fontWeight: 300 }}
          >
             <span className="text-white">Discover</span>
             <span className="text-[#E8660A] italic font-light my-2">Extraordinary</span>
             <span className="text-white">Destinations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
            className="text-white/60 text-[15px] mt-[16px] max-w-[600px] text-center"
          >
            {isGujarati ? '૫૨,૦૦૦+ પ્રવાસીઓનો વિશ્વાસ — અમદાવાદની સૌથી વિશ્વસનીય એજન્સી' : '52,000+ happy travellers — Ahmedabad\'s most trusted travel agency'}
          </motion.p>

          {/* Search Bar Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
            className="mt-[32px] max-w-[580px] w-full"
          >
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchVal.trim()) {
                  router.push(`/packages?search=${encodeURIComponent(searchVal.trim())}`);
                }
              }} 
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '50px',
                padding: '5px 5px 5px 20px',
                gap: '12px'
              }}
            >
              <input 
                type="text" 
                placeholder={isGujarati ? 'તમે ક્યાં જવા માંગો છો?' : 'Where do you want to go?'}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'white',
                  fontSize: '14px',
                  width: '100%',
                  fontWeight: 500
                }}
              />
              <button 
                type="submit"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderRadius: '30px',
                  padding: '10px 20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-gold)';
                  e.currentTarget.style.color = 'var(--primary-gold)';
                  e.currentTarget.style.background = 'rgba(232, 102, 10, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {isGujarati ? 'શોધો' : 'Search Trips'}
              </button>
            </form>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
            className="mt-[28px] flex items-center gap-[24px]"
          >
            <Link 
              href="/packages" 
               className="bg-transparent text-white border border-white/20 px-[24px] py-[10px] rounded-[30px] text-[13px] font-semibold transition-all duration-250 hover:border-[#E8660A] hover:text-[#E8660A] no-underline"
               style={{ letterSpacing: '0.5px' }}
             >
               {isGujarati ? 'પેકેજો જુઓ' : 'Explore Packages'}
            </Link>
            <Link 
              href="/custom-package" 
               className="text-white/90 hover:text-[#E8660A] text-[13px] font-semibold flex items-center gap-1.5 transition-colors duration-200 no-underline"
             >
               {isGujarati ? 'કસ્ટમાઇઝ સફર' : 'Plan My Trip'} <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Inline Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.7 }}
            className="mt-[44px] grid grid-cols-2 md:grid-cols-4 gap-[24px] max-w-[680px] w-full pt-[32px] border-t border-white/5"
          >
            <div className="flex flex-col items-center">
              <span className="text-[26px] font-bold text-white leading-none">52K+</span>
              <span className="text-[9px] text-white/40 tracking-[1.5px] uppercase font-semibold mt-2">{isGujarati ? 'ખુશ પ્રવાસીઓ' : 'Happy Travellers'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[26px] font-bold text-white leading-none">6+</span>
              <span className="text-[9px] text-white/40 tracking-[1.5px] uppercase font-semibold mt-2">{isGujarati ? 'વર્ષનો ભરોસો' : 'Years Trusted'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[26px] font-bold text-white leading-none">48+</span>
              <span className="text-[9px] text-white/40 tracking-[1.5px] uppercase font-semibold mt-2">{isGujarati ? 'સ્થળો' : 'Destinations'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[26px] font-bold text-white leading-none">4.9★</span>
              <span className="text-[9px] text-white/40 tracking-[1.5px] uppercase font-semibold mt-2">{isGujarati ? 'રેટિંગ' : 'Average Rating'}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Slide Indicator Dots (bottom center) */}
        <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 z-20 flex gap-[6px]">
          {heroImages.map((_, idx) => (
            <div 
              key={idx} 
              className="w-[7px] h-[7px] rounded-full transition-colors duration-300"
              style={{ background: idx === currentImage ? 'var(--primary-gold)' : 'rgba(232, 102, 10, 0.2)' }}
            />
          ))}
        </div>

        {/* Scroll Hint (bottom right) */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[32px] right-[32px] z-20 flex flex-col items-center gap-[4px] text-[#555555]"
        >
          <span className="text-[11px] font-josefin">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* Featured Destinations Section - Moved up for easier access */}
      <section className="destinations-section" style={{ padding: 'clamp(80px, 12vw, 150px) 0', background: 'var(--primary-black)', position: 'relative' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '60px',
            flexWrap: 'wrap',
            gap: '40px'
          }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <motion.h6 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ color: 'var(--primary-gold)', fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '6px', marginBottom: '20px' }}
              >
                {isGujarati ? 'સ્થળો' : 'The Signature Collection'}
              </motion.h6>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ fontSize: 'clamp(40px, 8vw, 72px)', margin: 0, color: 'white', lineHeight: 1, fontFamily: 'var(--font-heading)', fontWeight: 300 }}
              >
                {content.sections.destinations}
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/packages" style={{ 
                color: 'white', 
                fontWeight: 600, 
                fontFamily: 'var(--font-label)',
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px', 
                fontSize: '14px',
                padding: '18px 35px',
                borderRadius: '50px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary-gold)';
                e.currentTarget.style.color = 'var(--primary-gold)';
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                {isGujarati ? 'બધા જુઓ' : 'View Full Portfolio'} <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
          <DestinationGrid isGujarati={isGujarati} />
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs isGujarati={isGujarati} />

      {/* Testimonials */}
      <Testimonials isGujarati={isGujarati} />

      {/* Instagram Feed - Only shown if there is content */}
      <InstagramFeed isGujarati={isGujarati} />
    </div>
  );
};

export default Home;

