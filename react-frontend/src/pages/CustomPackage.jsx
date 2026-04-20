import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { MapPin, Calendar, Users, IndianRupee, Heart, Send, CheckCircle, ShieldCheck, Sparkles, Compass, Mountain, Coffee, Palmtree, ArrowRight, ArrowLeft } from 'lucide-react';

const CustomPackage = ({ isGujarati }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    travellers: '',
    budget: '',
    tripType: 'Mixed',
    requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCustomEnquiry = async () => {
    setLoading(true);
    try {
      const message = `Custom Plan Request:\n- Destination: ${formData.destination}\n- Dates: ${formData.dates}\n- Travellers: ${formData.travellers}\n- Budget: ${formData.budget}\n- Mood: ${formData.tripType}\n- Special Reqs: ${formData.requirements}`;

      await axios.post('enquiries', {
        name: isGujarati ? 'Custom Lead' : 'Premium Inquiry',
        email: 'concierge@shivtravel.com',
        phone: 'Direct Channel',
        subject: `[EXCLUSIVE] Custom Trip: ${formData.destination}`,
        message: message
      });
      
      setSubmitted(true);
    } catch (err) {
       console.error(err);
       alert('Connection lost. Please contact our concierge directly on WhatsApp.');
    } finally {
       setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const setTripType = (type) => setFormData({ ...formData, tripType: type });

  const tripTypes = [
    { id: 'Adventure', label: 'Adventure', icon: <Mountain size={24} />, desc: 'Thrill & Exploration' },
    { id: 'Relaxation', label: 'Relaxation', icon: <Palmtree size={24} />, desc: 'Leisure & Comfort' },
    { id: 'Spiritual', label: 'Spiritual', icon: <Compass size={24} />, desc: 'Peace & Culture' },
    { id: 'Mixed', label: 'Mixed Vibe', icon: <Coffee size={24} />, desc: 'The Best of Both' }
  ];

  const badges = [
    { icon: <ShieldCheck size={24} />, text: isGujarati ? 'કોઈ બુકિંગ ફી નથી' : 'No Booking Fees' },
    { icon: <CheckCircle size={24} />, text: isGujarati ? 'ફ્રી ઈટિનરરી પ્લાનિંગ' : 'Free Planning' },
    { icon: <Sparkles size={24} />, text: isGujarati ? 'શ્રેષ્ઠ ભાવ ગેરેંટી' : 'Best Rate Guarantee' }
  ];

  if (submitted) {
    return (
      <div className="custom-package-page" style={{ background: 'var(--primary-black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '60px', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '40px', border: '1px solid var(--primary-gold)', maxWidth: '600px' }}
        >
          <div style={{ width: '100px', height: '100px', background: 'var(--primary-gold)', color: 'black', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
            <CheckCircle size={50} />
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 950, color: 'white', marginBottom: '20px' }}>{isGujarati ? 'તમારી ઈચ્છા પ્રાપ્ત થઈ!' : 'Your Request is in Good Hands.'}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
            {isGujarati ? 'અમારા નિષ્ણાતો તમને ૨૪ કલાકમાં સંપર્ક કરશે.' : 'Our master planners are already working on your personalized itinerary. Expect a call within 24 business hours.'}
          </p>
          <button className="btn-primary-sm" onClick={() => window.location.href = '/'} style={{ margin: '0 auto' }}>Back to Home</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="custom-package-page" style={{ background: 'var(--primary-black)', color: 'white' }}>
      {/* Immersive Background Hero */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <img src="/images/plan_trip_hero.png" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} alt="Bg" />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 0%, var(--primary-black) 100%)' }}></div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '140px', paddingBottom: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
             <span style={{ color: 'var(--primary-gold)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '5px', fontSize: '12px' }}>
                {isGujarati ? 'તમારી ડ્રીમ ટ્રીપ' : 'Tailor-Made Excellence'}
             </span>
             <h1 style={{ fontSize: 'clamp(40px, 6vw, 70px)', fontWeight: 950, marginTop: '20px', fontFamily: 'var(--font-heading)' }}>
                {isGujarati ? 'ડિઝાઇન કરો તમારો પ્રવાસ' : 'Craft Your Legacy \nJourney.'}
             </h1>
          </motion.div>
        </div>

        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'start' }}>
          {/* Main Form Card */}
          <motion.div 
            layout
            className="premium-card" 
            style={{ 
              background: 'rgba(10, 10, 10, 0.8)', 
              backdropFilter: 'blur(15px)', 
              border: '1px solid rgba(212, 175, 55, 0.2)', 
              padding: '60px', 
              borderRadius: '40px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
            }}
          >
            {/* Step Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
              <div>
                <span style={{ color: 'var(--primary-gold)', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase' }}>Phase {step} of 4</span>
                <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'white' }}>
                  {step === 1 && (isGujarati ? 'ગંતવ્ય નક્કી કરો' : 'The Destination')}
                  {step === 2 && (isGujarati ? 'સમય અને સાથી' : 'Timeline & Company')}
                  {step === 3 && (isGujarati ? 'અનુભવ અને બજેટ' : 'The Vibe & Value')}
                  {step === 4 && (isGujarati ? 'ખાસ વિગતો' : 'Final Touches')}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1,2,3,4].map(s => (
                  <div key={s} style={{ width: step === s ? '30px' : '10px', height: '10px', background: step >= s ? 'var(--primary-gold)' : 'rgba(255,255,255,0.1)', borderRadius: '10px', transition: '0.4s' }}></div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {step === 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <p style={{ color: 'var(--text-muted)' }}>{isGujarati ? 'તમે ક્યાં જવા માંગો છો? અમને જણાવો અને અમે પ્લાન કરીશું.' : 'Where should we take you next? Specify a city, country, or even just a mood.'}</p>
                    <div className="input-group-premium" style={{ position: 'relative' }}>
                      <MapPin style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)' }} />
                      <input 
                        name="destination"
                        style={{ width: '100%', padding: '25px 25px 25px 60px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', color: 'white', fontSize: '18px', outline: 'none' }}
                        placeholder={isGujarati ? 'સ્થળ (દા.ત. કાશ્મીર, દુબઈ)' : 'e.g. Switzerland, Maldives, Luxury Leh...'}
                        value={formData.destination}
                        onChange={handleInput}
                        autoFocus
                      />
                    </div>
                    <button className="btn-primary-sm" style={{ padding: '22px', justifyContent: 'center', width: '100%' }} onClick={nextStep}>
                      Next Segment <ArrowRight size={18} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="input-group-premium">
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '13px', fontWeight: 800, color: 'var(--primary-gold)' }}>TRAVEL DATES</label>
                        <div style={{ position: 'relative' }}>
                          <Calendar style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)' }} />
                          <input name="dates" style={{ width: '100%', padding: '20px 20px 20px 55px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: 'white', outline: 'none' }} placeholder="Select or type..." value={formData.dates} onChange={handleInput} />
                        </div>
                      </div>
                      <div className="input-group-premium">
                        <label style={{ display: 'block', marginBottom: '12px', fontSize: '13px', fontWeight: 800, color: 'var(--primary-gold)' }}>GUESTS</label>
                        <div style={{ position: 'relative' }}>
                          <Users style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)' }} />
                          <input name="travellers" style={{ width: '100%', padding: '20px 20px 20px 55px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: 'white', outline: 'none' }} placeholder="How many?" value={formData.travellers} onChange={handleInput} />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button className="btn-secondary" style={{ flex: 1, padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'white' }} onClick={prevStep}>Back</button>
                      <button className="btn-primary-sm" style={{ flex: 2, padding: '20px', justifyContent: 'center' }} onClick={nextStep}>Continue <ArrowRight size={18} /></button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="input-group-premium">
                      <label style={{ display: 'block', marginBottom: '12px', fontSize: '13px', fontWeight: 800, color: 'var(--primary-gold)' }}>ESTIMATED BUDGET</label>
                      <div style={{ position: 'relative' }}>
                        <IndianRupee style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-gold)' }} />
                        <input name="budget" style={{ width: '100%', padding: '20px 20px 20px 55px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: 'white', outline: 'none', fontSize: '18px' }} placeholder="Budget per person..." value={formData.budget} onChange={handleInput} />
                      </div>
                    </div>
                    
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: 'var(--primary-gold)' }}>TRIP OVERTONE</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                       {tripTypes.map(type => (
                         <div 
                           key={type.id}
                           onClick={() => setTripType(type.id)}
                           style={{ 
                             padding: '20px', 
                             borderRadius: '20px', 
                             border: `1px solid ${formData.tripType === type.id ? 'var(--primary-gold)' : 'rgba(255,255,255,0.05)'}`, 
                             background: formData.tripType === type.id ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.02)',
                             cursor: 'pointer',
                             transition: '0.3s'
                           }}
                         >
                            <div style={{ color: formData.tripType === type.id ? 'var(--primary-gold)' : 'var(--text-muted)', marginBottom: '10px' }}>{type.icon}</div>
                            <div style={{ fontWeight: 800, fontSize: '14px' }}>{type.label}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{type.desc}</div>
                         </div>
                       ))}
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button className="btn-secondary" style={{ flex: 1, padding: '20px', borderRadius: '15px' }} onClick={prevStep}>Back</button>
                      <button className="btn-primary-sm" style={{ flex: 2, padding: '20px', justifyContent: 'center' }} onClick={nextStep}>Almost There <ArrowRight size={18} /></button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="input-group-premium">
                      <label style={{ display: 'block', marginBottom: '12px', fontSize: '13px', fontWeight: 800, color: 'var(--primary-gold)' }}>NOTES TO OUR CONCIERGE</label>
                      <textarea 
                        name="requirements" 
                        style={{ width: '100%', height: '150px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: 'white', outline: 'none', resize: 'none' }}
                        placeholder="Dietary needs, preferred airline, specific hotels, or special occasions..." 
                        value={formData.requirements} 
                        onChange={handleInput}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button className="btn-secondary" style={{ flex: 1, padding: '20px', borderRadius: '15px' }} onClick={prevStep}>Review</button>
                      <button 
                        disabled={loading || !formData.destination} 
                        className="btn-primary-sm" 
                        style={{ flex: 2, padding: '20px', justifyContent: 'center', opacity: (!formData.destination) ? 0.5 : 1 }} 
                        onClick={handleCustomEnquiry}
                      >
                        {loading ? 'Transmitting...' : 'Request Luxury Quote'} <Send size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Side Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
             <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.1)', padding: '40px', borderRadius: '32px' }}>
               <h4 style={{ color: 'var(--primary-gold)', fontWeight: 900, fontSize: '20px', marginBottom: '30px' }}>Exclusive Privileges</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                 {badges.map((badge, i) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                     <div style={{ color: 'var(--primary-gold)' }}>{badge.icon}</div>
                     <span style={{ fontWeight: 700, fontSize: '15px' }}>{badge.text}</span>
                   </div>
                 ))}
               </div>
             </div>

             <div className="why-custom card" style={{ padding: '40px', borderRadius: '32px', background: '#ffffff05', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: 'white', fontWeight: 900, marginBottom: '25px', fontSize: '20px' }}>{isGujarati ? 'શા માટે શિવ ટ્રાવેલ?' : 'The Shiv Distinction'}</h4>
                <ul style={{ gap: '15px', display: 'flex', flexDirection: 'column', listStyle: 'none' }}>
                   {[
                     'Ultra-Private VIP Transport',
                     'Hidden Gem Destinations',
                     '24/7 Dedicated Concierge',
                     'Custom Culinary Experiences'
                   ].map((item, i) => (
                     <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                        <div style={{ width: '6px', height: '6px', background: 'var(--primary-gold)', borderRadius: '50%' }}></div>
                        {item}
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPackage;
