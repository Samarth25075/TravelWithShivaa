import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit, Trash, CheckCircle, XCircle, Search, 
  MessageSquare, Package as PackageIcon, Clock, 
  User, Users, Phone, Mail, RotateCcw, Image as ImageIcon,
  LayoutDashboard, TrendingUp, Calendar, ChevronRight,
  Sparkles, BookOpen, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { useSettings } from '../../context/SettingsContext';

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [groupTrips, setGroupTrips] = useState([]);
  const [stats, setStats] = useState({ 
    total_packages: 0, 
    total_enquiries: 0, 
    active_packages: 0, 
    new_enquiries: 0,
    total_blogs: 0,
    total_group_trips: 0
  });
  const [homeImages, setHomeImages] = useState([]);
  const [instaPosts, setInstaPosts] = useState([]);
  const [siteLogo, setSiteLogo] = useState('/logo.png');
  const [activeTab, setActiveTab] = useState('packages');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { refreshSettings } = useSettings();

  const navigate = useNavigate();
  const location = useLocation();

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('http') || image.startsWith('/')) return image;
    return `/api/uploads/${image}`;
  };

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    description: '',
    itinerary: '',
    inclusions: '',
    exclusions: '',
    duration: '5 Days / 4 Nights',
    group_size: 'Selectable',
    image: '',
    status: true,
    is_popular: false,
    type: 'Mountain',
    difficulty: 'Moderate',
    rating: 4.8,
    tag: 'Trending',
    gallery: []
  });

  const [blogFormData, setBlogFormData] = useState({
    title: '', 
    category: 'Mountains', 
    description: '', 
    content: '', 
    image: '', 
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), 
    reading_time: '10 min read'
  });

  const [tripFormData, setTripFormData] = useState({
    title: '', 
    date: '', 
    seats: 12, 
    price: '', 
    image: '', 
    status: 'upcoming', 
    group_size: '12-15'
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }

    // Sync tab with URL
    const path = location.pathname;
    if (path.includes('/enquiries')) setActiveTab('enquiries');
    else if (path.includes('/packages')) setActiveTab('packages');
    else if (path.includes('/blogs')) setActiveTab('blogs');
    else if (path.includes('/group-trips')) setActiveTab('group-trips');
    else if (path.includes('/home-carousel')) setActiveTab('home-carousel');
    else if (path.includes('/insta-feed')) setActiveTab('insta-feed');
    else if (path.includes('/branding')) setActiveTab('branding');
    else if (path.includes('/dashboard')) setActiveTab('dashboard');
    else setActiveTab('packages');

    fetchData();
  }, [location.pathname]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pkgsRes, enqRes, statsRes, blogsRes, tripsRes] = await Promise.all([
        axios.get('admin/packages'),
        axios.get('admin/enquiries'),
        axios.get('admin/stats'),
        axios.get('blogs'),
        axios.get('group-trips')
      ]);
      setPackages(pkgsRes.data);
      setEnquiries(enqRes.data);
      setStats(statsRes.data);
      setBlogs(blogsRes.data);
      setGroupTrips(tripsRes.data);
      
      const homeImagesRes = await axios.get('settings/home-images');
      setHomeImages(homeImagesRes.data.images);

      const instaRes = await axios.get('settings/insta-posts');
      setInstaPosts(instaRes.data.images);

      const logoRes = await axios.get('settings/logo');
      setSiteLogo(logoRes.data.logo_url);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const res = await axios.post('upload', uploadFormData);
      const filename = res.data.filename;
      if (activeTab === 'packages') {
         if (field === 'main') setFormData({ ...formData, image: filename });
      } else if (activeTab === 'blogs') {
         setBlogFormData({ ...blogFormData, image: filename });
      } else if (activeTab === 'group-trips') {
         setTripFormData({ ...tripFormData, image: filename });
      } else if (activeTab === 'home-carousel') {
         const newImages = [...homeImages];
         newImages[field] = filename;
         setHomeImages(newImages);
      } else if (activeTab === 'insta-feed') {
         const newImages = [...instaPosts];
         newImages[field] = filename;
         setInstaPosts(newImages);
      } else if (activeTab === 'branding') {
         setSiteLogo(filename);
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (const file of files) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      try {
        const res = await axios.post('upload', uploadFormData);
        setFormData(prev => ({
          ...prev,
          gallery: [...prev.gallery, res.data.filename]
        }));
      } catch (err) {
        console.error('Gallery upload failed', err);
      }
    }
  };

  const handleRemoveGalleryImage = (index) => {
    const newGallery = [...formData.gallery];
    newGallery.splice(index, 1);
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'packages') {
        const payload = { ...formData, price: parseFloat(formData.price) };
        if (editingItem) await axios.put(`admin/packages/${editingItem.id}`, payload);
        else await axios.post('admin/packages', payload);
      } else if (activeTab === 'blogs') {
        if (editingItem) await axios.put(`admin/blogs/${editingItem.id}`, blogFormData);
        else await axios.post('admin/blogs', blogFormData);
      } else if (activeTab === 'group-trips') {
        const payload = { ...tripFormData, price: parseFloat(tripFormData.price) };
        if (editingItem) await axios.put(`admin/group-trips/${editingItem.id}`, payload);
        else await axios.post('admin/group-trips', payload);
      }
      
      setShowModal(false);
      setEditingItem(null);
      resetForms();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this permanently? This action cannot be undone.')) {
      try {
        let endpoint = '';
        if (activeTab === 'packages') endpoint = `admin/packages/${id}`;
        else if (activeTab === 'blogs') endpoint = `admin/blogs/${id}`;
        else if (activeTab === 'group-trips') endpoint = `admin/group-trips/${id}`;
        
        await axios.delete(endpoint);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      await axios.put(`admin/enquiries/${id}?status=${status}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForms = () => {
    setFormData({
      title: '', location: '', price: '', description: '', itinerary: '', inclusions: '', exclusions: '',
      duration: '5 Days / 4 Nights', group_size: 'Selectable', image: '', status: true, is_popular: false, 
      type: 'Mountain', difficulty: 'Moderate', rating: 4.8, tag: 'Trending', gallery: []
    });
    setBlogFormData({ 
      title: '', category: 'Mountains', description: '', content: '', image: '', 
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), 
      reading_time: '10 min read' 
    });
    setTripFormData({ 
      title: '', date: '', seats: 12, price: '', image: '', status: 'upcoming', group_size: '12-15' 
    });
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    if (activeTab === 'packages') {
      setFormData({
        ...item,
        itinerary: item.itinerary || '',
        inclusions: item.inclusions || '',
        exclusions: item.exclusions || '',
        duration: item.duration || '5 Days / 4 Nights',
        group_size: item.group_size || 'Selectable',
        gallery: item.gallery ? item.gallery.map(img => img.image_url || img) : []
      });
    } else if (activeTab === 'blogs') {
      setBlogFormData({ ...item });
    } else if (activeTab === 'group-trips') {
      setTripFormData({ ...item });
    }
    setShowModal(true);
  };

  const handleSaveHomeCarousel = async () => {
    try {
      await axios.post('settings/home-images', homeImages);
      alert('Home carousel images updated successfully!');
    } catch (error) {
      console.error('Failed to save home images', error);
      alert('Failed to save images. Check console.');
    }
  };

  const renderHomeCarouselManager = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '40px' }}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div 
          whileHover={{ y: -10 }}
          key={index} 
          style={{ backgroundColor: 'white', padding: '35px', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 900, color: 'var(--primary-black)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Slide #{index + 1}
            </h4>
            {homeImages[index] && (
              <span style={{ fontSize: '10px', background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '50px', fontWeight: 900 }}>ACTIVE</span>
            )}
          </div>
          
          <div style={{ 
            height: '240px', borderRadius: '28px', background: '#fcfaf7', marginBottom: '25px', 
            overflow: 'hidden', border: '2px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', transition: '0.3s'
          }} className="admin-img-box">
            {homeImages[index] ? (
              <>
                <img src={getImageUrl(homeImages[index])} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Carousel ${index}`} />
                <div className="img-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', opacity: 0, transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <ImageIcon color="white" size={32} />
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <ImageIcon size={48} style={{ opacity: 0.1, marginBottom: '15px' }} />
                <p style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>NO IMAGE CONFIGURED</p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <label style={{ 
              flex: 1, padding: '18px', borderRadius: '20px', background: 'var(--primary-black)', 
              color: 'white', textAlign: 'center', fontWeight: 800, cursor: 'pointer', fontSize: '13px',
              transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
            }}>
               <Edit size={16} /> {homeImages[index] ? 'Replace Image' : 'Upload Image'}
               <input type="file" hidden onChange={(e) => handleImageUpload(e, index)} />
            </label>
            {homeImages[index] && (
              <button 
                onClick={() => {
                  const next = [...homeImages];
                  next[index] = '';
                  setHomeImages(next);
                }}
                style={{ padding: '18px', borderRadius: '20px', background: '#fef2f2', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash size={18} />
              </button>
            )}
          </div>
        </motion.div>
      ))}
      <div style={{ gridColumn: '1/-1', marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
         <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveHomeCarousel} 
          style={{ 
            padding: '24px 80px', borderRadius: '100px', fontSize: '18px', fontWeight: 950, 
            display: 'flex', alignItems: 'center', gap: '15px', background: 'var(--gradient-gold)',
            color: 'black', border: 'none', cursor: 'pointer', boxShadow: '0 20px 40px rgba(212, 175, 55, 0.3)'
          }}
         >
            <CheckCircle size={24} /> Sync Carousel to Website
         </motion.button>
      </div>
    </div>
  );

  const handleSaveInstaFeed = async () => {
    try {
      await axios.post('settings/insta-posts', instaPosts);
      alert('Instagram feed images updated successfully!');
    } catch (error) {
      console.error('Failed to save insta images', error);
      alert('Failed to save images.');
    }
  };

  const renderInstaFeedManager = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <motion.div 
          whileHover={{ y: -5 }}
          key={index} 
          style={{ backgroundColor: 'white', padding: '25px', borderRadius: '32px', boxShadow: '0 15px 30px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Feed Slot {index + 1}</h4>
            <span style={{ color: 'var(--primary-orange)' }}><ImageIcon size={16} /></span>
          </div>
          
          <div style={{ 
            aspectRatio: '1/1', borderRadius: '24px', background: '#f8fafc', marginBottom: '20px', 
            overflow: 'hidden', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}>
            {instaPosts[index] ? (
              <img src={getImageUrl(instaPosts[index])} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Post ${index}`} />
            ) : (
              <div style={{ opacity: 0.1, textAlign: 'center' }}>
                <ImageIcon size={40} />
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <label style={{ 
              flex: 1, padding: '15px', borderRadius: '16px', background: 'var(--primary-black)', 
              color: 'white', textAlign: 'center', fontWeight: 800, cursor: 'pointer', fontSize: '13px' 
            }}>
               Change Image
               <input type="file" hidden onChange={(e) => handleImageUpload(e, index)} />
            </label>
            {instaPosts[index] && (
              <button 
                onClick={() => {
                  const next = [...instaPosts];
                  next[index] = '';
                  setInstaPosts(next);
                }}
                style={{ width: '50px', borderRadius: '16px', background: '#fef2f2', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash size={18} />
              </button>
            )}
          </div>
        </motion.div>
      ))}
      <div style={{ gridColumn: '1/-1', marginTop: '40px', textAlign: 'center' }}>
         <motion.button 
          whileHover={{ scale: 1.02 }}
          onClick={handleSaveInstaFeed} 
          style={{ 
            padding: '22px 60px', borderRadius: '100px', fontSize: '16px', fontWeight: 900, 
            display: 'flex', alignItems: 'center', gap: '15px', background: '#111',
            color: 'white', border: 'none', cursor: 'pointer', margin: '0 auto'
          }}
         >
            <CheckCircle size={20} /> Update Instagram Portfolio
         </motion.button>
      </div>
    </div>
  );
  
  const handleSaveBranding = async () => {
    try {
      await axios.post('settings/logo', { logo_url: siteLogo });
      refreshSettings(); // Instant update in Navbar/Sidebar
      alert('Site logo updated successfully! Some changes might require a page refresh.');
    } catch (error) {
      console.error('Failed to save logo', error);
      alert('Failed to save logo.');
    }
  };

  const renderBrandingManager = () => (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '35px' }}>
           <div style={{ padding: '15px', background: 'var(--gradient-gold)', borderRadius: '18px', color: 'black' }}><LayoutDashboard size={24} /></div>
           <h3 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--primary-black)' }}>Global Branding</h3>
        </div>

        <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '16px', lineHeight: 1.6 }}>
          Set your brand's signature mark. This logo will appear on the navigation bar, footer, and all official client-facing touchpoints.
        </p>
        
        <div style={{ 
          display: 'grid', gridTemplateColumns: '300px 1fr', gap: '50px', alignItems: 'center', 
          background: '#fcfaf7', padding: '40px', borderRadius: '32px', border: '1px solid #f1f5f9' 
        }}>
          <div style={{ 
            height: '200px', borderRadius: '24px', background: '#111', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', overflow: 'hidden', 
            border: '8px solid white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' 
          }}>
             <img src={getImageUrl(siteLogo)} alt="Site Logo" style={{ maxWidth: '80%', maxHeight: '60%', objectFit: 'contain' }} />
          </div>
          
          <div>
             <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '15px' }}>Signature Logo</h4>
             <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '25px', fontWeight: 500 }}>Upload a high-resolution PNG or SVG. Transparent backgrounds are highly recommended for the elite "Midnight Gold" theme.</p>
             
             <label style={{ 
               display: 'inline-flex', padding: '18px 40px', borderRadius: '50px', background: '#111', 
               color: 'white', fontWeight: 800, cursor: 'pointer', fontSize: '15px', alignItems: 'center', gap: '12px'
             }}>
                <ImageIcon size={20} color="var(--primary-gold)" /> Update Logo
                <input type="file" hidden onChange={(e) => handleImageUpload(e)} />
             </label>
          </div>
        </div>
        
        <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={handleSaveBranding} 
            style={{ 
              padding: '20px 50px', borderRadius: '50px', fontSize: '16px', fontWeight: 950, 
              background: 'var(--gradient-gold)', color: 'black', border: 'none', cursor: 'pointer',
              boxShadow: '0 15px 30px rgba(212, 175, 55, 0.2)'
            }}
          >
            <CheckCircle size={20} /> Deploy Brand Updates
          </motion.button>
        </div>
      </div>
    </div>
  );

  const renderDashboardOverview = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '40px' }}>
      <div style={{ backgroundColor: 'white', padding: '45px', borderRadius: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 950, color: 'var(--primary-black)', letterSpacing: '-1px' }}>Recent Inbound Leads</h3>
            <p style={{ fontSize: '14px', color: '#94a3b8', fontWeight: 600 }}>Clients waiting for your response.</p>
          </div>
          <button onClick={() => navigate('/admin/enquiries')} style={{ color: 'var(--primary-gold)', background: '#111', padding: '12px 25px', borderRadius: '50px', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}>
            Open CRM <ChevronRight size={16} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {enquiries.slice(0, 4).map(enq => (
            <motion.div 
              whileHover={{ x: 10 }}
              key={enq.id} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px', borderRadius: '28px', background: '#fcfaf7', border: '1px solid #f1f5f9' }}
            >
               <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '18px', color: 'var(--primary-gold)', border: '1px solid #f1f5f9' }}>
                    {enq.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 900, fontSize: '16px', color: 'var(--primary-black)' }}>{enq.name}</p>
                    <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Interested in: <span style={{ color: 'var(--primary-black)' }}>{enq.package ? enq.package.title : (enq.subject || 'Custom Trip')}</span></p>
                  </div>
               </div>
               <div style={{ textAlign: 'right' }}>
                 <span style={{ 
                   fontSize: '10px', fontWeight: 950, letterSpacing: '1px', padding: '6px 14px', borderRadius: '50px',
                   background: enq.status === 'New' ? '#fef2f2' : '#ecfdf5', 
                   color: enq.status === 'New' ? '#ef4444' : '#059669',
                   border: `1px solid ${enq.status === 'New' ? '#fee2e2' : '#d1fae5'}`
                 }}>{enq.status.toUpperCase()}</span>
                 <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px', fontWeight: 600 }}>{new Date(enq.created_at).toLocaleDateString()}</p>
               </div>
            </motion.div>
          ))}
          {enquiries.length === 0 && <div style={{ textAlign: 'center', padding: '60px', opacity: 0.3 }}><MessageSquare size={48} style={{ margin: '0 auto 20px' }} /><p style={{ fontWeight: 800 }}>Inbox is quiet. Good time to publish a blog!</p></div>}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ backgroundColor: 'var(--primary-black)', padding: '40px', borderRadius: '40px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
           <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--gradient-gold)', opacity: 0.1, borderRadius: '50%' }}></div>
           <Sparkles style={{ position: 'absolute', top: '30px', right: '30px', opacity: 0.3 }} size={40} />
           <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>Business Health</h3>
           
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, opacity: 0.6, marginBottom: '5px' }}>Conversion Velocity</p>
                <h4 style={{ fontSize: '28px', fontWeight: 950 }}>High <span style={{ fontSize: '14px', color: '#10b981' }}>+12%</span></h4>
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, opacity: 0.6, marginBottom: '5px' }}>Active Inventory</p>
                <h4 style={{ fontSize: '28px', fontWeight: 950 }}>{stats.active_packages} <span style={{ fontSize: '12px', opacity: 0.4 }}>LIVE</span></h4>
              </div>
           </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '40px', border: '1px solid #f1f5f9' }}>
           <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary-black)', marginBottom: '25px' }}>Marketing Efficiency</h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                 <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: '#eef2ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><BookOpen size={20} /></div>
                 <div>
                   <p style={{ fontWeight: 800, fontSize: '14px' }}>Latest Blog Post</p>
                   <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{blogs[0]?.title || 'No blogs published'}</p>
                 </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                 <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: '#fdf2f8', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={20} /></div>
                 <div>
                   <p style={{ fontWeight: 800, fontSize: '14px' }}>Total Group Capacity</p>
                   <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{groupTrips.reduce((acc, t) => acc + t.seats, 0)} Total Seats in Batches</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fcfaf7' }}>
      <AdminSidebar />
      
      <main style={{ flex: 1, padding: '40px 40px 100px 320px', maxWidth: '1800px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
               <Sparkles size={16} color="var(--primary-gold)" />
               <span style={{ fontSize: '12px', fontWeight: 900, color: '#94a3b8', letterSpacing: '3px', textTransform: 'uppercase' }}>Operational Overview</span>
            </div>
            <h1 style={{ fontSize: '48px', fontWeight: 950, color: 'var(--primary-black)', letterSpacing: '-2px', lineHeight: 1 }}>
              Shiv <span style={{ color: 'var(--primary-gold)' }}>Travel</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '16px', fontWeight: 600, marginTop: '10px' }}>
              {activeTab === 'dashboard' ? 'Welcome back. Here is your business at a glance.' : `Managing ${activeTab.replace('-', ' ')} and visual assets.`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            {activeTab !== 'dashboard' && activeTab !== 'enquiries' && activeTab !== 'home-carousel' && activeTab !== 'insta-feed' && activeTab !== 'branding' && (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowModal(true); setEditingItem(null); resetForms(); }} 
                style={{ 
                  padding: '18px 40px', borderRadius: '100px', fontSize: '15px', display: 'flex', 
                  alignItems: 'center', gap: '12px', background: 'var(--primary-black)', color: 'white',
                  fontWeight: 900, border: 'none', cursor: 'pointer', boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                }}
              >
                <Plus size={20} color="var(--primary-gold)" /> New {activeTab === 'packages' ? 'Package' : activeTab === 'blogs' ? 'Blog Post' : 'Group Trip'}
              </motion.button>
            )}
          </div>
        </div>

        {/* Stats Grid - Show only on Dashboard */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px', marginBottom: '50px' }}>
            {[
              { label: 'Live Inventory', value: stats.total_packages, icon: <PackageIcon size={24} />, color: '#059669', bg: '#ecfdf5' },
              { label: 'Inbound Leads', value: stats.total_enquiries, icon: <MessageSquare size={24} />, color: 'var(--primary-gold)', bg: '#fffbeb' },
              { label: 'Action Required', value: stats.new_enquiries, icon: <Clock size={24} />, color: '#ef4444', bg: '#fef2f2' },
              { label: 'Published Stories', value: stats.total_blogs || 0, icon: <BookOpen size={24} />, color: '#6366f1', bg: '#eef2ff' },
              { label: 'Active Groups', value: stats.total_group_trips || 0, icon: <Users size={24} />, color: '#ec4899', bg: '#fdf2f8' }
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} 
                style={{ backgroundColor: 'white', padding: '35px', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '100px', height: '100px', background: stat.bg, opacity: 0.3, borderRadius: '50%' }}></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                  <div>
                    <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>{stat.label}</p>
                    <h3 style={{ fontSize: '36px', fontWeight: 950, color: 'var(--primary-black)', letterSpacing: '-1.5px' }}>{stat.value}</h3>
                  </div>
                  <div style={{ width: '50px', height: '50px', borderRadius: '16px', backgroundColor: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 20px ${stat.bg}` }}>
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Dynamic Content */}
        {activeTab === 'dashboard' ? renderDashboardOverview() : 
         activeTab === 'home-carousel' ? renderHomeCarouselManager() : 
         activeTab === 'insta-feed' ? renderInstaFeedManager() : 
         activeTab === 'branding' ? renderBrandingManager() : (
          <div style={{ backgroundColor: 'white', borderRadius: '28px', boxShadow: 'var(--shadow)', padding: '35px', border: '1px solid #f1f5f9' }}>
            {activeTab === 'packages' ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                      <th style={{ padding: '20px' }}>Tour / Package</th>
                      <th style={{ padding: '20px' }}>Location</th>
                      <th style={{ padding: '20px' }}>Best Price</th>
                      <th style={{ padding: '20px' }}>Visibility</th>
                      <th style={{ padding: '20px', textAlign: 'right' }}>Management</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map(pkg => (
                      <tr key={pkg.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                            {pkg.image ? (
                              <img src={getImageUrl(pkg.image)} style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                            ) : (
                              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}><PackageIcon size={20} /></div>
                            )}
                            <div>
                              <p style={{ fontWeight: 900, fontSize: '17px', color: 'var(--primary-black)' }}>{pkg.title}</p>
                              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{pkg.duration} · {pkg.group_size}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '20px', fontWeight: 600, color: 'var(--text-muted)' }}>{pkg.location}</td>
                        <td style={{ padding: '20px', fontWeight: 900, color: 'var(--primary-black)', fontSize: '18px' }}>₹{pkg.price.toLocaleString()}</td>
                        <td style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                             <span style={{ padding: '8px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: 800, backgroundColor: pkg.status ? '#ecfdf5' : '#fef2f2', color: pkg.status ? '#059669' : '#ef4444' }}>{pkg.status ? '● LIVE' : '○ DRAFT'}</span>
                             {pkg.is_popular && <span style={{ padding: '4px 10px', borderRadius: '5px', fontSize: '10px', fontWeight: 900, backgroundColor: 'var(--primary-orange)', color: 'white', textAlign: 'center' }}>★ POPULAR</span>}
                          </div>
                        </td>
                        <td style={{ padding: '20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '12px' }}>
                            <button onClick={() => openEditModal(pkg)} style={{ color: 'var(--primary-black)', background: '#f0fdf4', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}><Edit size={18} /></button>
                            <button onClick={() => handleDelete(pkg.id)} style={{ color: '#ef4444', background: '#fef2f2', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}><Trash size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'blogs' ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '20px' }}>Blog Post</th>
                      <th style={{ padding: '20px' }}>Category</th>
                      <th style={{ padding: '20px' }}>Date</th>
                      <th style={{ padding: '20px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map(blog => (
                      <tr key={blog.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                            <img src={getImageUrl(blog.image)} style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }} />
                            <p style={{ fontWeight: 900, fontSize: '16px', color: 'var(--primary-black)' }}>{blog.title}</p>
                          </div>
                        </td>
                        <td style={{ padding: '20px' }}><span style={{ padding: '6px 14px', borderRadius: '50px', backgroundColor: '#f3f4f6', fontSize: '12px', fontWeight: 700 }}>{blog.category}</span></td>
                        <td style={{ padding: '20px', fontWeight: 600 }}>{blog.date}</td>
                        <td style={{ padding: '20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '10px' }}>
                            <button onClick={() => openEditModal(blog)} style={{ color: 'var(--primary-black)', background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: '12px' }}><Edit size={18} /></button>
                            <button onClick={() => handleDelete(blog.id)} style={{ color: '#ef4444', background: '#fef2f2', border: 'none', padding: '10px', borderRadius: '12px' }}><Trash size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'group-trips' ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '20px' }}>Trip Details</th>
                      <th style={{ padding: '20px' }}>Date Range</th>
                      <th style={{ padding: '20px' }}>Availability</th>
                      <th style={{ padding: '20px' }}>Batch Status</th>
                      <th style={{ padding: '20px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupTrips.map(trip => (
                      <tr key={trip.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                            <img src={getImageUrl(trip.image)} style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }} />
                            <div>
                               <p style={{ fontWeight: 900, fontSize: '16px', color: 'var(--primary-black)' }}>{trip.title}</p>
                               <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-orange)' }}>₹{trip.price?.toLocaleString()}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '20px', fontWeight: 700 }}>{trip.date}</td>
                        <td style={{ padding: '20px', fontWeight: 700 }}>{trip.seats} Available</td>
                        <td style={{ padding: '20px' }}>
                           <span style={{ padding: '8px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: 800, backgroundColor: trip.status === 'upcoming' ? '#ecfdf5' : '#fff7ed', color: trip.status === 'upcoming' ? '#059669' : '#c2410c' }}>{trip.status.toUpperCase()}</span>
                        </td>
                        <td style={{ padding: '20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '10px' }}>
                            <button onClick={() => openEditModal(trip)} style={{ color: 'var(--primary-black)', background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: '12px' }}><Edit size={18} /></button>
                            <button onClick={() => handleDelete(trip.id)} style={{ color: '#ef4444', background: '#fef2f2', border: 'none', padding: '10px', borderRadius: '12px' }}><Trash size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #f1f5f9', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>
                      <th style={{ padding: '20px' }}>Traveller</th>
                      <th style={{ padding: '20px' }}>Requirement</th>
                      <th style={{ padding: '20px' }}>Message Details</th>
                      <th style={{ padding: '20px' }}>Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.length > 0 ? enquiries.map(enq => (
                      <tr key={enq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                             <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary-black)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>{enq.name[0]}</div>
                             <div>
                                <p style={{ fontWeight: 900, fontSize: '16px', color: 'var(--primary-black)' }}>{enq.name}</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{enq.email}</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>{enq.phone}</p>
                             </div>
                          </div>
                        </td>
                        <td style={{ padding: '20px' }}>
                          {enq.package ? (
                            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-orange)', padding: '6px 12px', backgroundColor: '#fff7ed', borderRadius: '8px', border: '1px solid #ffedd5' }}>{enq.package.title}</span>
                          ) : (
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#6366f1', padding: '6px 12px', backgroundColor: '#eef2ff', borderRadius: '8px', border: '1px solid #e0e7ff' }}>{enq.subject || 'Custom Trip'}</span>
                          )}
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', fontWeight: 600 }}>{new Date(enq.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </td>
                        <td style={{ padding: '20px', maxWidth: '400px' }}>
                          <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', fontWeight: 500 }}>{enq.message}</p>
                        </td>
                        <td style={{ padding: '20px' }}>
                          <select 
                            value={enq.status} 
                            onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                            style={{ padding: '10px 16px', borderRadius: '12px', border: '2px solid #f1f5f9', fontSize: '13px', fontWeight: 800, color: 'var(--primary-black)', cursor: 'pointer', outline: 'none', background: 'white' }}
                          >
                            <option value="New">New Lead</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Completed">Success</option>
                            <option value="Cancelled">Closed</option>
                          </select>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '16px', fontWeight: 600 }}>No enquiries found in the records.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Premium Modal */}
        <AnimatePresence>
          {showModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} 
                style={{ backgroundColor: 'white', padding: '50px', borderRadius: '40px', width: '1100px', maxWidth: '95%', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                   <h2 style={{ fontSize: '34px', fontWeight: 900, color: 'var(--primary-black)' }}>
                      {editingItem ? 'Refine' : 'Add New'} <span style={{ color: 'var(--primary-orange)' }}>{activeTab.replace('-', ' ')}</span>
                   </h2>
                   <button onClick={() => setShowModal(false)} style={{ background: '#f1f5f9', border: 'none', padding: '12px', borderRadius: '50%', color: 'var(--text-muted)', cursor: 'pointer' }}><XCircle size={24} /></button>
                </div>

                <form onSubmit={handleCreateOrUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  
                  {activeTab === 'packages' && (
                    <>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Package Title</label>
                        <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. Majestic Spiti Valley Expedition" required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Primary Location</label>
                        <input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. Himachal Pradesh, India" required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Starting Price (₹)</label>
                        <input value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} type="number" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Trip Duration</label>
                        <input value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. 7 Days / 6 Nights" />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Category Type</label>
                        <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', background: 'white', fontSize: '16px', fontWeight: 600, outline: 'none' }}>
                           <option value="Mountain">Mountain</option>
                           <option value="Beach">Beach</option>
                           <option value="Spiritual">Spiritual</option>
                           <option value="Adventure">Adventure</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Package Tag (Best Seller, Trending, etc.)</label>
                        <input value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Trip Difficulty</label>
                        <input value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Initial Guest Rating (1-5)</label>
                        <input value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})} type="number" step="0.1" max="5" min="1" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Group Size Policy</label>
                        <input value={formData.group_size} onChange={(e) => setFormData({...formData, group_size: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. Selectable (Private) / 12-15 (Batch)" />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#f8fafc', padding: '15px 25px', borderRadius: '16px', border: '2px solid #f1f5f9' }}>
                         <input type="checkbox" id="is_popular" checked={formData.is_popular} onChange={(e) => setFormData({...formData, is_popular: e.target.checked})} style={{ width: '22px', height: '22px', cursor: 'pointer' }} />
                         <label htmlFor="is_popular" style={{ fontWeight: 800, color: 'var(--primary-black)', cursor: 'pointer' }}>Mark as Popular Destination (Home Grid)</label>
                      </div>
                      <div style={{ gridColumn: '1/3', padding: '30px', background: 'var(--bg-white)', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                           <p style={{ fontWeight: 900, color: 'var(--primary-black)', fontSize: '16px' }}>Featured Cover Image</p>
                           <label className="btn-secondary" style={{ padding: '10px 20px', cursor: 'pointer', borderRadius: '50px', fontSize: '13px' }}>
                              <ImageIcon size={16} /> Choose Image
                              <input type="file" hidden onChange={(e) => handleImageUpload(e, 'main')} />
                           </label>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          {formData.image && <img src={getImageUrl(formData.image)} style={{ width: '180px', height: '110px', borderRadius: '20px', objectFit: 'cover', boxShadow: 'var(--shadow)' }} />}
                          {!formData.image && <div style={{ width: '180px', height: '110px', borderRadius: '20px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', border: '1px solid #f1f5f9' }}><ImageIcon size={32} /></div>}
                        </div>
                      </div>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Short Overview (Marketing Hook)</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }} required></textarea>
                      </div>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Day-by-Day Itinerary (Separated by new lines)</label>
                        <textarea value={formData.itinerary} onChange={(e) => setFormData({...formData, itinerary: e.target.value})} rows="5" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }} placeholder="Day 1: Arrival & Briefing\nDay 2: Exploration starts..."></textarea>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Inclusions</label>
                        <textarea value={formData.inclusions} onChange={(e) => setFormData({...formData, inclusions: e.target.value})} rows="4" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }}></textarea>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Exclusions</label>
                        <textarea value={formData.exclusions} onChange={(e) => setFormData({...formData, exclusions: e.target.value})} rows="4" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }}></textarea>
                      </div>
                      <div style={{ gridColumn: '1/3', padding: '40px', background: '#f8fafc', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                           <div>
                             <p style={{ fontWeight: 900, color: 'var(--primary-black)', fontSize: '18px', marginBottom: '5px' }}>Featured Visuals</p>
                             <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>The first image will be used as the primary card cover.</p>
                           </div>
                           <label style={{ padding: '12px 25px', cursor: 'pointer', borderRadius: '50px', fontSize: '14px', background: '#111', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
                              <Plus size={18} color="var(--primary-gold)" /> Add Media
                              <input type="file" multiple hidden onChange={handleGalleryUpload} />
                           </label>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
                          {/* Main Image Proxy */}
                          {formData.image && (
                             <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '120px', border: '3px solid var(--primary-gold)', boxShadow: '0 10px 20px rgba(212,175,55,0.2)' }}>
                                <img src={getImageUrl(formData.image)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'var(--primary-gold)', color: 'black', fontSize: '10px', fontWeight: 950, padding: '2px 8px', borderRadius: '4px' }}>COVER</div>
                                <button type="button" onClick={() => setFormData({...formData, image: ''})} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'rgba(239, 68, 68, 0.8)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}><X size={14} /></button>
                             </div>
                          )}
                          
                          {formData.gallery && formData.gallery.map((img, idx) => (
                            <motion.div 
                              layout
                              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                              key={idx} 
                              style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '120px', background: 'white', border: '1px solid #e2e8f0' }}
                            >
                              <img src={getImageUrl(img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', opacity: 0 }} />
                              <button type="button" onClick={() => handleRemoveGalleryImage(idx)} style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(255,255,255,0.9)', color: '#ef4444', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}><Trash size={14} /></button>
                            </motion.div>
                          ))}
                          
                          {!formData.image && (!formData.gallery || formData.gallery.length === 0) && (
                             <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.5)', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
                                <ImageIcon size={40} style={{ opacity: 0.2, marginBottom: '15px' }} />
                                <p style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8' }}>Drag and drop media here to begin</p>
                             </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'blogs' && (
                    <>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Blog Headline</label>
                        <input value={blogFormData.title} onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Post Category</label>
                        <select value={blogFormData.category} onChange={(e) => setBlogFormData({...blogFormData, category: e.target.value})} style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', background: 'white', fontSize: '16px', fontWeight: 600, outline: 'none' }}>
                           {['Mountains', 'Beach', 'Culture', 'Backpacks', 'Luxury', 'Budget Travel'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Reading Estimate</label>
                        <input value={blogFormData.reading_time} onChange={(e) => setBlogFormData({...blogFormData, reading_time: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. 5 min read" />
                      </div>
                      <div style={{ gridColumn: '1/3', padding: '30px', background: 'var(--bg-white)', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
                        <p style={{ fontWeight: 900, color: 'var(--primary-black)', fontSize: '16px', marginBottom: '20px' }}>Blog Banner Image</p>
                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                          {blogFormData.image && <img src={getImageUrl(blogFormData.image)} style={{ width: '220px', height: '140px', borderRadius: '20px', objectFit: 'cover' }} />}
                          <label className="btn-secondary" style={{ padding: '12px 24px', cursor: 'pointer', borderRadius: '50px' }}>
                             Change Cover
                             <input type="file" hidden onChange={(e) => handleImageUpload(e)} />
                          </label>
                        </div>
                      </div>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>SEO Summary / Excerpt</label>
                        <textarea value={blogFormData.description} onChange={(e) => setBlogFormData({...blogFormData, description: e.target.value})} rows="2" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }} required></textarea>
                      </div>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Full Story Content (Support Markdown)</label>
                        <textarea value={blogFormData.content} onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})} rows="10" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }}></textarea>
                      </div>
                    </>
                  )}

                  {activeTab === 'group-trips' && (
                    <>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Batch Expedition Title</label>
                        <input value={tripFormData.title} onChange={(e) => setTripFormData({...tripFormData, title: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Expedition Date (e.g. 15-22 June)</label>
                        <input value={tripFormData.date} onChange={(e) => setTripFormData({...tripFormData, date: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Expedition Fee (₹)</label>
                        <input value={tripFormData.price} onChange={(e) => setTripFormData({...tripFormData, price: e.target.value})} type="number" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Total Open Seats</label>
                        <input value={tripFormData.seats} onChange={(e) => setTripFormData({...tripFormData, seats: parseInt(e.target.value)})} type="number" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Batch Status</label>
                        <select value={tripFormData.status} onChange={(e) => setTripFormData({...tripFormData, status: e.target.value})} style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', background: 'white', fontSize: '16px', fontWeight: 600, outline: 'none' }}>
                           <option value="upcoming">Booking Open (Upcoming)</option>
                           <option value="full">Sold Out (Full)</option>
                           <option value="completed">Expedition Finished</option>
                           <option value="cancelled">Paused</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-black)', marginBottom: '10px', display: 'block' }}>Group Type / Size</label>
                        <input value={tripFormData.group_size} onChange={(e) => setTripFormData({...tripFormData, group_size: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. 12-15 Travellers" />
                      </div>
                      <div style={{ gridColumn: '1/3', padding: '30px', background: 'var(--bg-white)', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
                        <p style={{ fontWeight: 900, color: 'var(--primary-black)', fontSize: '16px', marginBottom: '20px' }}>Batch Promotional Image</p>
                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                          {tripFormData.image && <img src={getImageUrl(tripFormData.image)} style={{ width: '220px', height: '140px', borderRadius: '20px', objectFit: 'cover' }} />}
                          <label className="btn-secondary" style={{ padding: '12px 24px', cursor: 'pointer', borderRadius: '50px' }}>
                             Select Image
                             <input type="file" hidden onChange={(e) => handleImageUpload(e)} />
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  <div style={{ gridColumn: '1/3', display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1, padding: '20px', borderRadius: '50px', fontSize: '17px', fontWeight: 900 }}>
                       {editingItem ? <RotateCcw size={18} /> : <Plus size={18} />} {editingItem ? 'Save Updates' : 'Publish to Website'}
                    </button>
                    <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ padding: '20px 40px', borderRadius: '50px', fontSize: '17px', fontWeight: 700 }}>Cancel</button>
                  </div>
                </form>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  </div>
  );
};

export default AdminDashboard;
