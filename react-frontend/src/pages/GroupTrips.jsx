import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Users, MapPin, CheckCircle, ArrowRight, IndianRupee, Clock, Zap, ShieldCheck, Star, TrendingUp } from 'lucide-react';

const GroupTrips = ({ isGujarati }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

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
    { icon: <Zap size={28} />, title: isGujarati ? 'બ્રાઉઝ કરો' : 'Curated Selection', desc: isGujarati ? 'તમારી પસંદગી મુજબ ટ્રિપ્સ શોધો' : 'Hand-picked routes designed for the modern explorer.' },
    { icon: <MapPin size={28} />, title: isGujarati ? 'સીટ બુક કરો' : 'VIP Reservation', desc: isGujarati ? 'માત્ર ₹5000 થી તમારી સીટ બુક કરો' : 'Secure your elite spot with a minimal token amount.' },
    { icon: <ShieldCheck size={28} />, title: isGujarati ? 'અમે બધું સંભાળીશું' : 'Concierge Service', desc: isGujarati ? 'મુસાફરીની ચિંતા અમને છોડો' : 'Logistics, stays, and permits—all managed with precision.' },
    { icon: <CheckCircle size={28} />, title: isGujarati ? 'મુસાફરી કરો' : 'Elite Community', desc: isGujarati ? 'નવા મિત્રો સાથે યાદો બનાવો' : 'Go with strangers, return with a family of adventurers.' }
  ];

  return (
    <div className="group-trips-page" style={{ background: 'var(--primary-black)', color: 'white' }}>
      {/* Premium Hero Section */}
      <section style={{ position: 'relative', height: '90vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <motion.div
          style={{ y: y1, position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', zIndex: 0 }}
        >
          <img
            src="/images/group_trips_hero.png"
            alt="Hero"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }}
          />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, var(--primary-black) 100%)', zIndex: 1 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ maxWidth: '800px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ width: '40px', height: '1px', background: 'var(--primary-gold)' }}></span>
              <span style={{ color: 'var(--primary-gold)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '4px', fontSize: '12px' }}>
                {isGujarati ? 'એક્સક્લુઝિવ ડિપાર્ચર્સ' : 'Exclusive Fixed Departures'}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(48px, 10vw, 90px)', fontWeight: 950, lineHeight: 1, marginBottom: '30px', fontFamily: 'var(--font-heading)' }}>
              {isGujarati ? 'ગ્રુપ ટ્રિપ્સ - શિવ ટ્રાવેલ' : 'Journey with the \nChosen Few.'}
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '40px', maxWidth: '600px' }}>
              {isGujarati ? 'નવા મિત્રો બનાવો અને અજાણ્યા રસ્તાઓ શોધો.' : 'Step beyond the ordinary. Join our premium group departures designed for those who seek depth in every mile.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary-sm"
              style={{ padding: '20px 40px', fontSize: '16px', background: 'var(--gradient-gold)', color: 'black' }}
              onClick={() => document.getElementById('listings').scrollIntoView({ behavior: 'smooth' })}
            >
              {isGujarati ? 'ટ્રિપ્સ જુઓ' : 'Explore Departures'} <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* The Journey Experience */}
      <section style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>

        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 950, marginBottom: '20px' }}>
              {isGujarati ? 'આપણો રોડમેપ' : 'The Shiv Experience'}
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              From the moment you inquire to the last mile of the journey, excellence is our only standard.
            </p>
          </div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="premium-card"
                style={{
                  padding: '50px 40px',
                  background: 'rgba(20, 20, 20, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(212, 175, 55, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--primary-gold)', opacity: 0.3 }}></div>
                <div style={{ color: 'var(--primary-gold)', marginBottom: '30px' }}>{step.icon}</div>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '15px', color: 'white' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Listings */}
      <section id="listings" style={{ padding: '120px 0', background: 'linear-gradient(to bottom, var(--primary-black), #0a0a0a)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <TrendingUp size={18} style={{ color: 'var(--primary-gold)' }} />
                <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase' }}>{isGujarati ? 'આગામી' : 'LIVE Status'}</span>
              </div>
              <h2 style={{ fontSize: '42px', fontWeight: 950 }}>{isGujarati ? 'સીઝન ના આગામી સાહસો' : 'Upcoming Expeditions'}</h2>
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--primary-gold)', color: 'var(--primary-gold)', padding: '12px 25px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <Clock size={18} />
              <span style={{ fontWeight: 800, fontSize: '13px' }}>{isGujarati ? 'વહેલા બુકિંગ પર છૂટ!' : 'EARLY BIRD PRIVILEGE ACTIVE'}</span>
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {loading ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px' }}>
                <div className="loader-gold" style={{ margin: '0 auto' }}></div>
              </div>
            ) : trips.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px', background: '#111', borderRadius: '30px' }}>
                <p style={{ color: 'var(--text-muted)' }}>No expeditions currently available for booking.</p>
              </div>
            ) : trips.filter(t => t.status === 'upcoming' || t.status === 'full').map(trip => {
              const totalSeats = 15;
              const seatsLeft = trip.seats || 0;
              const filledPercentage = Math.min(((totalSeats - seatsLeft) / totalSeats) * 100, 100);
              const isFull = trip.status === 'full' || seatsLeft === 0;

              return (
                <motion.div
                  key={trip.id}
                  whileHover={{ y: -10 }}
                  style={{
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '28px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    opacity: isFull ? 0.8 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  {/* Image Section - More Compact */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img src={`/api/uploads/${trip.image}`} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6), transparent)' }}></div>

                    {/* Status Badge */}
                    <div style={{ 
                      position: 'absolute', top: '15px', left: '15px', 
                      background: isFull ? 'rgba(239, 68, 68, 0.8)' : 'var(--gradient-gold)', 
                      color: isFull ? 'white' : 'black', 
                      padding: '6px 14px', borderRadius: '50px', fontSize: '10px', fontWeight: 950, 
                      textTransform: 'uppercase', letterSpacing: '1px', backdropFilter: 'blur(5px)'
                    }}>
                      {isFull ? (isGujarati ? 'હાઉસ ફૂલ' : 'SOLD OUT') : (isGujarati ? 'ઉપલબ્ધ' : 'CONFIRMED')}
                    </div>

                    {/* Compact Price Overlay */}
                    <div style={{ position: 'absolute', bottom: '15px', right: '15px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', padding: '5px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ fontSize: '16px', fontWeight: 950, color: 'white', display: 'flex', alignItems: 'center' }}>
                        <IndianRupee size={14} style={{ color: 'var(--primary-gold)' }} />{trip.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Body - Compact Padding */}
                  <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ marginBottom: '15px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '5px' }}>
                        {trip.difficulty || 'ELITE EXPEDITION'}
                      </span>
                      <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'white', lineHeight: 1.2 }}>{trip.title}</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calendar size={15} style={{ color: 'var(--primary-gold)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{trip.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Users size={15} style={{ color: 'var(--primary-gold)' }} />
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>12 Slots</span>
                      </div>
                    </div>

                    {/* Compact Availability Bar */}
                    <div style={{ marginBottom: '25px', background: 'rgba(255,255,255,0.02)', padding: '12px 15px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.4)' }}>AVAILABILITY</span>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: isFull ? '#ef4444' : 'var(--primary-gold)' }}>
                           {isFull ? 'FULL' : `${seatsLeft} SLOTS LEFT`}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                        <div style={{ width: `${isFull ? 100 : filledPercentage}%`, height: '100%', background: isFull ? '#333' : 'var(--gradient-gold)', borderRadius: '10px' }}></div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const adminPhone = "919313634723";
                        const text = `*TravelBookShiva Enquiry*%0A*Trip:* ${trip.title}%0A*Date:* ${trip.date}%0A*Price:* ₹${trip.price.toLocaleString()}%0A%0AHi, I'm interested in this expedition!`;
                        window.open(`https://wa.me/${adminPhone}?text=${text}`, '_blank');
                      }}
                      disabled={isFull}
                      style={{
                        width: '100%', padding: '14px', borderRadius: '50px', border: 'none',
                        background: isFull ? 'rgba(255,255,255,0.05)' : 'var(--gradient-gold)',
                        color: isFull ? 'rgba(255,255,255,0.2)' : 'black',
                        fontSize: '13px', fontWeight: 950, textTransform: 'uppercase', letterSpacing: '1px',
                        cursor: isFull ? 'not-allowed' : 'pointer', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                      }}
                    >
                      {isFull ? (isGujarati ? 'ડિપાર્ચર ફૂલ' : 'Waitlist') : (isGujarati ? 'સાથે જોડાઓ' : 'Reserve Spot')} <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Prestige Section */}
      <section style={{ padding: '120px 0', background: 'var(--primary-black)' }}>
        <div className="container">
          <div style={{ background: 'rgba(212, 175, 55, 0.03)', border: '1px solid rgba(212, 175, 55, 0.1)', borderRadius: '40px', padding: '80px 40px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 950, marginBottom: '60px' }}>{isGujarati ? 'અમારા પ્રવાસમાં શું ખાસ છે?' : 'Why Elite Travellers Choose Us'}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              {[
                { label: 'Solo Friendly', icon: <Users size={22} /> },
                { label: 'Safety Centric', icon: <ShieldCheck size={22} /> },
                { label: 'Master Trip Leads', icon: <Star size={22} /> },
                { label: 'Hand-picked Stays', icon: <MapPin size={22} /> }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '20px 35px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'var(--primary-gold)' }}>{item.icon}</span>
                  <span style={{ fontWeight: 800, fontSize: '15px', color: 'white' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupTrips;

