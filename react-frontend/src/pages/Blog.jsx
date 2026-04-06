import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Compass, Clock, ArrowRight, Star, Heart, Bookmark, Filter } from 'lucide-react';

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

  return (

    <div className="blog-page">
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">{isGujarati ? 'મુસાફરી વાર્તાઓ' : 'Travel Stories & News'}</h1>
          <p className="page-subtitle">{isGujarati ? 'અમારા પ્રવાસીઓના અનુભવો અને ટિપ્સ વાંચો.' : 'Inspiration for your next destination.'}</p>
        </div>
      </header>

      <section className="blog-filters">
        <div className="container">
           <div className="filter-scroll">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-chip ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                   {cat}
                </button>
              ))}
           </div>
        </div>
      </section>

      <section className="blog-grid-section">
        <div className="container">
           <div className="blog-grid">
              <AnimatePresence mode='popLayout'>
                 {filtered.map(post => (
                   <motion.article 
                     key={post.id} 
                     layout
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     className="blog-card card"
                   >
                      <div className="blog-img">
                         <img src={`/api/uploads/${post.image}`} alt={post.title} />
                         <div className="category-badge">{post.category}</div>
                         <button className="save-btn"><Bookmark size={18} /></button>
                      </div>
                      <div className="blog-info">
                         <div className="blog-meta">
                            <span><Clock size={14} /> {post.date}</span>
                            <span>{post.reading_time}</span>
                         </div>
                         <h3>{post.title}</h3>
                         <p>{post.description}</p>
                         <button className="read-more">Read More <ArrowRight size={16} /></button>
                      </div>

                   </motion.article>
                 ))}
              </AnimatePresence>
           </div>
        </div>
      </section>

      <section className="newsletter-cta">
         <div className="container">
            <div className="cta-box card">
               <h2>Never Miss An Adventure</h2>
               <p>Get our latest travel guides and early bird discounts directly in your inbox.</p>
               <form className="cta-form">
                  <input type="email" placeholder="Your email address" />
                  <button type="submit" className="btn-primary">Join the Tribe</button>
               </form>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Blog;
