import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, MessageSquare, Settings, LogOut, Globe } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <Package size={20} />, label: 'Tour Packages', path: '/admin/packages' },
    { icon: <MessageSquare size={20} />, label: 'Enquiries', path: '/admin/enquiries' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

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
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '50px', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>SHIV ADMIN</h2>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              padding: '15px 20px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: 'white',
              marginBottom: '10px',
              backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
              transition: 'var(--transition)',
              fontWeight: 600,
              opacity: location.pathname === item.path ? 1 : 0.7
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', textDecoration: 'none', color: 'white', opacity: 0.7, fontWeight: 600 }}>
          <Globe size={20} /> View Website
        </Link>
        <Link to="/admin/logout" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', textDecoration: 'none', color: '#ff6b6b', fontWeight: 600 }}>
          <LogOut size={20} /> Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
