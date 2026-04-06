import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plus, Edit, Trash, CheckCircle, XCircle, Search, 
  MessageSquare, Package as PackageIcon, Clock, 
  User, Users, Phone, Mail, RotateCcw, Image as ImageIcon,
  LayoutDashboard, TrendingUp, Calendar, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

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
  const [activeTab, setActiveTab] = useState('packages');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const getImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
      {[0, 1, 2, 3, 4].map((index) => (
        <div key={index} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: 'var(--shadow)', border: '1px solid #f1f5f9' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary-green)', marginBottom: '20px' }}>Slide #{index + 1} Image</h4>
          <div style={{ height: '220px', borderRadius: '20px', background: '#f8fafc', marginBottom: '20px', overflow: 'hidden', border: '2px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {homeImages[index] ? (
              <img src={getImageUrl(homeImages[index])} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Carousel ${index}`} />
            ) : (
              <ImageIcon size={48} style={{ opacity: 0.2 }} />
            )}
          </div>
          <label style={{ 
            display: 'block', padding: '15px', borderRadius: '14px', background: 'var(--primary-green)', 
            color: 'white', textAlign: 'center', fontWeight: 700, cursor: 'pointer', fontSize: '14px' 
          }}>
             Upload New Slide {index + 1}
             <input type="file" hidden onChange={(e) => handleImageUpload(e, index)} />
          </label>
        </div>
      ))}
      <div style={{ gridColumn: '1/-1', marginTop: '20px' }}>
         <button onClick={handleSaveHomeCarousel} className="btn-primary" style={{ padding: '20px 60px', borderRadius: '50px', fontSize: '18px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '15px' }}>
            <CheckCircle size={20} /> Save All Carousel Changes
         </button>
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div key={index} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: 'var(--shadow)', border: '1px solid #f1f5f9' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--primary-green)', marginBottom: '20px' }}>Post #{index + 1}</h4>
          <div style={{ height: '300px', borderRadius: '20px', background: '#f8fafc', marginBottom: '20px', overflow: 'hidden', border: '2px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {instaPosts[index] ? (
              <img src={getImageUrl(instaPosts[index])} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={`Post ${index}`} />
            ) : (
              <ImageIcon size={48} style={{ opacity: 0.2 }} />
            )}
          </div>
          <label style={{ 
            display: 'block', padding: '15px', borderRadius: '14px', background: 'var(--primary-green)', 
            color: 'white', textAlign: 'center', fontWeight: 700, cursor: 'pointer', fontSize: '14px' 
          }}>
             Upload New Post {index + 1}
             <input type="file" hidden onChange={(e) => handleImageUpload(e, index)} />
          </label>
        </div>
      ))}
      <div style={{ gridColumn: '1/-1', marginTop: '20px' }}>
         <button onClick={handleSaveInstaFeed} className="btn-primary" style={{ padding: '20px 60px', borderRadius: '50px', fontSize: '18px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '15px' }}>
            <CheckCircle size={20} /> Save Instagram Feed Changes
         </button>
      </div>
    </div>
  );

  const renderDashboardOverview = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: 'var(--shadow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--primary-green)' }}>Recent Enquiries</h3>
          <button onClick={() => navigate('/admin/enquiries')} style={{ color: 'var(--accent-amber)', background: 'none', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {enquiries.slice(0, 5).map(enq => (
            <div key={enq.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
               <div>
                  <p style={{ fontWeight: 800, fontSize: '15px' }}>{enq.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{enq.package ? enq.package.title : (enq.subject || 'General')}</p>
               </div>
               <span style={{ fontSize: '11px', fontWeight: 800, color: enq.status === 'New' ? '#ef4444' : '#10b981' }}>{enq.status.toUpperCase()}</span>
            </div>
          ))}
          {enquiries.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No enquiries yet.</p>}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: 'var(--shadow)' }}>
         <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--primary-green)', marginBottom: '20px' }}>Content Efficiency</h3>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ padding: '25px', borderRadius: '20px', background: '#ecfdf5', color: '#065f46' }}>
               <PackageIcon size={32} style={{ marginBottom: '15px' }} />
               <p style={{ fontSize: '14px', fontWeight: 600 }}>Active Packages</p>
               <h4 style={{ fontSize: '28px', fontWeight: 900 }}>{stats.active_packages}</h4>
            </div>
            <div style={{ padding: '25px', borderRadius: '20px', background: '#fffbeb', color: '#92400e' }}>
               <Users size={32} style={{ marginBottom: '15px' }} />
               <p style={{ fontSize: '14px', fontWeight: 600 }}>Group Capacity</p>
               <h4 style={{ fontSize: '28px', fontWeight: 900 }}>{groupTrips.reduce((acc, t) => acc + t.seats, 0)} Seats</h4>
            </div>
         </div>
         <div style={{ marginTop: '20px', padding: '20px', borderRadius: '20px', background: 'var(--primary-green)', color: 'white' }}>
            <p style={{ fontSize: '14px', fontWeight: 600, opacity: 0.8 }}>Latest Blog Engagement</p>
            <h4 style={{ fontSize: '18px', fontWeight: 800, marginTop: '5px' }}>{blogs[0]?.title || 'No blogs published'}</h4>
            <p style={{ fontSize: '12px', marginTop: '5px', opacity: 0.7 }}>Published on {blogs[0]?.date || 'N/A'}</p>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--primary-green)', letterSpacing: '-1px' }}>
              Shiv Travel <span style={{ color: 'var(--accent-amber)' }}>Admin</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', fontWeight: 500 }}>
              {activeTab === 'dashboard' ? 'Real-time overview of your travel business.' : `Manage ${activeTab.replace('-', ' ')} and content.`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            {activeTab !== 'dashboard' && activeTab !== 'enquiries' && activeTab !== 'home-carousel' && activeTab !== 'insta-feed' && (
              <button onClick={() => { setShowModal(true); setEditingItem(null); resetForms(); }} className="btn-primary" style={{ padding: '14px 28px', borderRadius: '50px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Plus size={20} /> Create New {activeTab === 'packages' ? 'Package' : activeTab === 'blogs' ? 'Blog Post' : 'Group Trip'}
              </button>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {[
            { label: 'Total Packages', value: stats.total_packages, icon: <PackageIcon />, color: 'var(--primary-green)', bg: '#f0fdf4' },
            { label: 'Total Enquiries', value: stats.total_enquiries, icon: <MessageSquare />, color: 'var(--accent-amber)', bg: '#fffbeb' },
            { label: 'New Enquiries', value: stats.new_enquiries, icon: <Clock />, color: '#ef4444', bg: '#fef2f2' },
            { label: 'Active Blogs', value: stats.total_blogs || 0, icon: <Mail />, color: '#6366f1', bg: '#eef2ff' },
            { label: 'Group Trips', value: stats.total_group_trips || 0, icon: <Users />, color: '#ec4899', bg: '#fdf2f8' }
          ].map((stat, i) => (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} key={i} 
              style={{ backgroundColor: 'white', padding: '25px', borderRadius: '24px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '18px', backgroundColor: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '2px' }}>{stat.label}</p>
                <h3 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--primary-green)' }}>{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Content */}
        {activeTab === 'dashboard' ? renderDashboardOverview() : activeTab === 'home-carousel' ? renderHomeCarouselManager() : activeTab === 'insta-feed' ? renderInstaFeedManager() : (
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
                              <p style={{ fontWeight: 900, fontSize: '17px', color: 'var(--primary-green)' }}>{pkg.title}</p>
                              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{pkg.duration} · {pkg.group_size}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '20px', fontWeight: 600, color: 'var(--text-muted)' }}>{pkg.location}</td>
                        <td style={{ padding: '20px', fontWeight: 900, color: 'var(--primary-green)', fontSize: '18px' }}>₹{pkg.price.toLocaleString()}</td>
                        <td style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                             <span style={{ padding: '8px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: 800, backgroundColor: pkg.status ? '#ecfdf5' : '#fef2f2', color: pkg.status ? '#059669' : '#ef4444' }}>{pkg.status ? '● LIVE' : '○ DRAFT'}</span>
                             {pkg.is_popular && <span style={{ padding: '4px 10px', borderRadius: '5px', fontSize: '10px', fontWeight: 900, backgroundColor: 'var(--accent-amber)', color: 'white', textAlign: 'center' }}>★ POPULAR</span>}
                          </div>
                        </td>
                        <td style={{ padding: '20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '12px' }}>
                            <button onClick={() => openEditModal(pkg)} style={{ color: 'var(--primary-green)', background: '#f0fdf4', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}><Edit size={18} /></button>
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
                            <p style={{ fontWeight: 900, fontSize: '16px', color: 'var(--primary-green)' }}>{blog.title}</p>
                          </div>
                        </td>
                        <td style={{ padding: '20px' }}><span style={{ padding: '6px 14px', borderRadius: '50px', backgroundColor: '#f3f4f6', fontSize: '12px', fontWeight: 700 }}>{blog.category}</span></td>
                        <td style={{ padding: '20px', fontWeight: 600 }}>{blog.date}</td>
                        <td style={{ padding: '20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '10px' }}>
                            <button onClick={() => openEditModal(blog)} style={{ color: 'var(--primary-green)', background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: '12px' }}><Edit size={18} /></button>
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
                               <p style={{ fontWeight: 900, fontSize: '16px', color: 'var(--primary-green)' }}>{trip.title}</p>
                               <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-amber)' }}>₹{trip.price?.toLocaleString()}</p>
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
                            <button onClick={() => openEditModal(trip)} style={{ color: 'var(--primary-green)', background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: '12px' }}><Edit size={18} /></button>
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
                             <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary-green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>{enq.name[0]}</div>
                             <div>
                                <p style={{ fontWeight: 900, fontSize: '16px', color: 'var(--primary-green)' }}>{enq.name}</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{enq.email}</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>{enq.phone}</p>
                             </div>
                          </div>
                        </td>
                        <td style={{ padding: '20px' }}>
                          {enq.package ? (
                            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-amber)', padding: '6px 12px', backgroundColor: '#fff7ed', borderRadius: '8px', border: '1px solid #ffedd5' }}>{enq.package.title}</span>
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
                            style={{ padding: '10px 16px', borderRadius: '12px', border: '2px solid #f1f5f9', fontSize: '13px', fontWeight: 800, color: 'var(--primary-green)', cursor: 'pointer', outline: 'none', background: 'white' }}
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
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(26,60,52,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} 
                style={{ backgroundColor: 'white', padding: '50px', borderRadius: '40px', width: '1100px', maxWidth: '95%', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                   <h2 style={{ fontSize: '34px', fontWeight: 900, color: 'var(--primary-green)' }}>
                      {editingItem ? 'Refine' : 'Add New'} <span style={{ color: 'var(--accent-amber)' }}>{activeTab.replace('-', ' ')}</span>
                   </h2>
                   <button onClick={() => setShowModal(false)} style={{ background: '#f1f5f9', border: 'none', padding: '12px', borderRadius: '50%', color: 'var(--text-muted)', cursor: 'pointer' }}><XCircle size={24} /></button>
                </div>

                <form onSubmit={handleCreateOrUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  
                  {activeTab === 'packages' && (
                    <>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Package Title</label>
                        <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. Majestic Spiti Valley Expedition" required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Primary Location</label>
                        <input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. Himachal Pradesh, India" required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Starting Price (₹)</label>
                        <input value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} type="number" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Trip Duration</label>
                        <input value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. 7 Days / 6 Nights" />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Category Type</label>
                        <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', background: 'white', fontSize: '16px', fontWeight: 600, outline: 'none' }}>
                           <option value="Mountain">Mountain</option>
                           <option value="Beach">Beach</option>
                           <option value="Spiritual">Spiritual</option>
                           <option value="Adventure">Adventure</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Package Tag (Best Seller, Trending, etc.)</label>
                        <input value={formData.tag} onChange={(e) => setFormData({...formData, tag: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Trip Difficulty</label>
                        <input value={formData.difficulty} onChange={(e) => setFormData({...formData, difficulty: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Initial Guest Rating (1-5)</label>
                        <input value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})} type="number" step="0.1" max="5" min="1" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Group Size Policy</label>
                        <input value={formData.group_size} onChange={(e) => setFormData({...formData, group_size: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. Selectable (Private) / 12-15 (Batch)" />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#f8fafc', padding: '15px 25px', borderRadius: '16px', border: '2px solid #f1f5f9' }}>
                         <input type="checkbox" id="is_popular" checked={formData.is_popular} onChange={(e) => setFormData({...formData, is_popular: e.target.checked})} style={{ width: '22px', height: '22px', cursor: 'pointer' }} />
                         <label htmlFor="is_popular" style={{ fontWeight: 800, color: 'var(--primary-green)', cursor: 'pointer' }}>Mark as Popular Destination (Home Grid)</label>
                      </div>
                      <div style={{ gridColumn: '1/3', padding: '30px', background: 'var(--bg-white)', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                           <p style={{ fontWeight: 900, color: 'var(--primary-green)', fontSize: '16px' }}>Featured Cover Image</p>
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
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Short Overview (Marketing Hook)</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }} required></textarea>
                      </div>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Day-by-Day Itinerary (Separated by new lines)</label>
                        <textarea value={formData.itinerary} onChange={(e) => setFormData({...formData, itinerary: e.target.value})} rows="5" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }} placeholder="Day 1: Arrival & Briefing\nDay 2: Exploration starts..."></textarea>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Inclusions</label>
                        <textarea value={formData.inclusions} onChange={(e) => setFormData({...formData, inclusions: e.target.value})} rows="4" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }}></textarea>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Exclusions</label>
                        <textarea value={formData.exclusions} onChange={(e) => setFormData({...formData, exclusions: e.target.value})} rows="4" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }}></textarea>
                      </div>
                      <div style={{ gridColumn: '1/3', padding: '30px', background: 'white', borderRadius: '24px', border: '2px solid #f8fafc' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                           <p style={{ fontWeight: 900, color: 'var(--primary-green)', fontSize: '16px' }}>Photo Gallery</p>
                           <label className="btn-secondary" style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '50px', fontSize: '12px' }}>
                              <Plus size={14} /> Add Multiple Files
                              <input type="file" multiple hidden onChange={handleGalleryUpload} />
                           </label>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px' }}>
                          {formData.gallery && formData.gallery.map((img, idx) => (
                            <div key={idx} style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', height: '90px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
                              <img src={getImageUrl(img)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button type="button" onClick={() => handleRemoveGalleryImage(idx)} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Trash size={12} /></button>
                            </div>
                          ))}
                          {(!formData.gallery || formData.gallery.length === 0) && <p style={{ fontSize: '12px', color: '#94a3b8', gridColumn: '1/-1', textAlign: 'center', padding: '20px' }}>No gallery images uploaded yet.</p>}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'blogs' && (
                    <>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Blog Headline</label>
                        <input value={blogFormData.title} onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Post Category</label>
                        <select value={blogFormData.category} onChange={(e) => setBlogFormData({...blogFormData, category: e.target.value})} style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', background: 'white', fontSize: '16px', fontWeight: 600, outline: 'none' }}>
                           {['Mountains', 'Beach', 'Culture', 'Backpacks', 'Luxury', 'Budget Travel'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Reading Estimate</label>
                        <input value={blogFormData.reading_time} onChange={(e) => setBlogFormData({...blogFormData, reading_time: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. 5 min read" />
                      </div>
                      <div style={{ gridColumn: '1/3', padding: '30px', background: 'var(--bg-white)', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
                        <p style={{ fontWeight: 900, color: 'var(--primary-green)', fontSize: '16px', marginBottom: '20px' }}>Blog Banner Image</p>
                        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                          {blogFormData.image && <img src={getImageUrl(blogFormData.image)} style={{ width: '220px', height: '140px', borderRadius: '20px', objectFit: 'cover' }} />}
                          <label className="btn-secondary" style={{ padding: '12px 24px', cursor: 'pointer', borderRadius: '50px' }}>
                             Change Cover
                             <input type="file" hidden onChange={(e) => handleImageUpload(e)} />
                          </label>
                        </div>
                      </div>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>SEO Summary / Excerpt</label>
                        <textarea value={blogFormData.description} onChange={(e) => setBlogFormData({...blogFormData, description: e.target.value})} rows="2" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }} required></textarea>
                      </div>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Full Story Content (Support Markdown)</label>
                        <textarea value={blogFormData.content} onChange={(e) => setBlogFormData({...blogFormData, content: e.target.value})} rows="10" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 500, outline: 'none', fontFamily: 'inherit' }}></textarea>
                      </div>
                    </>
                  )}

                  {activeTab === 'group-trips' && (
                    <>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Batch Expedition Title</label>
                        <input value={tripFormData.title} onChange={(e) => setTripFormData({...tripFormData, title: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Expedition Date (e.g. 15-22 June)</label>
                        <input value={tripFormData.date} onChange={(e) => setTripFormData({...tripFormData, date: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Expedition Fee (₹)</label>
                        <input value={tripFormData.price} onChange={(e) => setTripFormData({...tripFormData, price: e.target.value})} type="number" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Total Open Seats</label>
                        <input value={tripFormData.seats} onChange={(e) => setTripFormData({...tripFormData, seats: parseInt(e.target.value)})} type="number" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} required />
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Batch Status</label>
                        <select value={tripFormData.status} onChange={(e) => setTripFormData({...tripFormData, status: e.target.value})} style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', background: 'white', fontSize: '16px', fontWeight: 600, outline: 'none' }}>
                           <option value="upcoming">Booking Open (Upcoming)</option>
                           <option value="full">Sold Out (Full)</option>
                           <option value="completed">Expedition Finished</option>
                           <option value="cancelled">Paused</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-green)', marginBottom: '10px', display: 'block' }}>Group Type / Size</label>
                        <input value={tripFormData.group_size} onChange={(e) => setTripFormData({...tripFormData, group_size: e.target.value})} type="text" style={{ width: '100%', padding: '18px', borderRadius: '16px', border: '2px solid #f1f5f9', fontSize: '16px', fontWeight: 600, outline: 'none' }} placeholder="e.g. 12-15 Travellers" />
                      </div>
                      <div style={{ gridColumn: '1/3', padding: '30px', background: 'var(--bg-white)', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
                        <p style={{ fontWeight: 900, color: 'var(--primary-green)', fontSize: '16px', marginBottom: '20px' }}>Batch Promotional Image</p>
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
