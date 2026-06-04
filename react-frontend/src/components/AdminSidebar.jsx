'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Package, MessageSquare, 
  Settings, LogOut, Mountain, Compass, Palette,
  BookOpen, Users, User, Image as ImageIcon, Sparkles
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const AdminSidebar = () => {
  const location = usePathname();
  const router = useRouter();
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
      width: '300px',
      height: '100vh',
      backgroundColor: '#050505',
      color: 'white',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '50px 25px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      borderRight: '1px solid rgba(212, 175, 55, 0.1)',
      boxShadow: '10px 0 50px rgba(0,0,0,0.5)'
    }}>
      <div style={{ marginBottom: '60px', padding: '0 15px', textAlign: 'center' }}>
          <img 
            src={siteLogo ? (siteLogo.startsWith('http') ? siteLogo : `/api/uploads/${siteLogo}`) : '/logo.png'} 
            alt="Shiv Travel Logo" 
            style={{ 
              height: '40px', 
              width: 'auto',
              marginBottom: '15px'
            }} 
          />
          <h2 style={{ fontSize: '10px', fontWeight: 900, color: 'var(--primary-gold)', margin: 0, textTransform: 'uppercase', letterSpacing: '4px' }}>
            CONCIERGE DESK
          </h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {menuItems.map((item, index) => {
          const isActive = location ? location.includes(item.path) : false;
          return (
            <Link 
              key={index} 
              href={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                padding: '16px 20px',
                borderRadius: '50px',
                textDecoration: 'none',
                color: isActive ? 'black' : 'white',
                background: isActive ? 'var(--gradient-gold)' : 'transparent',
                transition: '0.4s',
                fontWeight: isActive ? 900 : 600,
                boxShadow: isActive ? '0 10px 25px rgba(212, 175, 55, 0.2)' : 'none',
                opacity: isActive ? 1 : 0.4,
                fontSize: '14px'
              }}
              onMouseEnter={e => !isActive && (e.currentTarget.style.opacity = 0.8)}
              onMouseLeave={e => !isActive && (e.currentTarget.style.opacity = 0.4)}
            >
              <span style={{ display: 'flex', color: isActive ? 'black' : 'var(--primary-gold)' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link href="/" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          padding: '16px 20px', 
          textDecoration: 'none', 
          color: 'white', 
          opacity: 0.4, 
          fontWeight: 700,
          borderRadius: '50px',
          transition: '0.3s',
          fontSize: '13px'
        }} onMouseEnter={e => e.currentTarget.style.opacity = 0.8} onMouseLeave={e => e.currentTarget.style.opacity = 0.4}>
          <Sparkles size={18} color="var(--primary-gold)" /> Front Terminal
        </Link>
        
        <button 
          onClick={handleLogout} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px', 
            padding: '16px 20px', 
            border: 'none', 
            borderRadius: '50px',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            color: '#ef4444', 
            fontWeight: 800,
            cursor: 'pointer',
            transition: '0.3s',
            fontSize: '13px',
            textAlign: 'left'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.05)'}
        >
          <LogOut size={18} /> Disconnect
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
