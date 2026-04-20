import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, MessageSquare, 
  Settings, LogOut, Mountain, Compass, Palette,
  BookOpen, Users, User, Image as ImageIcon
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { siteLogo } = useSettings();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <Package size={20} />, label: 'Tour Packages', path: '/admin/packages' },
    { icon: <Compass size={20} />, label: 'Group Trips', path: '/admin/group-trips' },
    { icon: <BookOpen size={20} />, label: 'Travel Blogs', path: '/admin/blogs' },
    { icon: <MessageSquare size={20} />, label: 'Enquiries', path: '/admin/enquiries' },
    { icon: <ImageIcon size={20} />, label: 'Home Carousel', path: '/admin/home-carousel' },
    { icon: <User size={20} />, label: 'Instagram Feed', path: '/admin/insta-feed' },
    { icon: <Palette size={20} />, label: 'Branding', path: '/admin/branding' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      backgroundColor: 'var(--primary-black)',
      color: 'white',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      boxShadow: '4px 0 20px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '50px', padding: '0 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={siteLogo} 
            alt="Shiv Travel Logo" 
            style={{ 
              height: '45px', 
              width: 'auto',
              borderRadius: '8px'
            }} 
          />
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: 'white', margin: 0 }}>Shiv Travel</h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link 
              key={index} 
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '16px 20px',
                borderRadius: '16px',
                textDecoration: 'none',
                color: 'white',
                backgroundColor: isActive ? 'var(--primary-orange)' : 'transparent',
                transition: 'var(--transition)',
                fontWeight: 700,
                boxShadow: isActive ? '0 10px 20px rgba(255, 107, 0, 0.2)' : 'none',
                opacity: isActive ? 1 : 0.65
              }}
              onMouseEnter={e => !isActive && (e.currentTarget.style.opacity = 1)}
              onMouseLeave={e => !isActive && (e.currentTarget.style.opacity = 0.65)}
            >
              {item.icon}
              <span style={{ fontSize: '15px' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          padding: '16px 20px', 
          textDecoration: 'none', 
          color: 'white', 
          opacity: 0.6, 
          fontWeight: 700,
          borderRadius: '16px',
          transition: '0.3s'
        }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.6}>
          <Mountain size={20} /> View Website
        </Link>
        
        <button 
          onClick={handleLogout} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px', 
            padding: '16px 20px', 
            border: 'none', 
            borderRadius: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#feb2b2', 
            fontWeight: 800,
            cursor: 'pointer',
            transition: '0.3s',
            fontSize: '15px',
            textAlign: 'left'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
        >
          <LogOut size={20} /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
