import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

const Home = lazy(() => import('./pages/Home'));
const Packages = lazy(() => import('./pages/Packages'));
const GroupTrips = lazy(() => import('./pages/GroupTrips'));
const CustomPackage = lazy(() => import('./pages/CustomPackage'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const About = lazy(() => import('./pages/About'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const PackageDetails = lazy(() => import('./pages/PackageDetails'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppContent = () => {
  const [isGujarati, setIsGujarati] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-container">
      {!isAdmin && <Navbar isGujarati={isGujarati} setIsGujarati={setIsGujarati} />}
      
      <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}><div className="loader-gold"></div></div>}>
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
          <Route path="/admin/branding" element={<AdminDashboard />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

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
