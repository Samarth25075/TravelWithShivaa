'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function IntroLoader({ onComplete }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate random particles once on mount using useMemo to avoid re-rendering layout changes
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of screen width
      y: Math.random() * 100, // percentage of screen height
      size: Math.random() * 3 + 1, // 1px to 4px
      duration: Math.random() * 4 + 4, // 4s to 8s
      delay: Math.random() * 2, // 0s to 2s
      driftX: Math.random() * 60 - 30, // drift left/right
      driftY: -(Math.random() * 80 + 40), // drift upwards
    }));
  }, []);

  // Stagger configurations for letter reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 120,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, letterSpacing: '2px', y: 10 },
    visible: {
      opacity: 0.6,
      letterSpacing: '6px',
      y: 0,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
        delay: 1.5,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 0.3,
      transition: {
        duration: 1.8,
        ease: 'easeInOut',
        delay: 0.8,
      },
    },
  };

  // Automatically trigger completion after animations finish
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200); // Give plenty of time for all animations to shine

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Split names for individual letter animation
  const travelLetters = ['T', 'r', 'a', 'v', 'e', 'l'];
  const bookLetters = ['B', 'o', 'o', 'k'];
  const shivaLetters = ['S', 'h', 'i', 'v', 'a'];

  return (
    <motion.div
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden select-none initial-intro-loader"
      style={{
        background: '#1A1A1A',
        zIndex: 99999, // Ensure it sits above absolute navbar and widgets
      }}
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 1.1, ease: [0.85, 0, 0.15, 1] },
      }}
    >
      {/* 1. Pulsing Ambient Background Gradients */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232, 102, 10, 0.08) 0%, transparent 70%)',
          top: '20%',
          left: '15%',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232, 102, 10, 0.06) 0%, transparent 70%)',
          bottom: '10%',
          right: '10%',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* 2. Floating Golden Particles (Dust Effect) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {isMounted && particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#E8660A]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              boxShadow: '0 0 8px rgba(232, 102, 10, 0.6)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0.7, 0],
              scale: [0, 1, 1, 0],
              x: [0, p.driftX],
              y: [0, p.driftY],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* 3. Main Center Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        {/* SVG Compass/Travel Indicator */}
        <div className="relative mb-6">
          <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#E8660A]">
            {/* Outer self-drawing ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1, rotate: 270 }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Outer dotted accent compass ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="3 3"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 0.5, rotate: -360 }}
              transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
            />
            {/* Center Compass Star */}
            <motion.path
              d="M50 16 L53.5 46.5 L84 50 L53.5 53.5 L50 84 L46.5 53.5 L16 50 L46.5 46.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              initial={{ pathLength: 0, fill: 'rgba(232, 102, 10, 0)' }}
              animate={{ pathLength: 1, fill: 'rgba(232, 102, 10, 0.08)' }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            />
            {/* Cardinal direction indicators (tiny dots) */}
            <motion.circle cx="50" cy="8" r="1.5" fill="#ffffff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
            <motion.circle cx="92" cy="50" r="1.5" fill="#ffffff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }} />
            <motion.circle cx="50" cy="92" r="1.5" fill="#ffffff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
            <motion.circle cx="8" cy="50" r="1.5" fill="#ffffff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }} />
          </svg>
        </div>

        {/* Brand Name with Staggered Letter Animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-[2px] md:gap-[4px] overflow-hidden py-1">
            {/* "Travel" part in White */}
            <span className="flex">
              {travelLetters.map((char, index) => (
                <motion.span
                  key={`travel-${index}`}
                  variants={letterVariants}
                  className="font-serif text-[32px] md:text-[46px] font-light text-[#ffffff] inline-block tracking-[0.02em]"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* "Book" part in Orange */}
            <span className="flex">
              {bookLetters.map((char, index) => (
                <motion.span
                  key={`book-${index}`}
                  variants={letterVariants}
                  className="font-serif text-[32px] md:text-[46px] font-light text-[#E8660A] inline-block tracking-[0.02em]"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            {/* "Shiva" part in White */}
            <span className="flex">
              {shivaLetters.map((char, index) => (
                <motion.span
                  key={`shiva-${index}`}
                  variants={letterVariants}
                  className="font-serif text-[32px] md:text-[46px] font-light text-[#ffffff] inline-block tracking-[0.02em]"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </div>

          {/* Thin Glowing Divider Line */}
          <motion.div
            variants={lineVariants}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#E8660A] to-transparent my-4 w-[200px] md:w-[280px]"
            style={{ transformOrigin: 'center' }}
          />

          {/* Subtitle */}
          <motion.p
            variants={subtitleVariants}
            className="font-sans text-[9px] md:text-[10px] uppercase font-semibold text-[#ffffff] opacity-60 tracking-[4px] md:tracking-[6px] mt-1"
          >
            Luxury Curated Adventures
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
