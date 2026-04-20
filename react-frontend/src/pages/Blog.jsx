import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Clock, ArrowRight, Bookmark, Filter, Search, TrendingUp, Sparkles } from 'lucide-react';

const Blog = ({ isGujarati }) => {
  const [filter, setFilter] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('blogs');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['All', 'Mountains', 'International', 'Road Trips', 'Budget Travel', 'Solo Travel'];
  const filtered = posts.filter(p => filter === 'All' || p.category === filter);
  const featuredPost = posts[0];

  return (
    <div className="blog-page" style={{ background: 'var(--primary-black)', color: 'white' }}>
      {/* Magazine Hero Section */}
      <section style={{ position: 'relative', height: '80vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img 
          src="/images/blog_hero.png" 
          alt="Travel Journal" 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, var(--primary-black))' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: '800px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Sparkles size={18} style={{ color: 'var(--primary-gold)' }} />
              <span style={{ color: 'var(--primary-gold)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', fontSize: '12px' }}>
                {isGujarati ? 'મુસાફરી વાર્તાઓ' : 'The Explorer’s Journal'}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(48px, 8vw, 85px)', fontWeight: 950, lineHeight: 1, marginBottom: '25px', fontFamily: 'var(--font-heading)' }}>
              {isGujarati ? 'વિશ્વ ને તમારી નજરે જુઓ' : 'Stories Written \nin the Wind.'}
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
              {isGujarati ? 'અમારા પ્રવાસીઓના અનુભવો અને ટિપ્સ વાંચો.' : "Capturing the soul of every destination. Dive into our curated chronicles of global exploration."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Bar */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <motion.button 
              key={cat} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              style={{ 
                background: filter === cat ? 'var(--primary-gold)' : 'transparent',
                color: filter === cat ? 'black' : 'var(--text-muted)',
                border: `1px solid ${filter === cat ? 'var(--primary-gold)' : 'rgba(255,255,255,0.1)'}`,
                padding: '10px 25px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Featured Post Spotlight */}
      {featuredPost && filter === 'All' && (
        <section style={{ padding: '80px 0 40px' }}>
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '50px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '40px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div style={{ height: '500px', overflow: 'hidden' }}>
                <img src={`/api/uploads/${featuredPost.image}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Featured" />
              </div>
              <div style={{ padding: '50px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--primary-gold)' }}>
                  <TrendingUp size={16} />
                  <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Most Read Story</span>
                </div>
                <h2 style={{ fontSize: '36px', fontWeight: 950, marginBottom: '20px', lineHeight: 1.2 }}>{featuredPost.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '30px' }}>{featuredPost.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {featuredPost.date}</span>
                  <span style={{ fontSize: '13px', color: 'var(--primary-gold)', fontWeight: 800 }}>{featuredPost.category}</span>
                </div>
                <button className="btn-primary-sm">Read Full Perspective <ArrowRight size={18} /></button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '40px' }}>
            <AnimatePresence mode='popLayout'>
              {filtered.map((post, i) => (
                <motion.article 
                  key={post.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="package-card-premium"
                  style={{ background: '#111', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}
                >
                  <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                    <img src={`/api/uploads/${post.image}`} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}>
                      <Bookmark size={20} />
                    </div>
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'var(--primary-gold)', color: 'black', padding: '5px 15px', borderRadius: '50px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
                      {post.category}
                    </div>
                  </div>
                  <div style={{ padding: '30px' }}>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', opacity: 0.6 }}>
                      <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} /> {post.date}</span>
                    </div>
                    <h3 style={{ fontSize: '22px', fontWeight: 950, marginBottom: '15px', color: 'white', lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '25px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.description}</p>
                    <button style={{ background: 'none', border: 'none', color: 'var(--primary-gold)', fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Experience Now <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Secret Circle Newsletter */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ background: 'var(--gradient-gold)', padding: '80px', borderRadius: '40px', textAlign: 'center', color: 'black', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', opacity: 0.1 }}><Compass size={300} /></div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <h2 style={{ fontSize: '42px', fontWeight: 950, marginBottom: '15px' }}>{isGujarati ? 'નવા સાહસો સાથે જોડાઓ' : 'Join the Inner Circle'}</h2>
              <p style={{ fontSize: '18px', fontWeight: 600, opacity: 0.8, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                Receive our curated quarterly dossier of hidden destinations and private airline offers.
              </p>
              <form style={{ display: 'flex', gap: '15px', maxWidth: '500px', margin: '0 auto' }}>
                <input 
                  type="email" 
                  placeholder="Enter your private email" 
                  style={{ flex: 1, padding: '20px 30px', borderRadius: '50px', border: 'none', outline: 'none', fontWeight: 600 }} 
                />
                <button type="submit" style={{ padding: '20px 40px', borderRadius: '50px', border: 'none', background: 'black', color: 'var(--primary-gold)', fontWeight: 900, cursor: 'pointer' }}>Subscribe</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
