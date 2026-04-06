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
      <header className="detail-hero">
        <img src="https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80" alt="Destination" />
        <div className="hero-overlay"></div>
        <div className="container">
           <div className="hero-content">
              <div className="badge-featured">{isGujarati ? 'સૌથી વધુ પસંદગી' : 'Most Loved'}</div>
              <h1>Spiti Valley Expedition</h1>
              <div className="meta-info">
                 <span><MapPin size={16} /> Himachal Pradesh</span>
                 <span><Clock size={16} /> 6 Days / 5 Nights</span>
                 <span><Zap size={16} /> Easy to Moderate</span>
              </div>
           </div>
        </div>
      </header>

      <section className="detail-tabs">
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
                   <div className="section-block animate-fade">
                      <h3>{isGujarati ? 'પ્રવાસની વિગત' : 'Trip Overview'}</h3>
                      <p>
                        Spiti Valley is a cold desert mountain valley located high in the Himalayas in the north-eastern part of the Indian state of Himachal Pradesh. 
                        The name "Spiti" means "The Middle Land", i.e. the land between Tibet and India. It is one of the most remote places in the world.
                      </p>
                      <div className="highlights-grid">
                         <div className="highlight-item"><div className="icon-circle"><Check size={20} /></div> <span>Visit Key Monastery</span></div>
                         <div className="highlight-item"><div className="icon-circle"><Check size={20} /></div> <span>Chandratal Lake Visit</span></div>
                         <div className="highlight-item"><div className="icon-circle"><Check size={20} /></div> <span>Stargazing Experience</span></div>
                         <div className="highlight-item"><div className="icon-circle"><Check size={20} /></div> <span>Highest Post Office Visit</span></div>
                      </div>

                      <div className="included-excluded">
                         <div className="box included">
                            <h4>{isGujarati ? 'શું સમાવેશ થાય છે?' : "What's Included"}</h4>
                            <ul>
                               <li><Check size={14} color="#16a34a" /> All permits & entries</li>
                               <li><Check size={14} color="#16a34a" /> Stay in shared homestays</li>
                               <li><Check size={14} color="#16a34a" /> Breakfast & Dinner daily</li>
                               <li><Check size={14} color="#16a34a" /> Expert Trip Captain</li>
                            </ul>
                         </div>
                         <div className="box excluded">
                            <h4>{isGujarati ? 'શું સમાવેશ નથી?' : "What's Not Included"}</h4>
                            <ul>
                               <li><X size={14} color="#dc2626" /> Airfare / Train tickets</li>
                               <li><X size={14} color="#dc2626" /> Lunch (Personal expense)</li>
                               <li><X size={14} color="#dc2626" /> Personal Insurance</li>
                               <li><X size={14} color="#dc2626" /> Laundry & Tips</li>
                            </ul>
                         </div>
                      </div>
                   </div>
                 )}

                 {activeTab === 'itinerary' && (
                   <div className="section-block animate-fade">
                      <h3>{isGujarati ? 'દિવસવાર વિગત' : 'Sample Itinerary'}</h3>
                      <div className="itinerary-list">
                         {itinerary.map((day, i) => (
                           <div key={i} className={`itinerary-item ${openDay === i ? 'open' : ''}`}>
                              <div className="itinerary-header" onClick={() => setOpenDay(openDay === i ? -1 : i)}>
                                 <div className="day-circle">Day {day.day}</div>
                                 <h4>{day.title}</h4>
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
                                     <p>{day.desc}</p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                           </div>
                         ))}
                      </div>
                   </div>
                 )}

                 {activeTab === 'packages' && (
                    <div className="section-block animate-fade">
                       <h3>{isGujarati ? 'પેકેજ સરખામણી' : 'Package Variations'}</h3>
                       <div className="table-responsive">
                          <table className="comparison-table">
                             <thead>
                                <tr>
                                   <th>Plan</th>
                                   {variants.map(v => <th key={v.type} className={v.featured ? 'feat' : ''}>{v.type}</th>)}
                                </tr>
                             </thead>
                             <tbody>
                                <tr>
                                   <td className="row-label">Price (PP)</td>
                                   {variants.map(v => <td key={v.type} className="price-td">₹{v.price}</td>)}
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
                 <div className="booking-card card sticky-card">
                    <div className="booking-header">
                       <span className="from">Prices starting from</span>
                       <div className="price-tag"><IndianRupee size={24} /> 24,999/-</div>
                       <p className="per-person">*per person (excluding GST)</p>
                    </div>
                    <div className="booking-actions">
                       <button className="btn-primary-full"><Zap size={18} /> Book This Trip</button>
                       <button className="btn-whatsapp-full"><Heart size={18} /> Add to Wishlist</button>
                       <p className="cta-support"><Info size={14} /> Need Help? +91 90995 99331</p>
                    </div>
                    <div className="badges-trust-small">
                       <div><ShieldCheck size={14} /> Certified Guides</div>
                       <div><Zap size={14} /> Instant Booking</div>
                    </div>
                 </div>

                 <div className="info-box card mt-20">
                    <h4>Best Time to Visit</h4>
                    <p><strong>Peak Season:</strong> May to September (Clear skies, accessible roads)</p>
                    <p><strong>Winter:</strong> Oct to April (Heavy snow, adventurous!)</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile */}
      <div className="sticky-booking-bar">
         <div className="sticky-price">₹24,999/-</div>
         <button className="btn-primary-large">Inquire Now</button>
      </div>
    </div>
  );
};

export default DestinationDetail;
