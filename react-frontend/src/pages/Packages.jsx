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
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">{isGujarati ? 'ટૂર પેકેજો' : 'Explore Tour Packages'}</h1>
          <p className="page-subtitle">{isGujarati ? 'તમારી આગામી યાદગાર સફર અહીંથી શરૂ થાય છે.' : 'Your next unforgettable journey starts here.'}</p>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="filter-bar">
        <div className="container">
          <div className="filter-container">
            <div className="category-filters">
              {categories.map((cat, i) => (
                <button 
                  key={i} 
                  className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
                  onClick={() => setFilter(cat.value)}
                >
                  {cat.icon} <span>{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="price-filter">
              <label>{isGujarati ? 'બજેટ પ્રતિ વ્યક્તિ:' : 'Max Price per Person:'} <span>₹{priceRange.toLocaleString()}</span></label>
              <input 
                type="range" 
                min="0" 
                max={packages.length > 0 ? Math.max(...packages.map(p => p.price)) + 1000 : 200000} 
                step="500" 
                value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))} 
              />
            </div>
            <div className="view-toggles">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} 
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <LayoutGrid size={20} />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} 
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <List size={20} />
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="packages-grid-section">
        <div className="container">
          {loading ? (
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div className="loader" style={{ width: '40px', height: '40px', border: '4px solid #eee', borderTopColor: 'var(--primary-green)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
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
                       <div className="pkg-body">
                          <div className="pkg-header">
                             <h3>{pkg.title}</h3>
                             <div className="pkg-rating"><Sparkles size={14} fill="var(--accent-amber)" color="none" /> <span>{pkg.rating || '4.8'}</span></div>
                          </div>
                          <div className="pkg-meta">
                            <span><Clock size={14} /> {pkg.duration || '5 Days'}</span>
                            <span><ShieldCheck size={14} /> {pkg.difficulty || 'Easy'}</span>
                          </div>
                          <hr />
                          <div className="pkg-footer">
                             <div className="pkg-price">
                                <span className="from">{isGujarati ? 'શરૂઆત' : 'Starts from'}</span>
                                <span className="price"><IndianRupee size={18} />{pkg.price.toLocaleString()}</span>
                             </div>
                             <Link to={`/package/${pkg.id}`} className="btn-primary-sm">{isGujarati ? 'વિગતો' : 'View Details'}</Link>
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
