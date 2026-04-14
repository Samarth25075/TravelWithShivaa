import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, IndianRupee, Clock, Mountain, Palmtree, Compass, Sparkles, Footprints, ShieldCheck, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Packages = ({ isGujarati }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(150000);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get('packages')
      .then(res => {
        setPackages(res.data);
        if (res.data.length > 0) {
          const max = Math.max(...res.data.map(p => p.price));
          setPriceRange(max + 1000); // Set to slightly above max to show all initially
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { label: isGujarati ? 'બધા' : 'All', value: 'All', icon: <Compass size={16} /> },
    { label: isGujarati ? 'પર્વત' : 'Mountains', value: 'Mountain', icon: <Mountain size={16} /> },
    { label: isGujarati ? 'દરિયાકાંઠો' : 'Beaches', value: 'Beach', icon: <Palmtree size={16} /> },
    { label: isGujarati ? 'ધાર્મિક' : 'Spiritual', value: 'Spiritual', icon: <Sparkles size={16} /> },
    { label: isGujarati ? 'સાહસ' : 'Adventure', value: 'Adventure', icon: <Footprints size={16} /> }
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

  return (
    <div className="packages-page">
      <header className="page-header-premium">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-title" 
            style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 950, marginBottom: '15px', color: 'white' }}
          >
            {isGujarati ? 'ટૂર પેકેજો' : 'Explore Tour Packages'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="page-subtitle" 
            style={{ fontSize: '18px', fontWeight: 600, opacity: 0.9, color: 'white' }}
          >
            {isGujarati ? 'તમારી આગામી યાદગાર સફર અહીંથી શરૂ થાય છે.' : 'Your next unforgettable journey starts here.'}
          </motion.p>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="filter-bar">
        <div className="container">
          <div className="filter-container" style={{ borderColor: 'var(--primary-orange)' }}>
            <div className="category-filters">
              {categories.map((cat, i) => (
                <button 
                  key={i} 
                  className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
                  onClick={() => setFilter(cat.value)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span className="cat-icon" style={{ opacity: 0.6 }}>{cat.icon}</span>
                  <span style={{ fontWeight: 800 }}>{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="price-filter" style={{ background: '#f8fafc', padding: '15px 25px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '12px' }}>
                <span style={{ fontWeight: 800, fontSize: '11px', textTransform: 'uppercase', color: '#64748b' }}>{isGujarati ? 'મહત્તમ બજેટ' : 'Max Budget'}</span>
                <span style={{ fontWeight: 900, color: '#000' }}>₹{priceRange.toLocaleString()}</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max={packages.length > 0 ? Math.max(...packages.map(p => p.price)) + 1000 : 200000} 
                step="500" 
                value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="packages-grid-section">
        <div className="container">
          {loading ? (
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div className="loader" style={{ width: '40px', height: '40px', border: '4px solid #eee', borderTopColor: 'var(--primary-black)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
          ) : (
            <>
              <div className="grid-header">
                 <p>{filtered.length} {isGujarati ? 'પેકેજો મળ્યા' : 'Packages Found'}</p>
              </div>
              
              <div className={`packages-grid ${viewMode}`}>
                <AnimatePresence mode='popLayout'>
                  {filtered.map(pkg => (
                    <motion.div 
                      key={pkg.id} 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`package-card-premium card ${viewMode === 'list' ? 'list-layout' : ''}`}
                    >
                       <div className="pkg-img">
                         <img src={getImageUrl(pkg.image)} alt={pkg.title} />
                         <div className="pkg-tag">{pkg.tag || 'New'}</div>
                         <button className="wishlist-btn"><Compass size={20} /></button>
                       </div>
                       <div className="pkg-body" style={{ padding: '30px' }}>
                          <div className="pkg-category" style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary-orange)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                             {pkg.type}
                          </div>
                          <div className="pkg-header" style={{ marginBottom: '15px' }}>
                             <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px' }}>{pkg.title}</h3>
                             <div className="pkg-rating" style={{ background: '#fffbeb', color: '#b45309', padding: '6px 12px', borderRadius: '10px' }}>
                                <Sparkles size={14} fill="#b45309" color="none" /> 
                                <span style={{ fontWeight: 800 }}>{pkg.rating || '4.8'}</span>
                             </div>
                          </div>
                          <div className="pkg-meta" style={{ display: 'flex', gap: '20px', marginBottom: '25px', opacity: 0.7 }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {pkg.duration || '5 Days'}</span>
                            <span style={{ fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} /> {pkg.difficulty || 'Expert Led'}</span>
                          </div>
                          <div className="pkg-footer" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <div className="pkg-price">
                                <span className="from" style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{isGujarati ? 'શરૂઆત' : 'Starts from'}</span>
                                <span className="price" style={{ fontSize: '24px', fontWeight: 950, color: '#000' }}><IndianRupee size={20} />{pkg.price.toLocaleString()}</span>
                             </div>
                             <Link to={`/package/${pkg.id}`} className="btn-primary-sm" style={{ padding: '12px 25px', fontSize: '12px' }}>{isGujarati ? 'વિગતો' : 'View Adventure'}</Link>
                          </div>
                       </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.6 }}>
                   <Compass size={48} style={{ marginBottom: '20px' }} />
                   <h3>No matching tours found</h3>
                   <p>Try adjusting your search criteria</p>
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
