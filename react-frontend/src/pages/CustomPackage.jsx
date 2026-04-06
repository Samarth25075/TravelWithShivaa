import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MapPin, Calendar, Users, IndianRupee, Heart, Send, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

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

  const handleCustomEnquiry = async () => {
    setLoading(true);
    try {
      const message = `Custom Plan Request:\n- Destination: ${formData.destination}\n- Dates: ${formData.dates}\n- Travellers: ${formData.travellers}\n- Budget: ${formData.budget}\n- Mood: ${formData.tripType}\n- Special Reqs: ${formData.requirements}`;

      await axios.post('enquiries', {
        name: isGujarati ? 'Custom Lead' : 'TravelBookShiva Lead',
        email: 'info@shivtravel.com',
        phone: 'WhatsApp Channel',
        subject: `Custom Proposal: ${formData.destination}`,
        message: message
      });
      
      alert('Your wish has been received! Our team will contact you shortly.');
      setStep(1);
      setFormData({ destination: '', dates: '', travellers: '', budget: '', tripType: 'Mixed', requirements: '' });
    } catch (err) {
       console.error(err);
       alert('Failed to send enquiry. Please contact us on WhatsApp.');
    } finally {
       setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const badges = [
    { icon: <ShieldCheck size={24} />, text: isGujarati ? 'કોઈ બુકિંગ ફી નથી' : 'No Booking Fees' },
    { icon: <CheckCircle size={24} />, text: isGujarati ? 'ફ્રી ઈટિનરરી પ્લાનિંગ' : 'Free Planning' },
    { icon: <Sparkles size={24} />, text: isGujarati ? 'શ્રેષ્ઠ ભાવ ગેરેંટી' : 'Best Rate Guarantee' }
  ];

  return (
    <div className="custom-package-page">
      <header className="page-header-minimal">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
             className="page-title"
          >
            {isGujarati ? 'તમારી ડ્રીમ ટ્રીપ, તમારી રીતે' : 'Your Dream Trip, Your Way'}
          </motion.h1>
          <p className="page-subtitle">
            {isGujarati ? 'તમે ક્યાં જવા માંગો છો? અમને જણાવો અને અમે પ્લાન કરીશું.' : 'Tell us where you want to go, and we will handle the rest.'}
          </p>
        </div>
      </header>

      <section className="form-section">
        <div className="container">
           <div className="form-grid">
              <div className="form-content card">
                 <div className="form-header">
                    <div className="step-indicator">
                       {[1,2,3,4].map(s => (
                         <div key={s} className={`step-dot ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                            {step > s ? <CheckCircle size={14} /> : s}
                         </div>
                       ))}
                    </div>
                    <h3>Step {step} of 4</h3>
                 </div>

                 <div className="form-body">
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                         <label>{isGujarati ? 'ત્રણ ક્યાં જવા માંગો છો?' : 'Where do you want to go?'}</label>
                         <div className="input-group">
                            <MapPin className="input-icon" size={20} />
                            <input 
                               name="destination"
                               placeholder={isGujarati ? 'સ્થળ (દા.ત. કાશ્મીર, દુબઈ)' : 'Destination (e.g. Kashmir, Dubai)'}
                               value={formData.destination}
                               onChange={handleInput}
                            />
                         </div>
                         <button className="btn-primary-full mt-20" onClick={nextStep}>{isGujarati ? 'આગળ વધો' : 'Next Step'}</button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                         <label>{isGujarati ? 'ક્યારે અને કેવી રીતે?' : 'When and How Many?'}</label>
                         <div className="input-row">
                            <div className="input-group half">
                               <Calendar className="input-icon" size={20} />
                               <input name="dates" placeholder={isGujarati ? 'તારીખ' : 'Travel Dates'} value={formData.dates} onChange={handleInput} />
                            </div>
                            <div className="input-group half">
                               <Users className="input-icon" size={20} />
                               <input name="travellers" placeholder={isGujarati ? 'પ્રવાસીઓની સંખ્યા' : 'Travellers'} value={formData.travellers} onChange={handleInput} />
                            </div>
                         </div>
                         <div className="btn-row">
                            <button className="btn-secondary" onClick={prevStep}>{isGujarati ? 'પાછા' : 'Back'}</button>
                            <button className="btn-primary-medium" onClick={nextStep}>{isGujarati ? 'આગળ વધો' : 'Next Step'}</button>
                         </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                         <label>{isGujarati ? 'બજેટ અને મૂડ' : 'Budget and Vibe'}</label>
                         <div className="input-group">
                            <IndianRupee className="input-icon" size={20} />
                            <input name="budget" placeholder={isGujarati ? 'બજેટ પ્રતિ વ્યક્તિ' : 'Budget per Person'} value={formData.budget} onChange={handleInput} />
                         </div>
                         <select name="tripType" value={formData.tripType} onChange={handleInput} className="custom-select">
                            <option value="Adventure">Adventure</option>
                            <option value="Relaxation">Relaxation</option>
                            <option value="Spiritual">Spiritual</option>
                            <option value="Mixed">Mixed Vibe</option>
                         </select>
                         <div className="btn-row">
                            <button className="btn-secondary" onClick={prevStep}>{isGujarati ? 'પાછા' : 'Back'}</button>
                            <button className="btn-primary-medium" onClick={nextStep}>{isGujarati ? 'આગળ વધો' : 'Next Step'}</button>
                         </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                         <label>{isGujarati ? 'વધારે વિગત (વૈકલ્પિક)' : 'Special Requirements (Optional)'}</label>
                         <textarea 
                           name="requirements" 
                           placeholder={isGujarati ? 'હોટલ, ખાવાનું, કે કોઈ ખાસ બાબત...' : 'Hotel preference, Dietary needs, etc.'} 
                           value={formData.requirements} 
                           onChange={handleInput}
                           className="custom-textarea"
                         />
                          <div className="btn-row">
                             <button className="btn-secondary" onClick={prevStep}>{isGujarati ? 'પાછા' : 'Back'}</button>
                             <button disabled={loading} className="btn-primary-medium" onClick={handleCustomEnquiry}>
                                {loading ? 'Sending...' : (isGujarati ? 'ઈટિનરરી મેળવો' : 'Get Free Itinerary')} <Send size={16} />
                             </button>
                          </div>
                      </motion.div>
                    )}
                 </div>
              </div>

              <div className="form-info">
                 <div className="trust-badges">
                    {badges.map((badge, i) => (
                      <div key={i} className="trust-card">
                         <div className="trust-icon">{badge.icon}</div>
                         <p>{badge.text}</p>
                      </div>
                    ))}
                 </div>
                 <div className="why-custom card">
                    <h4>{isGujarati ? 'શા માટે કસ્ટમાઇઝ ટ્રીપ?' : 'Why Customize?'}</h4>
                    <ul>
                       <li>{isGujarati ? 'તમારા સમય મુજબ પ્રવાસ' : 'Flexible Dates & Itinerary'}</li>
                       <li>{isGujarati ? 'પસંદગી મુજબની હોટલ' : 'Your Choice of Hotels'}</li>
                       <li>{isGujarati ? 'પ્રાઈવેટ વાહન અને ગાઈડ' : 'Private Transport & Guide'}</li>
                       <li>{isGujarati ? 'કોઈ છુપાયેલ ખર્ચ નહીં' : 'Zero Hidden Costs'}</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default CustomPackage;
