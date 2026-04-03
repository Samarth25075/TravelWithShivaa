import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapPin, Search, Filter, SortAsc } from 'lucide-react';
import { motion } from 'framer-motion';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/packages')
      .then(res => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <section style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '120px 0 80px' }}>
        <div className="container">
          <h1 style={{ fontSize: '56px', fontWeight: 800, marginBottom: '20px' }}>Our Tour <span style={{ color: 'var(--primary)' }}>Packages</span></h1>
          <p style={{ fontSize: '20px', opacity: 0.8 }}>Choose from our wide range of world-class tour packages.</p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 0 100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search destinations..." 
              style={{ width: '100%', padding: '15px 15px 15px 55px', borderRadius: '50px', border: '1px solid #eee', fontSize: '16px', outline: 'none' }} 
            />
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 25px', borderRadius: '50px', border: '1px solid #eee', backgroundColor: 'white', cursor: 'pointer', fontWeight: 600 }}>
              <Filter size={18} /> Filter
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 25px', borderRadius: '50px', border: '1px solid #eee', backgroundColor: 'white', cursor: 'pointer', fontWeight: 600 }}>
              <SortAsc size={18} /> Sort
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}><h2>Loading packages...</h2></div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
            {packages.map((pkg, index) => (
              <motion.div 
                key={pkg.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="package-card" 
                style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}
              >
                <div style={{ position: 'relative' }}>
                  <img src={`/api/uploads/${pkg.image}`} alt={pkg.title} style={{ height: '280px', width: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'var(--primary)', color: 'white', padding: '10px 20px', borderRadius: '50px', fontWeight: 800, fontSize: '14px' }}>
                    Featured
                  </div>
                </div>
                <div style={{ padding: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '15px' }}>
                    <MapPin size={16} />
                    <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '12px' }}>{pkg.location}</p>
                  </div>
                  <h3 style={{ fontSize: '24px', marginBottom: '20px', fontWeight: 800 }}>{pkg.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f5f5f5', paddingTop: '20px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Starting From</p>
                      <p style={{ fontSize: '26px', fontWeight: 800 }}>₹{pkg.price.toLocaleString()}</p>
                    </div>
                    <Link to={`/package/${pkg.id}`} className="btn" style={{ padding: '12px 25px', fontSize: '14px' }}>View Details</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Packages;
