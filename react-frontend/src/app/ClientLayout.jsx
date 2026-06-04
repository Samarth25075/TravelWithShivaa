'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { SettingsProvider } from '../context/SettingsContext';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import IntroLoader from '../components/IntroLoader';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';

function MainApp({ children }) {
  const { isGujarati, setIsGujarati } = useLanguage();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Initialize to true to match server-side rendering
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Check sessionStorage and path to determine if we should skip the loader
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro || isAdmin) {
      setShowLoader(false);
    }
  }, [isAdmin]);

  // Lock scrolling while the loader is active
  useEffect(() => {
    if (showLoader && !isAdmin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoader, isAdmin]);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowLoader(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && !isAdmin && (
          <IntroLoader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      <div className={isAdmin ? "app-container" : "app-container app-container-padded"}>
        {!isAdmin && <Navbar isGujarati={isGujarati} setIsGujarati={setIsGujarati} />}
        {children}
        {!isAdmin && <Footer isGujarati={isGujarati} />}
        {!isAdmin && <WhatsAppButton />}
      </div>
    </>
  );
}

export default function ClientLayout({ children }) {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <MainApp>{children}</MainApp>
      </LanguageProvider>
    </SettingsProvider>
  );
}
