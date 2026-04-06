import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Packages from './pages/Packages';
import GroupTrips from './pages/GroupTrips';
import CustomPackage from './pages/CustomPackage';
import DestinationDetail from './pages/DestinationDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PackageDetails from './pages/PackageDetails';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

const AppContent = () => {
  const [isGujarati, setIsGujarati] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdmin && <Navbar isGujarati={isGujarati} setIsGujarati={setIsGujarati} />}
      
      <Routes>
        <Route path="/" element={<Home isGujarati={isGujarati} />} />
        <Route path="/packages" element={<Packages isGujarati={isGujarati} />} />
        <Route path="/group-trips" element={<GroupTrips isGujarati={isGujarati} />} />
        <Route path="/custom-package" element={<CustomPackage isGujarati={isGujarati} />} />
        <Route path="/destination/:id" element={<DestinationDetail isGujarati={isGujarati} />} />
        <Route path="/about" element={<About isGujarati={isGujarati} />} />
        <Route path="/blog" element={<Blog isGujarati={isGujarati} />} />
        <Route path="/contact" element={<Contact isGujarati={isGujarati} />} />
        <Route path="/package/:id" element={<PackageDetails isGujarati={isGujarati} />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/packages" element={<AdminDashboard />} />
        <Route path="/admin/enquiries" element={<AdminDashboard />} />
        <Route path="/admin/blogs" element={<AdminDashboard />} />
        <Route path="/admin/group-trips" element={<AdminDashboard />} />
        <Route path="/admin/home-carousel" element={<AdminDashboard />} />
        <Route path="/admin/insta-feed" element={<AdminDashboard />} />
      </Routes>

      {!isAdmin && <Footer isGujarati={isGujarati} />}
      {!isAdmin && <WhatsAppButton />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
