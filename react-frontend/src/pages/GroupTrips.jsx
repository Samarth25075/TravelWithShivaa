import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, CheckCircle, ArrowRight, IndianRupee, Clock } from 'lucide-react';

const GroupTrips = ({ isGujarati }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    { title: isGujarati ? 'બ્રાઉઝ કરો' : 'Browse', desc: isGujarati ? 'તમારી પસંદગી મુજબ ટ્રિપ્સ શોધો' : 'Explore our upcoming group departures.' },
    { title: isGujarati ? 'સીટ બુક કરો' : 'Book Your Seat', desc: isGujarati ? 'માત્ર ₹5000 થી તમારી સીટ બુક કરો' : 'Reserve your spot with a minimal token.' },
    { title: isGujarati ? 'અમે બધું સંભાળીશું' : 'We Handle Everything', desc: isGujarati ? 'મુસાફરીની ચિંતા અમને છોડો' : 'Logistics, stays, and permits are on us.' },
    { title: isGujarati ? 'મુસાફરી કરો' : 'You Travel & Enjoy', desc: isGujarati ? 'નવા મિત્રો સાથે યાદો બનાવો' : 'Go solo or with friends, return with a family.' }
  ];

  return (
    <div className="group-trips-page">
      <header className="page-header">
        <div className="container">
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="page-title"
          >
            {isGujarati ? 'ગ્રુપ ટ્રિપ્સ' : 'Fixed Departure Group Trips'}
          </motion.h1>
          <p className="page-subtitle">
            {isGujarati ? 'નવા મિત્રો બનાવો અને અજાણ્યા રસ્તાઓ શોધો.' : 'Travel with like-minded explorers and make lifelong memories.'}
          </p>
        </div>
      </header>

      {/* How it works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">{isGujarati ? 'ગ્રુપ ટ્રિપ્સ કેવી રીતે કામ કરે છે?' : 'How Group Trips Work'}</h2>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step-card">
                 <div className="step-number">{i + 1}</div>
                 <h3>{step.title}</h3>
                 <p>{step.desc}</p>
                 {i < 3 && <div className="step-arrow"><ArrowRight size={20} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Listings */}
      <section className="trip-listings">
        <div className="container">
          <div className="listings-header">
            <h3>{isGujarati ? 'આગામી ટ્રિપ્સ' : 'Upcoming Departures'}</h3>
             <div className="sale-badge">
               <Clock size={16} /> {isGujarati ? 'વહેલી બુકિંગ પર છૂટ!' : 'Early Bird Discount: Book 60 days ahead!'}
             </div>
          </div>
          
          <div className="trips-grid">
            {loading ? <p>Loading trips...</p> : trips.map(trip => (
              <div key={trip.id} className="trip-card-vertical card">
                <div className="trip-img">
                   <img src={`/api/uploads/${trip.image}`} alt={trip.title} />
                   <div className="seats-tag">
                      {isGujarati ? `માત્ર ${trip.seats} સીટ બાકી!` : `Only ${trip.seats} seats left!`}
                   </div>
                </div>

                <div className="trip-details">
                   <h3>{trip.title}</h3>
                   <div className="meta-row">
                      <span><Calendar size={14} /> {trip.date}</span>
                      <span><Users size={14} /> Group Size: 12-15</span>
                   </div>
                   <div className="price-row">
                      <div className="price">
                        <span className="from">{isGujarati ? 'શરૂઆત' : 'Starts from'}</span>
                        <span className="amt"><IndianRupee size={20} />{trip.price}</span>
                      </div>
                      <button className="btn-secondary">{isGujarati ? 'વિગતો જુઓ' : 'View Details'}</button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default GroupTrips;
