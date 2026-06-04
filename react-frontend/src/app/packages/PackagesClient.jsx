'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, IndianRupee, Clock, Mountain, Palmtree, Compass, Sparkles, Footprints, ShieldCheck, LayoutGrid, List, ChevronRight, Star, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import axios from 'axios';

const Packages = ({ isGujarati }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(150000);
  const [viewMode, setViewMode] = useState('grid');

  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get('search') : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('packages')
      .then(res => {
        const dataArray = Array.isArray(res.data) ? res.data : (res.data.data || []);
        setPackages(dataArray);
        if (dataArray.length > 0) {
          const max = Math.max(...dataArray.map(p => p.price || 0));
          setPriceRange(isFinite(max) ? max + 1000 : 150000);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { label: isGujarati ? 'બધા' : 'All', value: 'All', icon: <Compass size={18} /> },
    { label: isGujarati ? 'પર્વત' : 'Mountains', value: 'Mountain', icon: <Mountain size={18} /> },
    { label: isGujarati ? 'દરિયાકાંઠો' : 'Beaches', value: 'Beach', icon: <Palmtree size={18} /> },
    { label: isGujarati ? 'ધાર્મિક' : 'Spiritual', value: 'Spiritual', icon: <Sparkles size={18} /> },
    { label: isGujarati ? 'સાહસ' : 'Adventure', value: 'Adventure', icon: <Footprints size={18} /> }
  ];

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

  const filtered = packages.filter(pkg => {
    const matchesCategory = filter === 'All' || pkg.type === filter;
    const matchesPrice = pkg.price <= priceRange;
    const matchesSearch = searchQuery 
      ? (pkg.location || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (pkg.title || '').toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="packages-page" style={{ backgroundColor: 'var(--primary-black)', minHeight: '100vh', color: 'var(--text-light)' }}>
      {/* Luxury Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden" style={{ height: '65vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&fm=webp"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 contrast-[1.1]"
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80"; }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 0%, #0d1117 100%)', zIndex: 1 }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ color: 'var(--primary-gold)', fontWeight: 600, fontFamily: 'var(--font-label)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '14px', display: 'block', marginBottom: '20px' }}>
              {isGujarati ? 'વિશિષ્ટ પ્રવાસો' : 'EXQUISITE JOURNEYS'}
            </span>
            <h1 style={{ 
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 10vw, 90px)', fontWeight: 950, lineHeight: 1.1, 
              color: 'white', marginBottom: '24px', letterSpacing: '-2px'
            }}>
              {isGujarati ? 'ટૂર પેકેજો' : <>Curated <br/><span style={{ color: 'var(--primary-gold)' }}>Adventures</span></>}
            </h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px', opacity: 0.8, fontWeight: 500, lineHeight: 1.6 }}>
              {isGujarati ? 'તમારી આગામી યાદગાર સફર અહીંથી શરૂ થાય છે.' : 'Discover our collection of ultra-luxury curated expeditions designed for the modern explorer.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Glassmorphism Filters */}
      <section style={{ marginTop: '-60px', position: 'relative', zIndex: 10, paddingBottom: '60px' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              background: 'var(--glass)', 
              backdropFilter: 'blur(30px)', 
              borderRadius: 'var(--radius-card)', 
              padding: '40px', 
              border: '1px solid rgba(232, 102, 10, 0.2)',
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(232, 102, 10, 0.3), transparent)' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {searchQuery && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '12px',
                  background: 'rgba(232, 102, 10, 0.1)',
                  border: '1px solid rgba(232, 102, 10, 0.3)',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  width: 'fit-content',
                  margin: '0 auto'
                }}>
                  <span style={{ fontSize: '14px', color: 'white' }}>
                    Showing results for: <strong style={{ color: 'var(--primary-gold)' }}>{searchQuery}</strong>
                  </span>
                  <Link 
                    href="/packages" 
                    style={{ 
                      color: 'rgba(255,255,255,0.6)', 
                      textDecoration: 'none', 
                      fontSize: '12px',
                      fontWeight: 750,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      borderLeft: '1px solid rgba(255,255,255,0.2)',
                      paddingLeft: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Search
                  </Link>
                </div>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                {categories.map((cat, i) => (
                  <motion.button 
                    key={i} 
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(cat.value)}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 28px', borderRadius: 'var(--radius-button)',
                      background: filter === cat.value ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.03)',
                      color: filter === cat.value ? 'black' : 'white', 
                      fontWeight: 600, 
                      fontFamily: 'var(--font-label)',
                      fontSize: '13px',
                      letterSpacing: '0.5px',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      border: '1px solid',
                      borderColor: filter === cat.value ? 'var(--primary-gold)' : 'rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      boxShadow: filter === cat.value ? '0 10px 20px rgba(232, 102, 10, 0.2)' : 'none'
                    }}
                  >
                    <span style={{ opacity: filter === cat.value ? 1 : 0.6 }}>{cat.icon}</span>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>{cat.label}</span>
                  </motion.button>
                ))}
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'auto 1fr auto', 
                gap: '40px', 
                alignItems: 'center', 
                padding: '30px 40px', 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: 'var(--radius-card)', 
                border: '1px solid rgba(255,255,255,0.04)' 
              }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ 
                      width: '56px', height: '56px', borderRadius: 'var(--radius-button)', 
                      background: 'rgba(232, 102, 10, 0.1)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      color: 'var(--primary-gold)',
                      border: '1px solid rgba(232, 102, 10, 0.2)'
                    }}>
                       <IndianRupee size={24} />
                    </div>
                    <div>
                       <span style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'var(--font-label)', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Max Budget</span>
                       <span style={{ fontSize: '24px', fontWeight: 300, color: 'white', fontFamily: 'var(--font-heading)' }}>
                        ₹{priceRange.toLocaleString()}
                       </span>
                    </div>
                 </div>

                 <div style={{ position: 'relative', paddingTop: '10px' }}>
                     <input 
                       aria-label="Price Range"
                       type="range" min="0" 
                       max={packages.length > 0 ? Math.max(...packages.map(p => p.price)) + 1000 : 200000} 
                       step="500" value={priceRange} 
                       onChange={(e) => setPriceRange(parseInt(e.target.value))} 
                       style={{ 
                         cursor: 'pointer', width: '100%', height: '4px', borderRadius: '10px', 
                         accentColor: 'var(--primary-gold)', background: 'rgba(255,255,255,0.05)', outline: 'none'
                       }}
                     />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                       <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>₹0</span>
                       <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>₹{(packages.length > 0 ? Math.max(...packages.map(p => p.price)) : 200000).toLocaleString()}</span>
                    </div>
                 </div>

                  <motion.button 
                   whileHover={{ color: 'white', scale: 1.05 }}
                   onClick={() => setPriceRange(packages.length > 0 ? Math.max(...packages.map(p => p.price)) + 1000 : 200000)}
                    style={{ 
                      background: 'none', border: 'none', color: 'rgba(232, 102, 10, 0.6)', 
                      fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-label)', cursor: 'pointer', 
                      textTransform: 'uppercase', letterSpacing: '2px', transition: '0.3s',
                      padding: '10px 16px', display: 'inline-block'
                    }}
                  >
                     Reset Filter
                  </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          {loading ? (
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div className="loader-gold" />
            </div>
          ) : (
            <>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '0 10px' }}>
                 <p style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-label)', opacity: 0.6 }}>Showing {filtered.length} {isGujarati ? 'પેકેજો' : 'Adventures'}</p>
                 <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setViewMode('grid')} style={{ padding: '10px', borderRadius: 'var(--radius-button)', background: viewMode === 'grid' ? 'var(--primary-gold)' : 'transparent', color: viewMode === 'grid' ? 'white' : 'white', border: '1px solid rgba(232, 102, 10, 0.3)' }}><LayoutGrid size={18} /></button>
                    <button onClick={() => setViewMode('list')} style={{ padding: '10px', borderRadius: 'var(--radius-button)', background: viewMode === 'list' ? 'var(--primary-gold)' : 'transparent', color: viewMode === 'list' ? 'white' : 'white', border: '1px solid rgba(232, 102, 10, 0.3)' }}><List size={18} /></button>
                 </div>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`packages-grid ${viewMode}`}
                style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr', gap: '30px' }}
              >
                <AnimatePresence mode='popLayout'>
                  {filtered.map(pkg => (
                    <motion.div 
                      key={pkg.id} layout
                      variants={itemVariants}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -10 }}
                      className="group"
                      style={{ 
                        background: 'var(--secondary-black)', borderRadius: 'var(--radius-card)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)',
                        transition: '0.4s', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', display: 'flex', flexDirection: viewMode === 'list' ? 'row' : 'column'
                      }}
                    >
                       <Link href={`/packages/${pkg.slug || pkg.id}`} style={{ position: 'relative', width: viewMode === 'list' ? '400px' : '100%', aspectRatio: '16/9', overflow: 'hidden', display: 'block' }}>
                         <Image 
                           src={getImageUrl(pkg.image)} 
                           alt={pkg.title} 
                           fill
                           sizes="(max-width: 768px) 100vw, 400px"
                           className="object-cover transition-transform duration-500 group-hover:scale-110"
                           onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"; }}
                         />
                         <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--primary-gold)', color: 'white', padding: '6px 16px', borderRadius: 'var(--radius-badge)', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-label)' }}>
                           {pkg.tag || 'ELITE'}
                         </div>
                       </Link>
                       <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-label)', color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                             {pkg.type}
                          </div>
                          <Link href={`/packages/${pkg.slug || pkg.id}`} style={{ textDecoration: 'none' }}>
                            <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'white', marginBottom: '15px', fontFamily: 'var(--font-heading)' }}>{pkg.title}</h3>
                          </Link>
                          
                          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', opacity: 0.6 }}><Clock size={16} /> {pkg.duration || '5 Days'}</div>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', opacity: 0.6 }}><MapPin size={16} /> {pkg.location} </div>
                          </div>

                          <div style={{ marginTop: 'auto', paddingTop: '25px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <div>
                                <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'var(--font-label)', color: 'var(--primary-gold)', display: 'block', marginBottom: '2px' }}>PACKAGE VALUE</span>
                                <span style={{ fontSize: '28px', fontWeight: 950, color: 'white' }}><IndianRupee size={22} style={{ color: 'var(--primary-gold)' }} />{pkg.price.toLocaleString()}</span>
                             </div>
                             <div style={{ display: 'flex', gap: '10px' }}>
                               <a href={`https://wa.me/?text=${encodeURIComponent(`Check out this trip: ${pkg.title} at ${typeof window !== 'undefined' ? window.location.origin : ''}/packages/${pkg.slug || pkg.id}`)}`} target="_blank" rel="noreferrer" style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25d366', padding: '14px', borderRadius: 'var(--radius-button)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Share on WhatsApp">
                                 <Share2 size={16} />
                               </a>
                               <Link href={`/packages/${pkg.slug || pkg.id}?enquire=true`} className="btn-primary" style={{ padding: '14px 28px', borderRadius: 'var(--radius-button)', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-label)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 Enquire Now <ChevronRight size={16} />
                               </Link>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.6 }}>
                   <Compass size={64} style={{ marginBottom: '20px', color: 'var(--primary-gold)' }} />
                   <h3 style={{ fontSize: '24px', fontWeight: 900 }}>No excursions found</h3>
                   <p>Adjust your criteria to explore more possibilities</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Packages;
