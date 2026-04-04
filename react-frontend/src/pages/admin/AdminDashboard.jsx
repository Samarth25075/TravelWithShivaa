import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash, CheckCircle, XCircle, Search, MessageSquare, Package as PackageIcon, Clock, User, Phone, Mail, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ total_packages: 0, total_enquiries: 0, active_packages: 0, new_enquiries: 0 });
  const [activeTab, setActiveTab] = useState('packages');
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [loading, setLoading] = useState(true);

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
    gallery: []
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pkgsRes, enqRes, statsRes] = await Promise.all([
        axios.get('admin/packages'),
        axios.get('admin/enquiries'),
        axios.get('admin/stats')
      ]);
      setPackages(pkgsRes.data);
      setEnquiries(enqRes.data);
      setStats(statsRes.data);
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
      if (field === 'main') {
        setFormData({ ...formData, image: res.data.filename });
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
        const res = await axios.post('/api/upload', uploadFormData);
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
      const payload = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (!formData.image) {
        alert('Please upload a featured image for the package.');
        return;
      }

      if (editingPackage) {
        await axios.put(`admin/packages/${editingPackage.id}`, payload);
      } else {
        await axios.post('admin/packages', payload);
      }
      setShowModal(false);
      setEditingPackage(null);
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await axios.delete(`admin/packages/${id}`);
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


  const resetForm = () => {
    setFormData({
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
      gallery: []
    });
  };

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      ...pkg,
      itinerary: pkg.itinerary || '',
      inclusions: pkg.inclusions || '',
      exclusions: pkg.exclusions || '',
      duration: pkg.duration || '5 Days / 4 Nights',
      group_size: pkg.group_size || 'Selectable',
      gallery: pkg.gallery ? pkg.gallery.map(img => img.image_url) : []
    });
    setShowModal(true);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f5f7f9', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--secondary)' }}>Travel <span style={{ color: 'var(--primary)' }}>Control Center</span></h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>Manage tours, enquiries and view real-time data.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => { setShowModal(true); setEditingPackage(null); resetForm(); }} className="btn" style={{ padding: '12px 25px' }}>
              <Plus size={20} /> Add New Package
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {[
            { label: 'Total Packages', value: stats.total_packages, icon: <PackageIcon />, color: '#3b82f6', bg: '#eff6ff' },
            { label: 'Active Listings', value: stats.active_packages, icon: <CheckCircle />, color: '#10b981', bg: '#ecfdf5' },
            { label: 'Total Enquiries', value: stats.total_enquiries, icon: <MessageSquare />, color: '#f59e0b', bg: '#fffbeb' },
            { label: 'New Enquiries', value: stats.new_enquiries, icon: <Clock />, color: '#ef4444', bg: '#fef2f2' }
          ].map((stat, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={i} 
              style={{ backgroundColor: 'white', padding: '25px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>{stat.label}</p>
                <h3 style={{ fontSize: '32px', fontWeight: 900 }}>{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', backgroundColor: '#e2e8f0', padding: '6px', borderRadius: '18px', width: 'fit-content' }}>
          <button onClick={() => setActiveTab('packages')} style={{ padding: '12px 25px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 800, backgroundColor: activeTab === 'packages' ? 'white' : 'transparent', color: activeTab === 'packages' ? 'var(--secondary)' : '#64748b', transition: '0.3s' }}>Packages</button>
          <button onClick={() => setActiveTab('enquiries')} style={{ padding: '12px 25px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 800, backgroundColor: activeTab === 'enquiries' ? 'white' : 'transparent', color: activeTab === 'enquiries' ? 'var(--secondary)' : '#64748b', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Enquiries {stats.new_enquiries > 0 && <span style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>{stats.new_enquiries}</span>}
          </button>
        </div>

        {/* Table Content */}
        <div style={{ backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', padding: '30px', overflow: 'hidden' }}>
          {activeTab === 'packages' ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f8fafc', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <th style={{ padding: '20px' }}>Package Info</th>
                    <th style={{ padding: '20px' }}>Location</th>
                    <th style={{ padding: '20px' }}>Price</th>
                    <th style={{ padding: '20px' }}>Status</th>
                    <th style={{ padding: '20px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map(pkg => (
                    <tr key={pkg.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          {pkg.image ? (
                            <img src={`/api/uploads/${pkg.image}`} style={{ width: '55px', height: '55px', borderRadius: '12px', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '55px', height: '55px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}><PackageIcon size={16} /></div>
                          )}
                          <div>
                            <p style={{ fontWeight: 800, fontSize: '16px' }}>{pkg.title}</p>
                            <p style={{ fontSize: '12px', color: '#94a3b8' }}>ID: #{pkg.id}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '20px', fontWeight: 600, color: '#64748b' }}>{pkg.location}</td>
                      <td style={{ padding: '20px', fontWeight: 900, color: 'var(--secondary)' }}>₹{pkg.price.toLocaleString()}</td>
                      <td style={{ padding: '20px' }}>
                        <span style={{ padding: '6px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 800, backgroundColor: pkg.status ? '#ecfdf5' : '#fef2f2', color: pkg.status ? '#059669' : '#ef4444' }}>{pkg.status ? 'ACTIVE' : 'INACTIVE'}</span>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => openEditModal(pkg)} style={{ color: '#3b82f6', background: '#eff6ff', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}><Edit size={16} /></button>
                          <button onClick={() => handleDelete(pkg.id)} style={{ color: '#ef4444', background: '#fef2f2', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}><Trash size={16} /></button>
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
                  <tr style={{ borderBottom: '2px solid #f8fafc', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <th style={{ padding: '20px' }}>Customer</th>
                    <th style={{ padding: '20px' }}>Ref / Subject</th>
                    <th style={{ padding: '20px' }}>Message</th>
                    <th style={{ padding: '20px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.length > 0 ? enquiries.map(enq => (
                    <tr key={enq.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '20px' }}>
                        <p style={{ fontWeight: 800, fontSize: '15px' }}>{enq.name}</p>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>{enq.email}</p>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>{enq.phone}</p>
                      </td>
                      <td style={{ padding: '20px' }}>
                        {enq.package ? (
                          <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--primary)', padding: '5px 10px', backgroundColor: '#fff7ed', borderRadius: '8px' }}>{enq.package.title}</p>
                        ) : (
                          <p style={{ fontSize: '13px', fontWeight: 600 }}>{enq.subject || 'General Enquiry'}</p>
                        )}
                        <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '5px' }}>{new Date(enq.created_at).toLocaleDateString()}</p>
                      </td>
                      <td style={{ padding: '20px', maxWidth: '350px' }}>
                        <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>{enq.message}</p>
                      </td>
                      <td style={{ padding: '20px' }}>
                        <select 
                          value={enq.status} 
                          onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                          style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 700, cursor: 'pointer', outline: 'none' }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No enquiries found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} 
                style={{ backgroundColor: 'white', padding: '40px', borderRadius: '30px', width: '900px', maxWidth: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '30px' }}>{editingPackage ? 'Update' : 'New'} <span style={{ color: 'var(--primary)' }}>Tour Package</span></h2>
                <form onSubmit={handleCreateOrUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
                  <div style={{ gridColumn: '1/3' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', display: 'block' }}>Package Title</label>
                    <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} type="text" style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '1px solid #e2e8f0' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', display: 'block' }}>Location</label>
                    <input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} type="text" style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '1px solid #e2e8f0' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', display: 'block' }}>Price (₹)</label>
                    <input value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} type="number" style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '1px solid #e2e8f0' }} required />
                  </div>

                  <div style={{ gridColumn: '1/3', padding: '20px', background: '#f8fafc', borderRadius: '20px' }}>
                    <p style={{ fontWeight: 800, marginBottom: '15px', fontSize: '15px' }}>Featured Image</p>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      {formData.image && <img src={`/api/uploads/${formData.image}`} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />}
                      <input type="file" onChange={(e) => handleImageUpload(e, 'main')} />
                    </div>
                  </div>

                  <div style={{ gridColumn: '1/3', padding: '20px', background: '#f8fafc', borderRadius: '20px' }}>
                    <p style={{ fontWeight: 800, marginBottom: '15px', fontSize: '15px' }}>Gallery Images</p>
                    <input type="file" multiple onChange={handleGalleryUpload} style={{ marginBottom: '15px' }} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {formData.gallery.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative' }}>
                          <img src={`/api/uploads/${img}`} style={{ width: '80px', height: '80px', borderRadius: '10px' }} />
                          <button type="button" onClick={() => handleRemoveGalleryImage(idx)} style={{ position: 'absolute', top: '-5px', right: '-5px', width: '20px', height: '20px', borderRadius: '50%', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}><Trash size={10} /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ gridColumn: '1/3' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', display: 'block' }}>Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3" style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }} required></textarea>
                  </div>

                  <div style={{ gridColumn: '1/3' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', display: 'block' }}>Itinerary (Day-wise Breakdown)</label>
                    <textarea value={formData.itinerary} onChange={(e) => setFormData({...formData, itinerary: e.target.value})} rows="5" style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }} placeholder="Day 1: Arrival...&#10;Day 2: Sightseeing..."></textarea>
                  </div>

                  <div style={{ gridColumn: '1/2' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', display: 'block' }}>Package Inclusions</label>
                    <textarea value={formData.inclusions} onChange={(e) => setFormData({...formData, inclusions: e.target.value})} rows="4" style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }} placeholder="Meals, Hotel..."></textarea>
                  </div>

                  <div style={{ gridColumn: '2/3' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', display: 'block' }}>Package Exclusions</label>
                    <textarea value={formData.exclusions} onChange={(e) => setFormData({...formData, exclusions: e.target.value})} rows="4" style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }} placeholder="Flight, Tips..."></textarea>
                  </div>

                  <div style={{ gridColumn: '1/2' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', display: 'block' }}>Duration</label>
                    <input value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} type="text" style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '1px solid #e2e8f0' }} placeholder="e.g. 5 Days / 4 Nights" />
                  </div>

                  <div style={{ gridColumn: '2/3' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, color: '#64748b', marginBottom: '8px', display: 'block' }}>Group Size</label>
                    <input value={formData.group_size} onChange={(e) => setFormData({...formData, group_size: e.target.value})} type="text" style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '1px solid #e2e8f0' }} placeholder="e.g. 2-10 Persons" />
                  </div>

                  <div style={{ gridColumn: '1/3', display: 'flex', gap: '20px', marginTop: '10px' }}>
                    <button type="submit" className="btn" style={{ flex: 1, padding: '18px' }}>{editingPackage ? 'Update Package' : 'Create Package'}</button>
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary" style={{ padding: '18px 30px' }}>Cancel</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default AdminDashboard;
