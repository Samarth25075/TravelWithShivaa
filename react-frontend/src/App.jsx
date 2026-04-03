import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminSidebar from './components/AdminSidebar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import Contact from './pages/Contact';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('admin_token'));

  // Update login state whenever the location changes (after login redirect)
  useEffect(() => {
    setIsAdminLoggedIn(!!localStorage.getItem('admin_token'));
  }, [location.pathname]);

  const isAdminPath = location.pathname.startsWith('/admin');
  const showAdminSide = isAdminPath && !!localStorage.getItem('admin_token') && location.pathname !== '/admin/login';

  return (
    <div className="app" style={{ display: 'flex', flexDirection: showAdminSide ? 'row' : 'column' }}>
      {showAdminSide ? <AdminSidebar /> : (location.pathname !== '/admin/login' && <Navbar />)}
      
      <div style={{ flex: 1, marginLeft: showAdminSide ? '280px' : '0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/package/:id" element={<PackageDetails />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin />} />
          <Route path="/admin/packages" element={isAdminLoggedIn ? <AdminDashboard /> : <AdminLogin />} />
        </Routes>
      </div>
      {!isAdminPath && location.pathname !== '/admin/login' && <Footer />}
    </div>
  );
}

export default App;
