import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, MapPin, CheckCircle, XCircle, Share2, Shield, CalendarCheck, Send, X, ArrowLeft, MessageSquare, Star, Sparkles, Map, Heart } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const PackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState('idle'); 
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const { getImageUrl } = useSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`packages/${id}`)
      .then(res => setPackageData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!packageData) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
       <div className="loader-gold"></div>
    </div>
  );

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryStatus('loading');
    try {
      await axios.post('enquiries', {
        ...enquiryForm,
        package_id: id,
        subject: `Booking Enquiry: ${packageData.title}`
      });
      setEnquiryStatus('success');
      setTimeout(() => {
        setShowEnquiryModal(false);
        setEnquiryStatus('idle');
        setEnquiryForm({ name: '', email: '', phone: '', message: '' });
      }, 2000);
    } catch (err) {
      console.error(err);
      setEnquiryStatus('error');
    }
  };

  const handleWhatsAppBook = () => {
    const adminPhone = "919313634723";
    const text = `*Booking Enquiry for TravelBookShiva*%0A%0A*Package:* ${packageData.title}%0A*Price:* ₹${packageData.price.toLocaleString()}%0A%0AMessage: I am interested in this luxury experience. Please share more details.`;
    window.open(`https://wa.me/${adminPhone}?text=${text}`, '_blank');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Sparkles size={16} /> },
    { id: 'itinerary', label: 'Itinerary', icon: <Map size={16} /> },
    { id: 'inclusions', label: 'Highlights', icon: <CheckCircle size={16} /> },
    { id: 'gallery', label: 'Gallery', icon: <Share2 size={16} /> }
  ];

  return (
    <main className="package-details-page" style={{ backgroundColor: '#050505', paddingBottom: '120px', color: 'white' }}>
      {/* Immersive Hero Section */}
      <section className="relative h-[80vh] flex items-end overflow-hidden" style={{ height: '80vh', position: 'relative', display: 'flex', alignItems: 'flex-end', paddingBottom: '80px' }}>
        <div 
          style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            background: `linear-gradient(rgba(0,0,0,0.1) 0%, rgba(5,5,5,1) 95%), url("${getImageUrl(packageData.image)}") no-repeat center center/cover`,
            zIndex: 0
          }}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <Link to="/packages" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'white', textDecoration: 'none', 
            background: 'rgba(255,255,255,0.05)', padding: '14px 28px', borderRadius: '50px', fontSize: '14px', 
            fontWeight: 800, marginBottom: '50px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', transition: '0.3s'
          }} className="hover-gold">
            <ArrowLeft size={20} /> Browse Destinations
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ textTransform: 'uppercase', fontWeight: 900, letterSpacing: '4px', color: 'var(--primary-gold)', fontSize: '13px' }}>{packageData.type}</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-gold)', opacity: 0.5 }}></span>
              <span style={{ textTransform: 'uppercase', fontWeight: 800, letterSpacing: '4px', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>{packageData.location}</span>
            </div>
            <h1 style={{ 
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 10vw, 100px)', fontWeight: 950, 
              lineHeight: 1, letterSpacing: '-4px', color: 'white', marginBottom: '30px' 
            }}>{packageData.title}</h1>
            
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Star fill="var(--primary-gold)" color="var(--primary-gold)" size={20} />
                  <span style={{ fontSize: '18px', fontWeight: 900 }}>4.92 <span style={{ opacity: 0.5, fontWeight: 600, fontSize: '14px' }}>(124 Verified Reviews)</span></span>
               </div>
               <button style={{ background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>
                  <Heart size={20} /> Save to Wishlist
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '50px' }} className="mobile-stack">
          <div className="main-content-area">
            {/* Elegant Tabs */}
            <div style={{ 
              display: 'flex', gap: '10px', padding: '10px', background: 'rgba(255,255,255,0.03)', 
              borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '50px' 
            }}>
              {tabs.map(tab => (
                <button 
                  key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ 
                    flex: 1, padding: '16px 20px', borderRadius: '16px', border: 'none',
                    background: activeTab === tab.id ? 'var(--gradient-gold)' : 'transparent',
                    color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.6)',
                    fontWeight: 900, cursor: 'pointer', transition: '0.4s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '13px', textTransform: 'uppercase'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {activeTab === 'overview' && (
                  <div style={{ padding: '0 10px' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 900, marginBottom: '30px', color: 'var(--primary-gold)' }}>Curated Experience</h2>
                    <p style={{ fontSize: '18px', lineHeight: 1.8, opacity: 0.7, marginBottom: '50px', fontWeight: 500 }}>{packageData.description}</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                      <div style={{ background: '#111', padding: '30px', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.05)' }}>
                         <Clock size={32} color="var(--primary-gold)" style={{ marginBottom: '20px' }} />
                         <p style={{ fontSize: '12px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', marginBottom: '5px' }}>DURATION</p>
                         <p style={{ fontSize: '20px', fontWeight: 800 }}>{packageData.duration || '5 Days / 4 Nights'}</p>
                      </div>
                      <div style={{ background: '#111', padding: '30px', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.05)' }}>
                         <Users size={32} color="var(--primary-gold)" style={{ marginBottom: '20px' }} />
                         <p style={{ fontSize: '12px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', marginBottom: '5px' }}>GROUP SIZE</p>
                         <p style={{ fontSize: '20px', fontWeight: 800 }}>{packageData.group_size || 'Bespoke Private Group'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 900, marginBottom: '40px', color: 'var(--primary-gold)' }}>The Expedition Path</h2>
                    <div style={{ position: 'relative', paddingLeft: '40px' }}>
                      <div style={{ position: 'absolute', top: 0, left: '6px', bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--primary-gold), transparent)' }}></div>
                      {packageData.itinerary ? packageData.itinerary.split('\n').map((line, i) => (
                        <div key={i} style={{ position: 'relative', marginBottom: '40px' }}>
                           <div style={{ position: 'absolute', top: '8px', left: '-40px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary-gold)', border: '4px solid #050505', zIndex: 2 }}></div>
                           <p style={{ fontSize: '18px', fontWeight: 600, color: 'white', lineHeight: 1.6 }}>{line}</p>
                        </div>
                      )) : <p style={{ opacity: 0.6 }}>Full itinerary details are shared upon personalized consultation.</p>}
                    </div>
                  </div>
                )}

                {activeTab === 'inclusions' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '25px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CheckCircle size={24} /> PRIVILEGES
                      </h3>
                      <p style={{ fontSize: '16px', lineHeight: 1.8, opacity: 0.8, fontWeight: 500 }}>{packageData.inclusions || "Guided tours, Ultra-Luxury Accommodation, Premium Breakfast, Private Transfers."}</p>
                    </div>
                    <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '25px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <XCircle size={24} /> CONSIDERATIONS
                      </h3>
                      <p style={{ fontSize: '16px', lineHeight: 1.8, opacity: 0.8, fontWeight: 500 }}>{packageData.exclusions || "International First-Class Flights, Personal Concierge requests, Optional Expeditions."}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {packageData.gallery && packageData.gallery.length > 0 ? (
                      packageData.gallery.map((img, idx) => (
                        <motion.div whileHover={{ scale: 1.05, rotate: 1 }} key={idx} style={{ borderRadius: '24px', overflow: 'hidden', height: '280px' }}>
                          <img src={getImageUrl(img.image_url)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </motion.div>
                      ))
                    ) : (
                      <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0', background: '#111', borderRadius: '32px', opacity: 0.6 }}>
                        <Sparkles size={48} style={{ marginBottom: '20px', color: 'var(--primary-gold)' }} />
                        <p>Destination impressions updated seasonally.</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Luxury Sidebar */}
          <aside>
            <div style={{ 
              position: 'sticky', top: '120px', background: 'rgba(255, 255, 255, 0.03)', 
              backdropFilter: 'blur(30px)', borderRadius: '40px', padding: '45px', 
              border: '1px solid rgba(255, 215, 0, 0.15)', boxShadow: '0 40px 100px rgba(0,0,0,0.5)' 
            }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>EXPERIENCE VALUE</span>
              <h3 style={{ fontSize: '42px', fontWeight: 950, color: 'white', marginBottom: '8px' }}>₹{packageData.price.toLocaleString()}</h3>
              <p style={{ fontSize: '14px', fontWeight: 600, opacity: 0.5, marginBottom: '40px' }}>per guest • elite hospitality included</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '15px 20px', borderRadius: '18px' }}>
                  <Shield size={22} color="var(--primary-gold)" />
                  <p style={{ fontSize: '14px', fontWeight: 800 }}>Platinum Coverage</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '15px 20px', borderRadius: '18px' }}>
                  <CalendarCheck size={22} color="var(--primary-gold)" />
                  <p style={{ fontSize: '14px', fontWeight: 800 }}>Seamless Changes</p>
                </div>
              </div>

              <button onClick={() => setShowEnquiryModal(true)} style={{ 
                width: '100%', padding: '22px', borderRadius: '50px', border: 'none',
                background: 'var(--gradient-gold)', color: 'black', fontSize: '16px', fontWeight: 950,
                textTransform: 'uppercase', letterSpacing: '2px', boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)',
                cursor: 'pointer', transition: '0.4s', marginBottom: '20px'
              }} className="btn-hover-scale">
                Request Invitation
              </button>
              
              <button onClick={handleWhatsAppBook} style={{ 
                width: '100%', padding: '22px', borderRadius: '50px', border: '1px solid rgba(37, 211, 102, 0.4)',
                background: 'rgba(37, 211, 102, 0.05)', color: '#25D366', fontSize: '14px', fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', transition: '0.4s'
              }} className="hover-wa">
                Consult Concierge <MessageSquare size={18} />
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Luxury Enquiry Modal */}
      <AnimatePresence>
        {showEnquiryModal && (
          <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} 
              style={{ background: '#111', width: '100%', maxWidth: '650px', borderRadius: '40px', padding: '60px', position: 'relative', border: '1px solid rgba(255,215,0,0.2)' }}
            >
              <button onClick={() => setShowEnquiryModal(false)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.5 }}><X size={32} /></button>

              {enquiryStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
                     <CheckCircle size={56} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 900, color: 'white', marginBottom: '15px' }}>Request Received</h2>
                  <p style={{ opacity: 0.6, fontSize: '18px' }}>Our Elite Concierge team will contact you within the hour.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', fontWeight: 950, color: 'white', marginBottom: '10px' }}>Begin Your Journey</h2>
                  <p style={{ opacity: 0.5, fontSize: '16px', marginBottom: '45px' }}>Share your vision with us, and we will tailor this expedition to perfection.</p>

                  <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
                       <div className="luxury-input-group">
                          <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '2px', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Distinguished Name</label>
                          <input required value={enquiryForm.name} onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})} type="text" placeholder="Full legal name" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px 25px', borderRadius: '18px', color: 'white', fontSize: '16px', outline: 'none' }} />
                       </div>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="mobile-stack">
                          <div className="luxury-input-group">
                             <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '2px', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Electronic Mail</label>
                             <input required value={enquiryForm.email} onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})} type="email" placeholder="email@address.com" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px 25px', borderRadius: '18px', color: 'white', fontSize: '16px', outline: 'none' }} />
                          </div>
                          <div className="luxury-input-group">
                             <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '2px', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Contact Number</label>
                             <input value={enquiryForm.phone} onChange={e => setEnquiryForm({...enquiryForm, phone: e.target.value})} type="tel" placeholder="+91..." style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px 25px', borderRadius: '18px', color: 'white', fontSize: '16px', outline: 'none' }} />
                          </div>
                       </div>
                    </div>
                    <div className="luxury-input-group">
                       <label style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '2px', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Bespoke Requests</label>
                       <textarea required value={enquiryForm.message} onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})} rows="4" placeholder="Share your travel preferences or special occasions..." style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px 25px', borderRadius: '18px', color: 'white', fontSize: '16px', outline: 'none', resize: 'none' }}></textarea>
                    </div>
                    <button type="submit" disabled={enquiryStatus === 'loading'} style={{ 
                      width: '100%', padding: '22px', borderRadius: '50px', border: 'none',
                      background: 'var(--gradient-gold)', color: 'black', fontSize: '16px', fontWeight: 950,
                      textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', transition: '0.4s', marginTop: '10px'
                    }}>
                      {enquiryStatus === 'loading' ? 'Encrypting Request...' : 'Finalize Reservation Request'}
                    </button>
                    {enquiryStatus === 'error' && <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>Submission encountered an error. Please try again.</p>}
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PackageDetails;
