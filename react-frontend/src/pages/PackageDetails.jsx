import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, MapPin, CheckCircle, XCircle, Share2, Shield, CalendarCheck, Send, X } from 'lucide-react';

const PackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState('idle'); // idle, loading, success, error
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    axios.get(`/api/packages/${id}`)
      .then(res => setPackageData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!packageData) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryStatus('loading');
    try {
      await axios.post('/api/enquiries', {
        ...enquiryForm,
        package_id: parseInt(id),
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

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'gallery', label: 'Gallery' }
  ];

  return (
    <main>
      {/* Hero */}
      <section style={{
        height: '50vh',
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url("/api/uploads/${packageData.image}") no-repeat center center/cover`,
        display: 'flex',
        alignItems: 'center',
        color: 'white'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ textTransform: 'uppercase', fontWeight: 800, letterSpacing: '3px', color: 'var(--primary)', marginBottom: '15px' }}>{packageData.location}</p>
          <h1 style={{ fontSize: '64px', fontWeight: 900, textShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>{packageData.title}</h1>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 0 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px' }}>
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '40px', borderBottom: '2px solid #f1f5f9', marginBottom: '40px' }}>
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '20px 0',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                    borderBottom: activeTab === tab.id ? '4px solid var(--primary)' : '4px solid transparent',
                    cursor: 'pointer',
                    transition: '0.3s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '30px' }}>Adventure Highlights</h2>
                    <p style={{ fontSize: '18px', color: '#4b5563', marginBottom: '45px', lineHeight: '1.8' }}>{packageData.description}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '30px', backgroundColor: '#fdfcf0', border: '1px solid #f9f0c5', borderRadius: '24px' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Clock size={28} /></div>
                        <div>
                          <p style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, letterSpacing: '1px' }}>Duration</p>
                          <p style={{ fontWeight: 900, fontSize: '20px' }}>{packageData.duration || 'Flexible'}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '30px', backgroundColor: '#f0f9ff', border: '1px solid #e0f2fe', borderRadius: '24px' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: '#0ea5e9', color: 'white', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={28} /></div>
                        <div>
                          <p style={{ fontSize: '14px', textTransform: 'uppercase', fontWeight: 800, opacity: 0.5, letterSpacing: '1px' }}>Group Size</p>
                          <p style={{ fontWeight: 900, fontSize: '20px' }}>{packageData.group_size || 'Selectable'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'itinerary' && (
                  <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '30px' }}>Your Journey Plan</h2>
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '18px', color: '#4b5563', lineHeight: '2', position: 'relative', paddingLeft: '30px', borderLeft: '3px solid #eee' }}>
                      {packageData.itinerary || "Detailed itinerary coming soon. Contact us for more information."}
                    </div>
                  </div>
                )}
                {activeTab === 'inclusions' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(16, 185, 129, 0.05)', borderTop: '8px solid #10b981' }}>
                      <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle color="#10b981" weight="bold" /> Inclusions</h2>
                      <div style={{ whiteSpace: 'pre-wrap', fontSize: '17px', color: '#4b5563', lineHeight: '1.8' }}>
                        {packageData.inclusions || "Contact us for list of inclusions."}
                      </div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(239, 68, 68, 0.05)', borderTop: '8px solid #ef4444' }}>
                      <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}><XCircle color="#ef4444" weight="bold" /> Exclusions</h2>
                      <div style={{ whiteSpace: 'pre-wrap', fontSize: '17px', color: '#4b5563', lineHeight: '1.8' }}>
                        {packageData.exclusions || "Contact us for list of exclusions."}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'gallery' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
                    {packageData.gallery && packageData.gallery.length > 0 ? (
                      packageData.gallery.map((img, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          key={idx} 
                          style={{ borderRadius: '24px', overflow: 'hidden', height: '240px', cursor: 'zoom-in', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                          whileHover={{ y: -10, scale: 1.02 }}
                        >
                          <img src={`/api/uploads/${img.image_url}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </motion.div>
                      ))
                    ) : (
                      <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', color: 'var(--text-muted)', background: '#f8fafc', borderRadius: '30px', border: '2px dashed #eee' }}>Explore our beautiful moments coming soon.</p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <aside>
            <div style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '50px', borderRadius: '30px', position: 'sticky', top: '100px', boxShadow: '0 30px 60px rgba(15, 23, 42, 0.2)' }}>
              <p style={{ textTransform: 'uppercase', fontSize: '14px', fontWeight: 800, opacity: 0.6, marginBottom: '10px', letterSpacing: '2px' }}>Starting Price</p>
              <h3 style={{ fontSize: '48px', fontWeight: 900 }}>₹{packageData.price.toLocaleString()} <span style={{ fontSize: '18px', opacity: 0.5, fontWeight: 400 }}>/ person</span></h3>
              
              <div style={{ margin: '35px 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Shield size={20} color="var(--primary)" /></div>
                  <p style={{ fontSize: '15px', fontWeight: 600 }}>Best Price Guarantee</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CalendarCheck size={20} color="var(--primary)" /></div>
                  <p style={{ fontSize: '15px', fontWeight: 600 }}>Zero Booking Fees</p>
                </div>
              </div>

              <button 
                onClick={() => setShowEnquiryModal(true)}
                className="btn" 
                style={{ width: '100%', padding: '22px', borderRadius: '18px', fontSize: '18px', fontWeight: 900, boxShadow: '0 10px 25px rgba(255, 126, 95, 0.3)', transition: '0.3s' }}
              >
                Plan My Journey
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {showEnquiryModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{ backgroundColor: 'white', padding: '50px', borderRadius: '35px', width: '550px', maxWidth: '90%', position: 'relative' }}
            >
              <button 
                onClick={() => setShowEnquiryModal(false)}
                style={{ position: 'absolute', top: '30px', right: '30px', border: 'none', background: '#f1f5f9', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>

              {enquiryStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '80px', height: '80px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                    <CheckCircle size={40} />
                  </div>
                  <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '15px' }}>Thank You!</h2>
                  <p style={{ color: '#64748b', fontSize: '16px' }}>Your enquiry has been sent successfully. Our team will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '10px' }}>Enquire Now</h2>
                  <p style={{ color: '#64748b', marginBottom: '35px' }}>Let us know your details, and we'll craft the perfect experience for you.</p>

                  <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '8px', display: 'block' }}>Full Name</label>
                      <input 
                        required 
                        value={enquiryForm.name}
                        onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})}
                        type="text" placeholder="John Doe" 
                        style={{ width: '100%', padding: '15px 20px', borderRadius: '14px', border: '2px solid #f1f5f9', fontSize: '16px', outline: 'none', transition: '0.3s' }} 
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '8px', display: 'block' }}>Email</label>
                        <input 
                          required 
                          value={enquiryForm.email}
                          onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})}
                          type="email" placeholder="john@example.com" 
                          style={{ width: '100%', padding: '15px 20px', borderRadius: '14px', border: '2px solid #f1f5f9', fontSize: '16px', outline: 'none' }} 
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '8px', display: 'block' }}>Phone</label>
                        <input 
                          value={enquiryForm.phone}
                          onChange={e => setEnquiryForm({...enquiryForm, phone: e.target.value})}
                          type="tel" placeholder="+91 00000 00000" 
                          style={{ width: '100%', padding: '15px 20px', borderRadius: '14px', border: '2px solid #f1f5f9', fontSize: '16px', outline: 'none' }} 
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', fontWeight: 800, color: '#64748b', marginBottom: '8px', display: 'block' }}>Message</label>
                      <textarea 
                        required 
                        value={enquiryForm.message}
                        onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})}
                        rows="4" placeholder="Tell us about your travel plans..." 
                        style={{ width: '100%', padding: '15px 20px', borderRadius: '14px', border: '2px solid #f1f5f9', fontSize: '16px', outline: 'none', resize: 'none' }}
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={enquiryStatus === 'loading'}
                      className="btn" 
                      style={{ padding: '18px', borderRadius: '16px', fontSize: '16px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                      {enquiryStatus === 'loading' ? 'Sending...' : <>Send Request <Send size={18} /></>}
                    </button>
                    {enquiryStatus === 'error' && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>Oops! Something went wrong. Please try again.</p>}
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
