import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, MapPin, Calendar, Clock, IndianRupee, Heart, Share2, Info, ChevronDown, ChevronUp, Star, ShieldCheck, Zap } from 'lucide-react';

const DestinationDetail = ({ isGujarati }) => {
   const { id } = useParams();
   const [activeTab, setActiveTab] = useState('itinerary');
   const [openDay, setOpenDay] = useState(0);

   const itinerary = [
      { day: 1, title: 'Arrival & Acclimatization', desc: 'Arrive at the base camp. Check-in and relax to adjust with the altitude. Local sightseeing in the evening.' },
      { day: 2, title: 'Exploring the Hidden Valleys', desc: 'Drive through the winding roads to witness the first glimpse of snow peaks. Visit ancient monasteries.' },
      { day: 3, title: 'The High Altitude Lake', desc: 'Venture to the crystal clear blue lake. Photography and meditation session by the bank.' },
      { day: 4, title: 'Local Culture & Cuisine', desc: 'Interact with the locals. Enjoy a traditional meal at a local homestay.' },
      { day: 5, title: 'The Return Journey', desc: 'One last breakfast with a view before driving back to the airport/station.' }
   ];

   const variants = [
      { type: 'Budget', price: '18,500', stay: 'Standard Homestay', meals: 'Breakfast Only', transport: 'Non-AC Tempo' },
      { type: 'Standard', price: '24,999', stay: '3-Star Hotel', meals: 'All Meals', transport: 'AC Shuttle', featured: true },
      { type: 'Premium', price: '38,000', stay: 'Luxury Resort', meals: 'Fine Dining + Snacks', transport: 'Private SUV' }
   ];

   return (
      <div className="dest-detail-page">
         <header className="detail-hero-premium" style={{
            height: '65vh',
            minHeight: '500px',
            background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80") no-repeat center center/cover`,
            display: 'flex',
            alignItems: 'flex-end',
            paddingBottom: '80px',
            color: 'white'
         }}>
            <div className="container">
                <div className="hero-content">
                   <div className="badge-featured" style={{ background: '#ffcc00', color: '#000', borderRadius: '10px', padding: '8px 15px' }}>{isGujarati ? 'સૌથી વધુ પસંદગી' : 'Most Loved'}</div>
                   <h1 style={{ fontSize: 'clamp(32px, 8vw, 80px)', fontWeight: 950, letterSpacing: '-2px', color: 'white', lineHeight: 1.1 }}>Spiti Valley Expedition</h1>
                   <div className="meta-info" style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '15px 30px', 
                      marginTop: '20px', 
                      fontSize: '15px', 
                      fontWeight: 600 
                   }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={18} color="#ffcc00" /> Himachal Pradesh</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={18} color="#ffcc00" /> 6 Days / 5 Nights</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} color="#ffcc00" /> Easy to Moderate</span>
                   </div>
                </div>
            </div>
         </header>

         <section className="detail-tabs" style={{ top: '80px' }}>
            <div className="container">
               <div className="tabs-bar">
                  <button
                     className={activeTab === 'overview' ? 'active' : ''}
                     onClick={() => setActiveTab('overview')}
                  >
                     Overview
                  </button>
                  <button
                     className={activeTab === 'itinerary' ? 'active' : ''}
                     onClick={() => setActiveTab('itinerary')}
                  >
                     Itinerary
                  </button>
                  <button
                     className={activeTab === 'packages' ? 'active' : ''}
                     onClick={() => setActiveTab('packages')}
                  >
                     Compare Packages
                  </button>
               </div>
            </div>
         </section>

         <div className="main-content">
            <div className="container">
               <div className="content-layout">
                  <div className="left-column">
                     {activeTab === 'overview' && (
                        <div className="section-block content-card animate-fade">
                           <h3 className="content-title">{isGujarati ? 'પ્રવાસની વિગત' : 'Trip Overview'}</h3>
                           <p className="content-text">
                              Spiti Valley is a cold desert mountain valley located high in the Himalayas in the north-eastern part of the Indian state of Himachal Pradesh.
                              The name "Spiti" means "The Middle Land", i.e. the land between Tibet and India. It is one of the most remote places in the world.
                           </p>
                           <div className="highlights-grid" style={{ marginTop: '30px' }}>
                              <div className="highlight-item" style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
                                 <div className="icon-circle" style={{ background: '#ffcc00', color: '#000' }}><Check size={20} /></div> 
                                 <span style={{ fontWeight: 800 }}>Visit Key Monastery</span>
                              </div>
                              <div className="highlight-item" style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
                                 <div className="icon-circle" style={{ background: '#ffcc00', color: '#000' }}><Check size={20} /></div> 
                                 <span style={{ fontWeight: 800 }}>Chandratal Lake Visit</span>
                              </div>
                              <div className="highlight-item" style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
                                 <div className="icon-circle" style={{ background: '#ffcc00', color: '#000' }}><Check size={20} /></div> 
                                 <span style={{ fontWeight: 800 }}>Stargazing Experience</span>
                              </div>
                              <div className="highlight-item" style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px' }}>
                                 <div className="icon-circle" style={{ background: '#ffcc00', color: '#000' }}><Check size={20} /></div> 
                                 <span style={{ fontWeight: 800 }}>Highest Post Office Visit</span>
                              </div>
                           </div>

                           <div className="included-excluded" style={{ marginTop: '50px' }}>
                              <div className="box included" style={{ borderRadius: '24px' }}>
                                 <h4 style={{ fontWeight: 900, marginBottom: '20px' }}>{isGujarati ? 'શું સમાવેશ થાય છે?' : "What's Included"}</h4>
                                 <ul>
                                    <li><Check size={16} color="#16a34a" /> All permits & entries</li>
                                    <li><Check size={16} color="#16a34a" /> Stay in shared homestays</li>
                                    <li><Check size={16} color="#16a34a" /> Breakfast & Dinner daily</li>
                                    <li><Check size={16} color="#16a34a" /> Expert Trip Captain</li>
                                 </ul>
                              </div>
                              <div className="box excluded" style={{ borderRadius: '24px' }}>
                                 <h4 style={{ fontWeight: 900, marginBottom: '20px' }}>{isGujarati ? 'શું સમાવેશ નથી?' : "What's Not Included"}</h4>
                                 <ul>
                                    <li><X size={16} color="#dc2626" /> Airfare / Train tickets</li>
                                    <li><X size={16} color="#dc2626" /> Lunch (Personal expense)</li>
                                    <li><X size={16} color="#dc2626" /> Personal Insurance</li>
                                    <li><X size={16} color="#dc2626" /> Laundry & Tips</li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === 'itinerary' && (
                        <div className="section-block content-card animate-fade">
                           <h3 className="content-title">{isGujarati ? 'દિવસવાર વિગત' : 'Sample Itinerary'}</h3>
                           <div className="itinerary-list">
                              {itinerary.map((day, i) => (
                                 <div key={i} className={`itinerary-item ${openDay === i ? 'open' : ''}`}>
                                    <div className="itinerary-header" style={{ background: openDay === i ? '#f8fafc' : 'transparent', borderRadius: '16px' }} onClick={() => setOpenDay(openDay === i ? -1 : i)}>
                                       <div className="day-circle" style={{ background: '#000', color: '#ffcc00', border: '5px solid #fff', boxShadow: '0 0 0 2px #000' }}>{day.day}</div>
                                       <h4 style={{ fontWeight: 800 }}>{day.title}</h4>
                                       {openDay === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                    <AnimatePresence>
                                       {openDay === i && (
                                          <motion.div
                                             initial={{ height: 0, opacity: 0 }}
                                             animate={{ height: 'auto', opacity: 1 }}
                                             exit={{ height: 0, opacity: 0 }}
                                             className="itinerary-body"
                                          >
                                             <p style={{ paddingLeft: '0', fontSize: '16px', lineHeight: '1.7' }}>{day.desc}</p>
                                          </motion.div>
                                       )}
                                    </AnimatePresence>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === 'packages' && (
                        <div className="section-block content-card animate-fade">
                           <h3 className="content-title">{isGujarati ? 'પેકેજ સરખામણી' : 'Package Variations'}</h3>
                           <div className="table-responsive">
                              <table className="comparison-table">
                                 <thead>
                                    <tr>
                                       <th style={{ background: '#f1f5f9' }}>Plan</th>
                                       {variants.map(v => <th key={v.type} className={v.featured ? 'feat' : ''} style={{ background: v.featured ? '#000' : '#f8fafc', color: v.featured ? '#ffcc00' : '#000' }}>{v.type}</th>)}
                                    </tr>
                                 </thead>
                                 <tbody>
                                    <tr>
                                       <td className="row-label">Price (PP)</td>
                                       {variants.map(v => <td key={v.type} className="price-td" style={{ color: '#000', fontWeight: 900 }}>₹{v.price}</td>)}
                                    </tr>
                                    <tr>
                                       <td className="row-label">Stay</td>
                                       {variants.map(v => <td key={v.type}>{v.stay}</td>)}
                                    </tr>
                                    <tr>
                                       <td className="row-label">Meals</td>
                                       {variants.map(v => <td key={v.type}>{v.meals}</td>)}
                                    </tr>
                                    <tr>
                                       <td className="row-label">Transport</td>
                                       {variants.map(v => <td key={v.type}>{v.transport}</td>)}
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     )}
                  </div>

                  <div className="right-column">
                     <div className="booking-card sidebar" style={{ position: 'sticky', top: '150px' }}>
                        <div className="booking-header" style={{ border: 'none' }}>
                           <span className="price-label">Experience starts from</span>
                           <div className="price-tag" style={{ color: '#ffcc00', fontSize: '44px' }}><IndianRupee size={32} /> 24,999/-</div>
                           <p className="per-person" style={{ opacity: 0.6 }}>*per person (excluding GST)</p>
                        </div>
                        <div className="booking-actions" style={{ marginTop: '30px' }}>
                           <button className="btn-booking" style={{ background: '#ffcc00', color: '#000' }}><Zap size={18} /> Book This Trip</button>
                           <button className="btn-secondary" style={{ marginTop: '10px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}><Heart size={18} /> Add to Wishlist</button>
                           <p className="cta-support" style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', opacity: 0.7 }}><Info size={14} /> Need Help? +91 90995 99331</p>
                        </div>
                        <div className="sidebar-badges" style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                           <div className="trust-badge-mini">
                              <ShieldCheck size={18} color="#ffcc00" />
                              <p>Certified Guides</p>
                           </div>
                           <div className="trust-badge-mini">
                              <Zap size={18} color="#ffcc00" />
                              <p>Instant Booking</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Sticky Bottom Bar for Mobile */}
         <div className="sticky-booking-bar" style={{ background: '#000', borderTop: '1px solid #ffcc00' }}>
            <div className="sticky-price" style={{ color: '#ffcc00' }}>₹24,999/-</div>
            <button className="btn-primary-large" style={{ background: '#ffcc00', color: '#000', padding: '12px 30px' }}>Inquire Now</button>
         </div>
      </div>
   );
};

export default DestinationDetail;
