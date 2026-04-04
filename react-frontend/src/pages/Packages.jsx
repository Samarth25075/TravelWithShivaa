import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, Search, Filter, SortAsc, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('packages')
      .then(res => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredPackages = packages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main style={{ backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
      <section style={{ 
        backgroundColor: 'var(--secondary)', 
        color: 'white', 
        padding: '160px 0 100px',
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)'
      }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span style={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '13px', marginBottom: '15px', display: 'block' }}>Adventure Awaits</span>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, marginBottom: '20px', letterSpacing: '-2px' }}>Pick Your <span style={{ color: 'var(--primary)' }}>Escape</span></h1>
            <p style={{ fontSize: '18px', opacity: 0.7, maxWidth: '600px' }}>From snow-capped peaks to sun-drenched beaches, browse our collection of premium, hand-picked travel experiences.</p>
          </motion.div>
        </div>
      </section>

      <section className="container" style={{ marginTop: '-40px', paddingBottom: '120px' }}>
        {/* Search & Filter Bar */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '20px',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '24px',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border)',
          marginBottom: '60px'
        }}>
          <div style={{ position: 'relative', flex: '1 1 400px' }}>
            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search by destination or package name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '18px 15px 18px 60px', borderRadius: '16px', border: '1px solid #eef2f6', fontSize: '16px', outline: 'none', backgroundColor: '#f8fafc', transition: '0.3s' }} 
            />
          </div>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 25px', borderRadius: '16px', border: '1px solid #eef2f6', backgroundColor: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '14px', transition: '0.3s' }}>
              <Filter size={18} /> Filters
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 25px', borderRadius: '16px', border: '1px solid #eef2f6', backgroundColor: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '14px', transition: '0.3s' }}>
              <SortAsc size={18} /> Price Range
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <div className="loader" style={{ width: '50px', height: '50px', border: '5px solid #eee', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <h2 style={{ fontWeight: 800 }}>Finding adventures...</h2>
          </div>
        ) : (
          <>
            {filteredPackages.length > 0 ? (
              <div className="grid-auto">
                {filteredPackages.map((pkg, index) => (
                  <motion.div 
                    key={pkg.id} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    style={{ 
                      backgroundColor: 'white', 
                      borderRadius: 'var(--radius-lg)', 
                      overflow: 'hidden', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                      <img src={`/api/uploads/${pkg.image}`} alt={pkg.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', color: 'white', padding: '8px 16px', borderRadius: '50px', fontWeight: 800, fontSize: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                        {pkg.duration || 'Special Tour'}
                      </div>
                    </div>
                    <div style={{ padding: '35px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '15px' }}>
                        <MapPin size={16} />
                        <p style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>{pkg.location}</p>
                      </div>
                      <h3 style={{ fontSize: '24px', marginBottom: '15px', fontWeight: 900, color: 'var(--secondary)', lineHeight: 1.2 }}>{pkg.title}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '30px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pkg.description}</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '25px', borderTop: '1px solid #f1f5f9' }}>
                        <div>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Starting From</p>
                          <p style={{ fontSize: '26px', fontWeight: 900, color: 'var(--secondary)' }}>₹{pkg.price.toLocaleString()}</p>
                        </div>
                        <Link to={`/package/${pkg.id}`} style={{ width: '50px', height: '50px', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s', boxShadow: '0 8px 15px rgba(245, 158, 11, 0.2)' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                          <ArrowRight size={22} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '120px 0', backgroundColor: 'white', borderRadius: '32px', boxShadow: 'var(--shadow)' }}>
                <Search size={64} color="#e2e8f0" style={{ marginBottom: '20px' }} />
                <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--secondary)' }}>No matches found</h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '15px auto 30px' }}>We couldn't find any packages matching your search. Try a different destination or check back later!</p>
                <button onClick={() => setSearchQuery('')} className="btn">Clear Search</button>
              </div>
            )}
          </>
        )}
      </section>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
};

export default Packages;

