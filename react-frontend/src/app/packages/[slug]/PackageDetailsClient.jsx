'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Users, MapPin, CheckCircle, XCircle, Share2, Shield,
  CalendarCheck, Send, X, ArrowLeft, MessageSquare, Star,
  Sparkles, Map, Heart, ArrowRight, Sun, Compass, Coffee,
  Hotel, HelpCircle, Flame, Gift
} from 'lucide-react';
import { useSettings } from '../../../context/SettingsContext';
import SEO from '../../../components/SEO';

const PackageDetails = () => {
  const { slug: id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState('idle');
  const [lightboxImageIndex, setLightboxImageIndex] = useState(null);
  const [expandedDays, setExpandedDays] = useState({ 0: true }); // Day 1 open by default
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const { getImageUrl } = useSettings();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`packages/${id}`)
      .then(res => {
        setPackageData(res.data);
        if (searchParams.get('enquire') === 'true') {
          setShowEnquiryModal(true);
        }
      })
      .catch(err => console.error(err));
  }, [id, searchParams]);

  if (!packageData) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
      <div className="loader-gold"></div>
    </div>
  );

  // Form Submission
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryStatus('loading');
    try {
      await axios.post('enquiries', {
        ...enquiryForm,
        package_id: packageData.id,
        subject: `Luxury Booking Enquiry: ${packageData.title}`
      });
      setEnquiryStatus('success');
      setTimeout(() => {
        setShowEnquiryModal(false);
        setEnquiryStatus('idle');
        setEnquiryForm({ name: '', email: '', phone: '', message: '' });
      }, 2000);
    } catch (err) {
      console.error(err);
      setEnquiryStatus('error');
    }
  };

  // WhatsApp Bookings
  const handleWhatsAppBook = () => {
    const adminPhone = "919313634723";
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://travelbookshiva.in/packages/${id}`;
    const text = `*Luxury Booking Enquiry for Shiv Travel Ahmedabad*%0A%0A*Package:* ${packageData.title}%0A*Duration:* ${packageData.duration}%0A*Price:* ₹${packageData.price.toLocaleString()}%0A*Link:* ${currentUrl}%0A%0AHello, I want to book this personalized luxury package. Please share details regarding hotel choices and availability.`;
    window.open(`https://wa.me/${adminPhone}?text=${text}`, '_blank');
  };

  // WhatsApp Sharing
  const handleWhatsAppShare = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://travelbookshiva.in/packages/${id}`;
    const text = `*Shiv Travel Ahmedabad - Premium Tour Package*%0A%0ACheck out this customized *${packageData.title}*!%0A🌴 *Destination:* ${packageData.location}%0A📅 *Duration:* ${packageData.duration}%0A💰 *Price:* ₹${packageData.price.toLocaleString()}%0A%0A👉 View Full Day-by-Day Itinerary & Hotels here:%0A${currentUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Parse day-by-day itinerary
  const parseItinerary = () => {
    if (!packageData.itinerary) return [];
    return packageData.itinerary.split('\n').filter(line => line.trim() !== '').map((line, idx) => {
      const dotIndex = line.indexOf('.');
      const fullHeader = dotIndex !== -1 ? line.substring(0, dotIndex) : line;
      const description = dotIndex !== -1 ? line.substring(dotIndex + 1).trim() : '';

      const colonIndex = fullHeader.indexOf(':');
      const dayName = colonIndex !== -1 ? fullHeader.substring(0, colonIndex).trim() : `Day ${idx + 1}`;
      const dayTitle = colonIndex !== -1 ? fullHeader.substring(colonIndex + 1).trim() : fullHeader.trim();

      return { dayName, dayTitle, description };
    });
  };

  // Parse hotel options
  const parseHotels = () => {
    if (!packageData.hotel_options) return [];
    return packageData.hotel_options.split('\n').filter(line => line.trim() !== '').map(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const tier = parts[0].trim();
        const details = parts[1].trim();

        const parenIndex = details.indexOf('(');
        const name = parenIndex !== -1 ? details.substring(0, parenIndex).trim() : details;
        const subDetails = parenIndex !== -1 ? details.substring(parenIndex + 1, details.length - 1).trim() : '';

        let stars = 4;
        if (subDetails.toLowerCase().includes('5-star') || tier.toLowerCase().includes('diamond')) stars = 5;
        else if (subDetails.toLowerCase().includes('3-star') || tier.toLowerCase().includes('silver')) stars = 3;

        return { tier, name, details: subDetails, stars };
      }
      return null;
    }).filter(Boolean);
  };

  const itineraryDays = parseItinerary();
  const hotelOptionsList = parseHotels();

  const inclusionsList = packageData.inclusions
    ? packageData.inclusions.split(',').map(item => item.trim()).filter(Boolean)
    : [];
  const exclusionsList = packageData.exclusions
    ? packageData.exclusions.split(',').map(item => item.trim()).filter(Boolean)
    : [];

  // Gallery unified images
  const galleryImages = [];
  if (packageData.image) {
    galleryImages.push(packageData.image);
  }
  if (packageData.gallery && packageData.gallery.length > 0) {
    packageData.gallery.forEach(img => {
      const url = img.image_url || img;
      if (url && url !== packageData.image) {
        galleryImages.push(url);
      }
    });
  }

  const toggleDay = (idx) => {
    setExpandedDays(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Sparkles size={16} /> },
    { id: 'itinerary', label: 'Itinerary', icon: <Map size={16} /> },
    { id: 'hotels', label: 'Hotel Stays', icon: <Hotel size={16} /> },
    { id: 'inclusions', label: 'Inclusions', icon: <CheckCircle size={16} /> },
    { id: 'gallery', label: 'Gallery', icon: <Share2 size={16} /> }
  ];

  return (
    <main className="package-details-page" style={{ backgroundColor: '#050505', paddingBottom: '120px', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <SEO
        title={packageData.title}
        description={packageData.description}
        image={getImageUrl(packageData.image)}
        url={`/packages/${id}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": packageData.title,
          "image": getImageUrl(packageData.image),
          "description": packageData.description,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": packageData.price
          }
        }}
      />

      {/* Immersive Parallax Hero Section */}
      <section className="relative flex items-end overflow-hidden" style={{ height: '75vh', position: 'relative', display: 'flex', alignItems: 'flex-end', paddingBottom: '60px' }}>
        <Image
          src={getImageUrl(packageData.image)}
          alt={packageData.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ transform: 'scale(1.02)', filter: 'brightness(0.6)' }}
        />
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: `linear-gradient(rgba(0,0,0,0.15) 0%, rgba(5,5,5,1) 98%)`,
            zIndex: 1
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1300px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
          {/* Custom Breadcrumb / Back Button */}
          <Link href="/packages" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'white', textDecoration: 'none',
            background: 'rgba(255,255,255,0.06)', padding: '12px 24px', borderRadius: '50px', fontSize: '13px',
            fontWeight: 800, marginBottom: '35px', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.3s'
          }} className="hover-gold">
            <ArrowLeft size={18} /> Back to Packages
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ textTransform: 'uppercase', fontWeight: 900, letterSpacing: '4px', color: 'var(--primary-gold)', fontSize: '11px', background: 'rgba(212, 175, 55, 0.1)', padding: '4px 12px', borderRadius: '50px' }}>
                {packageData.type}
              </span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}></span>
              <span style={{ textTransform: 'uppercase', fontWeight: 800, letterSpacing: '3px', color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>
                {packageData.location}
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 950,
              lineHeight: 1.1, letterSpacing: '-2px', color: 'white', marginBottom: '24px'
            }}>{packageData.title}</h1>

            <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star fill="var(--primary-gold)" color="var(--primary-gold)" size={18} />
                <span style={{ fontSize: '16px', fontWeight: 900 }}>
                  {packageData.rating || '4.9'} <span style={{ opacity: 0.5, fontWeight: 600, fontSize: '13px' }}>(Verified Luxury Reviews)</span>
                </span>
              </div>
              <button onClick={handleWhatsAppShare} style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', padding: '10px 20px', borderRadius: '50px', transition: '0.3s' }} className="hover-gold">
                <Share2 size={16} /> Share on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Responsive Grid Layout */}
      <section className="container" style={{ marginTop: '20px', position: 'relative', zIndex: 20, maxWidth: '1300px', margin: '20px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '50px' }} className="mobile-stack">

          {/* Content Area */}
          <div className="main-content-area">
            {/* Elegant Tab Headers */}
            <div style={{
              display: 'flex', gap: '6px', padding: '6px', background: 'rgba(255,255,255,0.03)',
              borderRadius: '100px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '45px', overflowX: 'auto'
            }} className="no-scrollbar">
              {tabs.map(tab => (
                <button
                  key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: '1 0 auto', padding: '12px 20px', borderRadius: '100px', border: 'none',
                    background: activeTab === tab.id ? 'var(--gradient-gold)' : 'transparent',
                    color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.6)',
                    fontWeight: 900, cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {/* 1. Overview Tab */}
                {activeTab === 'overview' && (
                  <div style={{ padding: '0 8px' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 900, marginBottom: '24px', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Sparkles size={24} /> Curated Experience
                    </h2>
                    <p style={{ fontSize: '17px', lineHeight: 1.8, opacity: 0.75, marginBottom: '40px', fontWeight: 500 }}>
                      {packageData.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="mobile-stack">
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(212, 175, 55, 0.08)', padding: '16px', borderRadius: '18px', color: 'var(--primary-gold)' }}>
                          <Clock size={28} />
                        </div>
                        <div>
                          <p style={{ fontSize: '10px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 4px' }}>DURATION</p>
                          <p style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>{packageData.duration || '5 Days / 4 Nights'}</p>
                        </div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(212, 175, 55, 0.08)', padding: '16px', borderRadius: '18px', color: 'var(--primary-gold)' }}>
                          <Users size={28} />
                        </div>
                        <div>
                          <p style={{ fontSize: '10px', fontWeight: 900, color: 'var(--primary-gold)', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 4px' }}>GROUP SIZE</p>
                          <p style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>{packageData.group_size || 'Bespoke Private Group'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Day-by-Day Timeline Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 900, marginBottom: '35px', color: 'var(--primary-gold)' }}>
                      The Expedition Path
                    </h2>

                    <div style={{ position: 'relative', paddingLeft: '45px', marginLeft: '10px' }}>
                      {/* Timeline Line */}
                      <div style={{
                        position: 'absolute', top: '15px', left: '15px', bottom: '15px', width: '2px',
                        background: 'linear-gradient(to bottom, var(--primary-gold) 0%, rgba(212,175,55,0.1) 100%)'
                      }}></div>

                      {itineraryDays.map((day, idx) => (
                        <div key={idx} style={{ position: 'relative', marginBottom: '30px' }}>
                          {/* Circle Bullet */}
                          <div
                            onClick={() => toggleDay(idx)}
                            style={{
                              position: 'absolute', top: '2px', left: '-45px', width: '32px', height: '32px',
                              borderRadius: '50%', background: expandedDays[idx] ? 'var(--primary-gold)' : '#111',
                              border: '2px solid var(--primary-gold)', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, transition: 'all 0.3s'
                            }}
                          >
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: expandedDays[idx] ? 'black' : 'var(--primary-gold)' }}></div>
                          </div>

                          {/* Itinerary Accordion Card */}
                          <div style={{
                            background: 'rgba(255,255,255,0.02)', borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'all 0.3s'
                          }} className={expandedDays[idx] ? "card-active-border" : ""}>

                            {/* Card Trigger Header */}
                            <div
                              onClick={() => toggleDay(idx)}
                              style={{ padding: '24px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
                            >
                              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <span style={{ color: 'var(--primary-gold)', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                  {day.dayName}
                                </span>
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }}></span>
                                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>{day.dayTitle}</h3>
                              </div>
                              <span style={{
                                fontSize: '12px', fontWeight: 900, color: 'var(--primary-gold)',
                                transform: expandedDays[idx] ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s'
                              }}>
                                ▼
                              </span>
                            </div>

                            {/* Expandable Details Container */}
                            <AnimatePresence initial={false}>
                              {expandedDays[idx] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div style={{ padding: '0 30px 24px', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '20px' }}>
                                    <p style={{ fontSize: '15px', lineHeight: 1.7, opacity: 0.7, margin: 0, fontWeight: 500 }}>
                                      {day.description || "Exciting scenic excursions and sightseeing highlights. Contact concierge for bespoke route personalization options."}
                                    </p>
                                    <div style={{ display: 'flex', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
                                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                                        <MapPin size={12} color="var(--primary-gold)" /> Sightseeing
                                      </span>
                                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                                        <Coffee size={12} color="var(--primary-gold)" /> Meals: Breakfast & Dinner
                                      </span>
                                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                                        <Hotel size={12} color="var(--primary-gold)" /> Luxury Resort Stay
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Luxury Hotel Stays Tab */}
                {activeTab === 'hotels' && (
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 900, marginBottom: '24px', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Hotel size={24} /> Premium Accommodations
                    </h2>
                    <p style={{ fontSize: '16px', opacity: 0.7, marginBottom: '35px', lineHeight: 1.6 }}>
                      We partner strictly with elite-rated resorts to offer three distinguished categories of stays. Your choice determines the pricing tiers and booking benefits.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {hotelOptionsList.length > 0 ? (
                        hotelOptionsList.map((hotel, index) => {
                          const isDiamond = hotel.tier.toLowerCase().includes('diamond');
                          const isGold = hotel.tier.toLowerCase().includes('gold');
                          const cardGlowClass = isDiamond ? "diamond-tier-card" : isGold ? "gold-tier-card" : "silver-tier-card";
                          const labelBg = isDiamond ? 'var(--gradient-gold)' : isGold ? '#fffbeb' : '#f1f5f9';
                          const labelColor = isDiamond ? 'black' : isGold ? '#d97706' : '#475569';

                          return (
                            <motion.div
                              whileHover={{ y: -4 }}
                              key={index}
                              style={{
                                background: 'rgba(255,255,255,0.02)', borderRadius: '28px', padding: '30px',
                                border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden'
                              }}
                              className={cardGlowClass}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                                <div>
                                  <span style={{
                                    fontSize: '11px', fontWeight: 900, padding: '6px 16px', borderRadius: '50px',
                                    background: labelBg, color: labelColor, textTransform: 'uppercase', letterSpacing: '1px'
                                  }}>
                                    {hotel.tier}
                                  </span>
                                  <h3 style={{ fontSize: '22px', fontWeight: 900, marginTop: '16px', color: 'white' }}>{hotel.name}</h3>
                                </div>
                                <div style={{ display: 'flex', gap: '3px' }}>
                                  {Array.from({ length: hotel.stars }).map((_, i) => (
                                    <Star key={i} fill="var(--primary-gold)" color="var(--primary-gold)" size={16} />
                                  ))}
                                </div>
                              </div>

                              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0 0 24px', fontWeight: 500 }}>
                                {hotel.details || "Luxury rooms, valley panoramas, absolute privacy, and 24/7 client care assistance."}
                              </p>

                              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '20px' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                                  <CheckCircle size={14} color="var(--primary-gold)" /> Daily Buffet Breakfast
                                </span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                                  <Shield size={14} color="var(--primary-gold)" /> Handpicked & Audited
                                </span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                                  <Compass size={14} color="var(--primary-gold)" /> Prime Location
                                </span>
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div style={{ textAlign: 'center', padding: '50px 0', background: 'rgba(255,255,255,0.01)', borderRadius: '24px', opacity: 0.6 }}>
                          <Hotel size={40} style={{ marginBottom: '15px', color: 'var(--primary-gold)' }} />
                          <p>Top-rated 3-Star & 4-Star boutique accommodations included. Custom options shared during quotes.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. Inclusions & Exclusions Tab */}
                {activeTab === 'inclusions' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="mobile-stack">
                    {/* Inclusions Card */}
                    <div style={{ background: 'rgba(212, 175, 55, 0.03)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(212, 175, 55, 0.08)' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 900, marginBottom: '30px', color: 'var(--primary-gold)', display: 'flex', alignItems: 'center', gap: '12px', textTransform: 'uppercase', letterSpacing: '3px' }}>
                        <CheckCircle size={18} /> What's Included
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {inclusionsList.length > 0 ? inclusionsList.map((inc, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <Sparkles size={14} color="var(--primary-gold)" style={{ marginTop: '3px', flexShrink: 0 }} />
                            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>{inc}</p>
                          </div>
                        )) : (
                          <p style={{ opacity: 0.6 }}>Luxury stays, daily breakfast/dinner, private cars, and guide permits are included in full.</p>
                        )}
                      </div>
                    </div>

                    {/* Exclusions Card */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.01)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 900, marginBottom: '30px', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '12px', textTransform: 'uppercase', letterSpacing: '3px' }}>
                        <XCircle size={18} /> Exclusions
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {exclusionsList.length > 0 ? exclusionsList.map((exc, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', opacity: 0.55 }}>
                            <X size={14} color="#ef4444" style={{ marginTop: '3px', flexShrink: 0 }} />
                            <p style={{ fontSize: '15px', color: 'white', margin: 0, lineHeight: 1.5 }}>{exc}</p>
                          </div>
                        )) : (
                          <p style={{ opacity: 0.4 }}>Airfares, shopping incidentals, adventure ride fees, and lunch are not included.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Photo Gallery Tab */}
                {activeTab === 'gallery' && (
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 900, marginBottom: '25px', color: 'var(--primary-gold)' }}>
                      Visual Portfolio
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                      {galleryImages.map((img, idx) => (
                        <motion.div
                          whileHover={{ scale: 1.03, y: -4 }}
                          key={idx}
                          onClick={() => setLightboxImageIndex(idx)}
                          style={{
                            position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '260px',
                            cursor: 'zoom-in', border: '1px solid rgba(255,255,255,0.06)'
                          }}
                        >
                          <Image
                            src={getImageUrl(img)}
                            alt={`Gallery image ${idx}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 240px"
                            className="object-cover"
                            style={{ transition: '0.4s' }}
                          />
                          <div style={{
                            position: 'absolute', inset: 0, background: 'linear-gradient(transparent 70%, rgba(0,0,0,0.8) 100%)',
                            opacity: 0, transition: '0.3s', display: 'flex', alignItems: 'flex-end', padding: '16px'
                          }} className="gallery-img-overlay">
                            <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '1px' }}>EXPAND VIEW</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky Book This Trip Sidebar */}
          <aside style={{ position: 'relative' }}>
            <div style={{
              position: 'sticky', top: '110px', background: 'rgba(10, 10, 10, 0.7)',
              backdropFilter: 'blur(30px)', borderRadius: '40px', padding: '40px 35px',
              border: '1px solid rgba(212, 175, 55, 0.15)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '2px' }}>BEST VALUED PRICE</span>
                <span style={{ fontSize: '10px', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--primary-gold)', padding: '2px 8px', borderRadius: '4px', fontWeight: 900 }}>Elite Package</span>
              </div>
              <h3 style={{ fontSize: '40px', fontWeight: 950, color: 'white', marginBottom: '4px', letterSpacing: '-1.5px' }}>
                ₹{packageData.price.toLocaleString()}
              </h3>
              <p style={{ fontSize: '13px', fontWeight: 600, opacity: 0.5, marginBottom: '35px' }}>per guest • premium hospitality included</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '35px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px 18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <Shield size={18} color="var(--primary-gold)" />
                  <p style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>Fully Insured Custom Itinerary</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px 18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <CalendarCheck size={18} color="var(--primary-gold)" />
                  <p style={{ fontSize: '13px', fontWeight: 800, margin: 0 }}>Flexible Booking & Date Shifts</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppBook}
                  style={{
                    width: '100%', padding: '20px', borderRadius: '50px', border: 'none',
                    background: 'var(--gradient-gold)', color: 'black', fontSize: '15px', fontWeight: 950,
                    textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 20px 40px rgba(212, 175, 55, 0.25)',
                    cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                  }}
                >
                  <MessageSquare size={18} /> Book via WhatsApp
                </motion.button>

                <button
                  onClick={() => setShowEnquiryModal(true)}
                  style={{
                    width: '100%', padding: '18px', borderRadius: '50px',
                    background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }}
                  className="hover-gold"
                >
                  Request Quote Details
                </button>
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 800, letterSpacing: '0.5px', lineHeight: 1.5 }}>
                  * No pre-payment necessary. Our travel concierge will reach you within 2 hours to details customized requirements.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Dynamic Lightbox Modal Overlay */}
      {lightboxImageIndex !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.98)', zIndex: 99999, display: 'flex',
          alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(15px)'
        }}>
          {/* Close Lightbox */}
          <button
            onClick={() => setLightboxImageIndex(null)}
            style={{
              position: 'absolute', top: '30px', right: '30px', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer',
              padding: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: '0.3s'
            }}
            className="hover-gold"
          >
            <X size={24} />
          </button>

          {/* Nav Left */}
          <button
            onClick={() => setLightboxImageIndex(prev => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
            style={{
              position: 'absolute', left: '30px', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer',
              padding: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: '0.3s'
            }}
            className="hover-gold"
          >
            <ArrowLeft size={24} />
          </button>

          {/* Photo Container */}
          <div style={{ maxWidth: '85vw', maxHeight: '80vh', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={getImageUrl(galleryImages[lightboxImageIndex])}
              alt={`Gallery image index ${lightboxImageIndex}`}
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 30px 60px rgba(0,0,0,0.7)' }}
            />
            <p style={{ marginTop: '20px', fontSize: '13px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              IMAGE {lightboxImageIndex + 1} OF {galleryImages.length}
            </p>
          </div>

          {/* Nav Right */}
          <button
            onClick={() => setLightboxImageIndex(prev => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
            style={{
              position: 'absolute', right: '30px', background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer',
              padding: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: '0.3s', transform: 'rotate(180deg)'
            }}
            className="hover-gold"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
      )}

      {/* Floating Sticky Mobile Booking Bar */}
      <div className="mobile-only-booking-bar" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(25px)',
        borderTop: '1px solid rgba(255,215,0,0.2)', padding: '16px 24px',
        display: 'none', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 999, boxShadow: '0 -20px 40px rgba(0,0,0,0.8)'
      }}>
        <div>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', margin: 0, fontWeight: 800 }}>Best Deal Price</p>
          <h4 style={{ fontSize: '20px', fontWeight: 950, color: 'var(--primary-gold)', margin: 0 }}>₹{packageData.price.toLocaleString()}</h4>
        </div>
        <button
          onClick={handleWhatsAppBook}
          style={{
            background: 'var(--gradient-gold)', color: 'black', border: 'none',
            padding: '12px 24px', borderRadius: '30px', fontWeight: 950, fontSize: '12px',
            textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)'
          }}
        >
          <MessageSquare size={14} /> Book Now
        </button>
      </div>

      {/* Luxury Enquiry Modal */}
      <AnimatePresence>
        {showEnquiryModal && (
          <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(15px)', zIndex: 9999 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.93, y: 30 }}
              style={{ background: '#0e0e0e', width: '100%', maxWidth: '600px', borderRadius: '32px', padding: '50px', position: 'relative', border: '1px solid rgba(255,215,0,0.18)' }}
            >
              <button onClick={() => setShowEnquiryModal(false)} style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.5 }} className="hover-gold"><X size={26} /></button>

              {enquiryStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                    <CheckCircle size={48} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 900, color: 'white', marginBottom: '10px' }}>Request Submitted</h2>
                  <p style={{ opacity: 0.6, fontSize: '16px' }}>Our premium travel specialists will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 950, color: 'white', marginBottom: '8px' }}>Begin Your Journey</h2>
                  <p style={{ opacity: 0.5, fontSize: '15px', marginBottom: '35px' }}>Specify your dates or personalized wishes, and we will tailor this expedition.</p>

                  <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="luxury-input-group">
                      <label style={{ fontSize: '10px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '1.5px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Distinguished Name</label>
                      <input required value={enquiryForm.name} onChange={e => setEnquiryForm({ ...enquiryForm, name: e.target.value })} type="text" placeholder="Full legal name" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px 20px', borderRadius: '14px', color: 'white', fontSize: '15px', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }} className="mobile-stack">
                      <div className="luxury-input-group">
                        <label style={{ fontSize: '10px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '1.5px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Electronic Mail</label>
                        <input required value={enquiryForm.email} onChange={e => setEnquiryForm({ ...enquiryForm, email: e.target.value })} type="email" placeholder="email@address.com" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px 20px', borderRadius: '14px', color: 'white', fontSize: '15px', outline: 'none' }} />
                      </div>
                      <div className="luxury-input-group">
                        <label style={{ fontSize: '10px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '1.5px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Contact Number</label>
                        <input value={enquiryForm.phone} onChange={e => setEnquiryForm({ ...enquiryForm, phone: e.target.value })} type="tel" placeholder="+91..." style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px 20px', borderRadius: '14px', color: 'white', fontSize: '15px', outline: 'none' }} />
                      </div>
                    </div>
                    <div className="luxury-input-group">
                      <label style={{ fontSize: '10px', fontWeight: 900, color: 'var(--primary-gold)', letterSpacing: '1.5px', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Bespoke Requests</label>
                      <textarea required value={enquiryForm.message} onChange={e => setEnquiryForm({ ...enquiryForm, message: e.target.value })} rows="3" placeholder="Share your travel dates or custom wishes..." style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px 20px', borderRadius: '14px', color: 'white', fontSize: '15px', outline: 'none', resize: 'none' }}></textarea>
                    </div>
                    <button type="submit" disabled={enquiryStatus === 'loading'} style={{
                      width: '100%', padding: '18px', borderRadius: '50px', border: 'none',
                      background: 'var(--gradient-gold)', color: 'black', fontSize: '14px', fontWeight: 950,
                      textTransform: 'uppercase', letterSpacing: '1.5px', cursor: 'pointer', transition: '0.3s', marginTop: '10px'
                    }}>
                      {enquiryStatus === 'loading' ? 'Submitting Details...' : 'Request Luxury Reservation'}
                    </button>
                    {enquiryStatus === 'error' && <p style={{ color: '#ef4444', textAlign: 'center', fontWeight: 700, fontSize: '13px' }}>Encountered an issue. Please retry.</p>}
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PackageDetails;
