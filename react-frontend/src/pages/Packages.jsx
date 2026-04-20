import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, IndianRupee, Clock, Mountain, Palmtree, Compass, Sparkles, Footprints, ShieldCheck, LayoutGrid, List, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Packages = ({ isGujarati }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(150000);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('packages')
      .then(res => {
        setPackages(res.data);
        if (res.data.length > 0) {
          const max = Math.max(...res.data.map(p => p.price));
          setPriceRange(max + 1000);
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
    if (!image) return 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80';
    if (image.startsWith('http')) return image;
    return `/api/uploads/${image}`;
  };

  const filtered = packages.filter(pkg => 
    (filter === 'All' || pkg.type === filter) && 
    pkg.price <= priceRange
  );

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
    <div className="packages-page" style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      {/* Luxury Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden" style={{ height: '65vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div 
          style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80")',
            backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.3) contrast(1.1)',
            zIndex: 0
          }}
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 0%, #0a0a0a 100%)', zIndex: 1 }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={{ color: 'var(--primary-gold)', fontWeight: 900, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '14px', display: 'block', marginBottom: '20px' }}>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(20px)', 
              borderRadius: '30px', padding: '30px', border: '1px solid rgba(255, 215, 0, 0.15)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
                {categories.map((cat, i) => (
                  <button 
                    key={i} 
                    className={`nav-btn ${filter === cat.value ? 'active' : ''}`}
                    onClick={() => setFilter(cat.value)}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', borderRadius: '50px',
                      background: filter === cat.value ? 'var(--gradient-gold)' : 'rgba(255,255,255,0.05)',
                      color: filter === cat.value ? 'black' : 'white', fontWeight: 800, transition: '0.3s',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {cat.icon} <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', padding: '20px 30px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingRight: '25px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                       <IndianRupee size={20} />
                    </div>
                    <div>
                       <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>MAX BUDGET</span>
                       <span style={{ fontSize: '20px', fontWeight: 950, color: 'white' }}>₹{priceRange.toLocaleString()}</span>
                    </div>
                 </div>

                 <div style={{ flex: 1, minWidth: '250px', padding: '0 15px' }}>
                    <input 
                      type="range" min="0" 
                      max={packages.length > 0 ? Math.max(...packages.map(p => p.price)) + 1000 : 200000} 
                      step="500" value={priceRange} 
                      onChange={(e) => setPriceRange(parseInt(e.target.value))} 
                      style={{ 
                        cursor: 'pointer', width: '100%', height: '8px', borderRadius: '10px', 
                        accentColor: 'var(--primary-gold)', background: 'rgba(255,255,255,0.1)', outline: 'none'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                       <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)' }}>₹0</span>
                       <div style={{ display: 'flex', gap: '5px' }}>
                          <span className="price-dot active"></span>
                          <span className="price-dot active"></span>
                          <span className="price-dot"></span>
                          <span className="price-dot"></span>
                       </div>
                       <span style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.4)' }}>₹{(packages.length > 0 ? Math.max(...packages.map(p => p.price)) : 200000).toLocaleString()}</span>
                    </div>
                 </div>

                 <button 
                  onClick={() => setPriceRange(packages.length > 0 ? Math.max(...packages.map(p => p.price)) + 1000 : 200000)}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-gold)', fontSize: '12px', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}
                 >
                    Reset Limit
                 </button>
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
                 <p style={{ fontSize: '16px', fontWeight: 700, opacity: 0.6 }}>Showing {filtered.length} {isGujarati ? 'પેકેજો' : 'Adventures'}</p>
                 <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setViewMode('grid')} style={{ padding: '10px', borderRadius: '12px', background: viewMode === 'grid' ? 'var(--primary-gold)' : 'transparent', color: viewMode === 'grid' ? 'black' : 'white', border: '1px solid rgba(255,215,0,0.3)' }}><LayoutGrid size={18} /></button>
                    <button onClick={() => setViewMode('list')} style={{ padding: '10px', borderRadius: '12px', background: viewMode === 'list' ? 'var(--primary-gold)' : 'transparent', color: viewMode === 'list' ? 'black' : 'white', border: '1px solid rgba(255,215,0,0.3)' }}><List size={18} /></button>
                 </div>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`packages-grid ${viewMode}`}
                style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(350px, 1fr))' : '1fr', gap: '40px' }}
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
                        background: '#111', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)',
                        transition: '0.4s', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', display: 'flex', flexDirection: viewMode === 'list' ? 'row' : 'column'
                      }}
                    >
                       <div style={{ position: 'relative', width: viewMode === 'list' ? '400px' : '100%', height: viewMode === 'list' ? 'auto' : '280px', overflow: 'hidden' }}>
                         <img src={getImageUrl(pkg.image)} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.6s' }} />
                         <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--gradient-gold)', color: 'black', padding: '6px 16px', borderRadius: '50px', fontSize: '11px', fontWeight: 900 }}>
                           {pkg.tag || 'ELITE'}
                         </div>
                       </div>
                       <div style={{ padding: '35px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
                             {pkg.type}
                          </div>
                          <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'white', marginBottom: '15px', fontFamily: 'var(--font-heading)' }}>{pkg.title}</h3>
                          
                          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', opacity: 0.6 }}><Clock size={16} /> {pkg.duration || '5 Days'}</div>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', opacity: 0.6 }}><MapPin size={16} /> {pkg.location} </div>
                          </div>

                          <div style={{ marginTop: 'auto', paddingTop: '25px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <div>
                                <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary-gold)', display: 'block', marginBottom: '2px' }}>PACKAGE VALUE</span>
                                <span style={{ fontSize: '28px', fontWeight: 950, color: 'white' }}><IndianRupee size={22} style={{ color: 'var(--primary-gold)' }} />{pkg.price.toLocaleString()}</span>
                             </div>
                             <Link to={`/package/${pkg.id}`} className="btn-primary" style={{ padding: '14px 28px', borderRadius: '50px', fontSize: '13px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '10px' }}>
                               Explore <ChevronRight size={16} />
                             </Link>
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
