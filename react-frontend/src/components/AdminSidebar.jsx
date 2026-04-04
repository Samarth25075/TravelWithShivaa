import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, MessageSquare, Settings, LogOut, Mountain } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <Package size={20} />, label: 'Tour Packages', path: '/admin/packages' },
    { icon: <MessageSquare size={20} />, label: 'Enquiries', path: '/admin/enquiries' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login'; // Hard redirect to ensure clean state
  };

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      backgroundColor: 'var(--secondary)',
      color: 'white',
      position: 'fixed',
      left: 0,
      top: 0,
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100
    }}>
      <div style={{ marginBottom: '50px', padding: '0 20px' }}>
          <img 
            src="/logo.png" 
            alt="Shiv Travel Logo" 
            style={{ 
              height: '60px', 
              width: 'auto',
              objectFit: 'contain'
            }} 
          />
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/dashboard');
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
                marginBottom: '10px',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontWeight: 700,
                boxShadow: isActive ? '0 10px 20px rgba(245, 158, 11, 0.2)' : 'none',
                opacity: isActive ? 1 : 0.6
              }}
            >
              {item.icon}
              {item.label}
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
            color: '#ef4444', 
            fontWeight: 800,
            cursor: 'pointer',
            transition: '0.3s',
            fontSize: '15px'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
        >
          <LogOut size={20} /> Logout Account
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

