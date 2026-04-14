import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, CheckCircle, ArrowRight, IndianRupee, Clock, Zap, ShieldCheck } from 'lucide-react';

const GroupTrips = ({ isGujarati }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTrips = async () => {
      try {
        const res = await axios.get('group-trips');
        setTrips(res.data);
      } catch (err) {
        console.error('Error fetching group trips:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const steps = [
    { icon: <Zap size={24} />, title: isGujarati ? 'બ્રાઉઝ કરો' : 'Browse', desc: isGujarati ? 'તમારી પસંદગી મુજબ ટ્રિપ્સ શોધો' : 'Explore our upcoming group departures.' },
    { icon: <MapPin size={24} />, title: isGujarati ? 'સીટ બુક કરો' : 'Book Your Seat', desc: isGujarati ? 'માત્ર ₹5000 થી તમારી સીટ બુક કરો' : 'Reserve your spot with a minimal token.' },
    { icon: <ShieldCheck size={24} />, title: isGujarati ? 'અમે બધું સંભાળીશું' : 'We HandleEverything', desc: isGujarati ? 'મુસાફરીની ચિંતા અમને છોડો' : 'Logistics, stays, and permits are on us.' },
    { icon: <CheckCircle size={24} />, title: isGujarati ? 'મુસાફરી કરો' : 'You Travel & Enjoy', desc: isGujarati ? 'નવા મિત્રો સાથે યાદો બનાવો' : 'Go solo or with friends, return with a family.' }
  ];

  return (
    <div className="group-trips-page">
      <header className="page-header-premium" style={{ marginBottom: '0' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="page-title" style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 950, color: 'white' }}>
              {isGujarati ? 'ગ્રુપ ટ્રિપ્સ' : 'Fixed Departures'}
            </h1>
            <p className="page-subtitle" style={{ color: 'white', opacity: 0.9, maxWidth: '600px' }}>
              {isGujarati ? 'નવા મિત્રો બનાવો અને અજાણ્યા રસ્તાઓ શોધો.' : 'Travel with like-minded explorers and make lifelong memories across the globe.'}
            </p>
          </motion.div>
        </div>
      </header>

      {/* How it works */}
      <section style={{ padding: '100px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
             <h6 style={{ color: 'var(--primary-orange)', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '15px' }}>{isGujarati ? 'પ્રક્રિયા' : 'The Journey'}</h6>
             <h2 style={{ fontSize: '36px', fontWeight: 950, margin: 0 }}>{isGujarati ? 'ગ્રુપ ટ્રિપ્સ કેવી રીતે કામ કરે છે?' : 'How Our Group Trips Work'}</h2>
          </div>
          <div className="steps-grid" style={{ marginTop: '50px' }}>
            {steps.map((step, i) => (
              <div key={i} className="step-card premium-card" style={{ padding: '50px 40px', textAlign: 'left' }}>
                 <div style={{ width: '60px', height: '60px', background: 'var(--primary-black)', color: 'var(--primary-orange)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                    {step.icon}
                 </div>
                 <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '15px' }}>{step.title}</h3>
                 <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Listings */}
      <section style={{ padding: '100px 0', background: '#fcfaf7' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div>
               <h2 style={{ fontSize: '36px', fontWeight: 950, marginBottom: '10px' }}>{isGujarati ? 'આગામી ટ્રિપ્સ' : 'Upcoming Departures'}</h2>
               <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{isGujarati ? 'જલ્દી બુક કરો, સીટો મર્યાદિત છે!' : 'Grab your spot before the seats are all gone!'}</p>
            </div>
             <div className="sale-badge" style={{ background: 'var(--primary-black)', color: 'white', padding: '12px 25px', borderRadius: '50px' }}>
               <Clock size={18} style={{ color: 'var(--primary-orange)' }} /> 
               <span style={{ fontWeight: 800, fontSize: '13px' }}>{isGujarati ? 'વહેલી બુકિંગ પર છૂટ!' : 'EARLY BIRD DISCOUNT ACTIVE'}</span>
             </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>
            {loading ? (
               <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px' }}>
                  <div className="loader" style={{ margin: '0 auto' }}></div>
               </div>
            ) : trips.filter(t => t.status === 'upcoming' || t.status === 'full').map(trip => {
              const totalSeats = 15; 
              const seatsLeft = trip.seats || 0;
              const filledPercentage = Math.min(((totalSeats - seatsLeft) / totalSeats) * 100, 100);
              const isFull = trip.status === 'full' || seatsLeft === 0;

              const handleWhatsAppBook = () => {
                const adminPhone = "919313634723";
                const text = `*Shiv Travel Group Trip Enquiry*%0A%0A*Trip:* ${trip.title}%0A*Date:* ${trip.date}%0A*Price:* ₹${trip.price.toLocaleString()}%0A%0AHi, I'm interested in booking a seat for this fixed departure. Please let me know the availability!`;
                window.open(`https://wa.me/${adminPhone}?text=${text}`, '_blank');
              };

              return (
                <div key={trip.id} className="trip-card-premium premium-card" style={{ overflow: 'hidden', background: 'white', opacity: isFull ? 0.9 : 1 }}>
                  <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                     <img src={`/api/uploads/${trip.image}`} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isFull ? 'grayscale(0.5)' : 'none' }} />
                     <div style={{ position: 'absolute', top: '20px', left: '20px', background: isFull ? '#ef4444' : 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', color: 'white', padding: '6px 15px', borderRadius: '50px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                        {isFull ? (isGujarati ? 'બુકિંગ બંધ' : 'HOUSE FULL') : (isGujarati ? 'ગ્રુપ ડિપાર્ચર' : 'Group Departure')}
                     </div>
                  </div>

                  <div style={{ padding: '35px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 950, letterSpacing: '-0.5px', color: isFull ? '#64748b' : 'var(--primary-black)' }}>{trip.title}</h3>
                        <div style={{ background: '#fffbeb', color: '#b45309', padding: '5px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 900 }}>
                           {trip.difficulty || 'Moderate'}
                        </div>
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <Calendar size={18} style={{ color: isFull ? '#cbd5e1' : 'var(--primary-orange)' }} />
                           <span style={{ fontSize: '14px', fontWeight: 700, color: isFull ? '#94a3b8' : '#334155' }}>{trip.date}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <Users size={18} style={{ color: isFull ? '#cbd5e1' : 'var(--primary-orange)' }} />
                           <span style={{ fontSize: '14px', fontWeight: 700, color: isFull ? '#94a3b8' : '#334155' }}>12-15 Explores</span>
                        </div>
                     </div>

                     {/* Progress Bar for Seats */}
                     <div style={{ marginBottom: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                           <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)' }}>{isGujarati ? 'સીટ ઉપલબ્ધતા' : 'BOOKING STATUS'}</span>
                           <span style={{ fontSize: '12px', fontWeight: 900, color: isFull ? '#ef4444' : (seatsLeft <= 3 ? '#ff6b00' : '#10b981') }}>
                              {isFull ? (isGujarati ? 'બધી સીટો ફૂલ!' : 'SOLD OUT!') : (isGujarati ? `${seatsLeft} જ બાકી!` : `${seatsLeft} SEATS LEFT!`)}
                           </span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                           <div style={{ width: `${isFull ? 100 : filledPercentage}%`, height: '100%', background: isFull ? '#cbd5e1' : 'var(--primary-orange)', borderRadius: '10px' }}></div>
                        </div>
                     </div>

                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '25px', borderTop: '1px solid #f1f5f9' }}>
                        <div>
                           <p style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '4px' }}>{isGujarati ? 'કિંમત (વ્યક્તિ દીઠ)' : 'TOTAL PACKAGE PP'}</p>
                           <h4 style={{ fontSize: '26px', fontWeight: 950, color: isFull ? '#94a3b8' : 'var(--primary-black)' }}>
                              <IndianRupee size={22} />{trip.price.toLocaleString()}
                           </h4>
                        </div>
                        <button 
                          onClick={handleWhatsAppBook}
                          disabled={isFull}
                          className="btn-primary-sm" 
                          style={{ 
                            padding: '16px 25px', 
                            backgroundColor: isFull ? '#cbd5e1' : 'var(--primary-black)', 
                            opacity: 1, 
                            cursor: isFull ? 'not-allowed' : 'pointer' 
                          }}
                        >
                           {isFull ? (isGujarati ? 'ફૂલ' : 'FULL') : (isGujarati ? 'બુક કરો' : 'Book Seat')} <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ padding: '100px 0', borderTop: '1px solid #eee', background: 'white' }}>
         <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 950, marginBottom: '50px', letterSpacing: '-1px' }}>{isGujarati ? 'અમારા પ્રવાસમાં શું ખાસ છે?' : 'Why Travellers Love Our Group Trips'}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
               {[
                  { label: 'Solo Friendly', icon: <Users size={22} /> },
                  { label: 'Female Safety First', icon: <ShieldCheck size={22} /> },
                  { label: 'Expert Trip Leads', icon: <Zap size={22} /> },
                  { label: 'Strict Age Groups', icon: <Clock size={22} /> }
               ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#fcfaf7', padding: '20px 35px', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                     <span style={{ color: 'var(--primary-orange)' }}>{item.icon}</span>
                     <span style={{ fontWeight: 800, fontSize: '15px' }}>{item.label}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default GroupTrips;
