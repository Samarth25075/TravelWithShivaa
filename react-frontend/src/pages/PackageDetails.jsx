import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, MapPin, CheckCircle, XCircle, Share2, Shield, CalendarCheck, Send, X, ArrowLeft, MessageSquare } from 'lucide-react';

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

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`packages/${id}`)
      .then(res => setPackageData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!packageData) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
       <div className="loader" style={{ width: '50px', height: '50px', border: '5px solid #eee', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
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
    const text = `*Booking Enquiry for Shiv Travel*%0A%0A*Package:* ${packageData.title}%0A*Price:* ₹${packageData.price.toLocaleString()}%0A%0A*Name:* ${enquiryForm.name}%0A*Message:* I'm interested in booking the ${packageData.title} package. Please share more details.`;
    window.open(`https://wa.me/${adminPhone}?text=${text}`, '_blank');
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'gallery', label: 'Gallery' }
  ];

  return (
    <main className="package-details-page" style={{ backgroundColor: '#fdfdfd', paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section className="detail-hero-premium" style={{
        height: '65vh',
        minHeight: '500px',
        background: `linear-gradient(rgba(0,0,0, 0.2), rgba(0,0,0, 0.8)), url("/api/uploads/${packageData.image}") no-repeat center center/cover`,
        display: 'flex',
        alignItems: 'flex-end',
        color: 'white',
        paddingBottom: '80px'
      }}>
        <div className="container">
          <Link to="/packages" className="btn-back-link" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'white', 
            textDecoration: 'none', 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            padding: '12px 25px', 
            borderRadius: '50px', 
            fontSize: '14px', 
            fontWeight: 800, 
            marginBottom: '40px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <ArrowLeft size={18} /> Back to All Tours
          </Link>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ textTransform: 'uppercase', fontWeight: 950, letterSpacing: '4px', color: 'var(--primary-orange)', fontSize: '14px' }}>{packageData.type}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }}></span>
              <span style={{ textTransform: 'uppercase', fontWeight: 900, letterSpacing: '4px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{packageData.location}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 950, lineHeight: 1, letterSpacing: '-3px', color: 'white' }}>{packageData.title}</h1>
          </motion.div>
        </div>
      </section>

      <section className="container" style={{ marginTop: '60px' }}>
        <div className="details-grid">
          <div className="main-content-area">
            {/* Tabs */}
            <div className="tabs-container">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === 'overview' && (
                  <div className="content-card">
                    <h2 className="content-title">Experience Highlights</h2>
                    <p className="content-text">{packageData.description}</p>
                    <div className="meta-info-grid">
                      <div className="meta-item duration">
                        <div className="meta-icon"><Clock size={24} /></div>
                        <div>
                          <p className="meta-label">Duration</p>
                          <p className="meta-value">{packageData.duration || '5 Days / 4 Nights'}</p>
                        </div>
                      </div>
                      <div className="meta-item group">
                        <div className="meta-icon"><Users size={24} /></div>
                        <div>
                          <p className="meta-label">Group Size</p>
                          <p className="meta-value">{packageData.group_size || 'Customizable'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'itinerary' && (
                  <div className="content-card">
                    <h2 className="content-title">Your Journey Plan</h2>
                    <div className="itinerary-list">
                      {packageData.itinerary ? packageData.itinerary.split('\n').map((line, i) => (
                        <div key={i} className="itinerary-item">
                           <div className="itinerary-dot"></div>
                           <p className="itinerary-line">{line}</p>
                        </div>
                      )) : "Detailed itinerary coming soon. Our travel experts are crafting the perfect schedule for you."}
                    </div>
                  </div>
                )}
                {activeTab === 'inclusions' && (
                  <div className="grid-2">
                    <div className="inclusion-card inclusions">
                      <h2 className="card-subtitle"><CheckCircle size={20} color="#10b981" /> Inclusions</h2>
                      <p className="inclusion-text">{packageData.inclusions || "Guided tours, Accommodation, Breakfast, Transfers included."}</p>
                    </div>
                    <div className="inclusion-card exclusions">
                      <h2 className="card-subtitle"><XCircle size={20} color="#ef4444" /> Exclusions</h2>
                      <p className="inclusion-text">{packageData.exclusions || "International flights, Personal expenses, Meals not mentioned."}</p>
                    </div>
                  </div>
                )}
                {activeTab === 'gallery' && (
                  <div className="gallery-grid">
                    {packageData.gallery && packageData.gallery.length > 0 ? (
                      packageData.gallery.map((img, idx) => (
                        <motion.div whileHover={{ scale: 1.05 }} key={idx} className="gallery-item">
                          <img src={`/api/uploads/${img.image_url}`} alt="" className="gallery-img" />
                        </motion.div>
                      ))
                    ) : (
                      <div className="empty-gallery" style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}>
                        <p>Beautiful moments from this destination will be updated soon.</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="booking-card">
              <p className="price-label">Experience starts from</p>
              <h3 className="price-tag">₹{packageData.price.toLocaleString()} <span className="price-sub">/ traveler</span></h3>
              
              <div className="sidebar-badges" style={{ marginBottom: '35px' }}>
                <div className="trust-badge-mini">
                  <Shield size={18} color="#ffcc00" />
                  <p>Verified Experience</p>
                </div>
                <div className="trust-badge-mini">
                  <CalendarCheck size={18} color="#ffcc00" />
                  <p>Flexible Booking</p>
                </div>
              </div>

              <button onClick={() => setShowEnquiryModal(true)} className="btn-booking">
                Plan My Journey
              </button>
              
              <button onClick={handleWhatsAppBook} className="btn-whatsapp-full" style={{ 
                width: '100%', 
                marginTop: '15px', 
                padding: '22px', 
                borderRadius: '20px', 
                backgroundColor: '#25D366', 
                color: 'white', 
                border: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px', 
                fontSize: '16px', 
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}>
                WhatsApp Booking <MessageSquare size={20} />
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {showEnquiryModal && (
          <div className="modal-overlay">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="modal-content">
              <button onClick={() => setShowEnquiryModal(false)} className="close-btn"><X size={24} /></button>

              {enquiryStatus === 'success' ? (
                <div className="success-state">
                  <div className="success-icon"><CheckCircle size={48} /></div>
                  <h3>Request Sent!</h3>
                  <p>Our specialists will reach out to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="modal-title">Book This Adventure</h2>
                  <p className="modal-sub">Tell us your preferences and we'll handle the rest.</p>

                  <form onSubmit={handleEnquirySubmit} className="enquiry-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input required value={enquiryForm.name} onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})} type="text" placeholder="Your Name" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input required value={enquiryForm.email} onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})} type="email" placeholder="email@example.com" />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input value={enquiryForm.phone} onChange={e => setEnquiryForm({...enquiryForm, phone: e.target.value})} type="tel" placeholder="+91..." />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Questions / Special Requests</label>
                      <textarea required value={enquiryForm.message} onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})} rows="4" placeholder="How can we make this trip special for you?"></textarea>
                    </div>
                    <button type="submit" disabled={enquiryStatus === 'loading'} className="btn btn-submit">
                      {enquiryStatus === 'loading' ? 'Processing...' : 'Send Enquiry Request'}
                    </button>
                    {enquiryStatus === 'error' && <p className="error-msg">Something went wrong. Please try again.</p>}
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
