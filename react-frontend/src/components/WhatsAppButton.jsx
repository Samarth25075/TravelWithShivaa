'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const WhatsAppButton = () => {
  const { isGujarati } = useLanguage();
  const text = encodeURIComponent("Hi Shiv Travel! I want to enquire about a trip.");
  
  const tooltipText = isGujarati ? "વોટ્સએપ પર પૂછપરછ કરો" : "Enquire on WhatsApp";

  const pulseStyles = `
    @keyframes whatsapp-ripple {
      0% {
        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5), 0 0 0 1px rgba(37, 211, 102, 0.5);
      }
      50% {
        box-shadow: 0 0 0 12px rgba(37, 211, 102, 0.25), 0 0 0 1px rgba(37, 211, 102, 0.25);
      }
      100% {
        box-shadow: 0 0 0 24px rgba(37, 211, 102, 0), 0 0 0 1px rgba(37, 211, 102, 0);
      }
    }

    @keyframes whatsapp-entrance {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.8);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .whatsapp-btn-wrapper {
      position: fixed;
      bottom: calc(24px + env(safe-area-inset-bottom, 0px));
      right: calc(24px + env(safe-area-inset-right, 0px));
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: whatsapp-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .whatsapp-btn {
      background: #25D366 !important;
      color: white !important;
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      border: none !important;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4) !important;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
      animation: whatsapp-ripple 2s infinite ease-in-out !important;
      text-decoration: none !important;
      padding: 0 !important;
      margin: 0 !important;
      box-sizing: border-box !important;
    }

    .whatsapp-btn:hover {
      animation: none !important;
      transform: scale(1.1) rotate(8deg) !important;
      background: #20ba59 !important;
      box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6) !important;
    }

    .whatsapp-btn svg {
      width: 32px !important;
      height: 32px !important;
      display: block !important;
      margin: 0 !important;
      padding: 0 !important;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    .whatsapp-btn:hover svg {
      transform: scale(1.05) !important;
    }

    .whatsapp-badge {
      background: rgba(13, 13, 15, 0.9) !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
      border: 1.5px solid rgba(37, 211, 102, 0.4) !important;
      color: #f5f0e8 !important;
      padding: 12px 20px !important;
      border-radius: 30px !important;
      font-size: 13px !important;
      font-weight: 600 !important;
      white-space: nowrap !important;
      pointer-events: none !important;
      opacity: 0;
      transform: translateX(15px);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
      font-family: var(--font-sans), sans-serif !important;
      letter-spacing: 0.5px !important;
    }

    .whatsapp-btn-wrapper:hover .whatsapp-badge {
      opacity: 1 !important;
      transform: translateX(0) !important;
    }

    @keyframes tooltip-auto-reveal {
      0% {
        opacity: 0;
        transform: translateX(15px);
      }
      10% {
        opacity: 1;
        transform: translateX(0);
      }
      90% {
        opacity: 1;
        transform: translateX(0);
      }
      100% {
        opacity: 0;
        transform: translateX(15px);
      }
    }

    .whatsapp-badge-auto {
      animation: tooltip-auto-reveal 6s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
      animation-delay: 2s !important;
    }

    .whatsapp-btn-wrapper:hover .whatsapp-badge-auto {
      animation: none !important;
      opacity: 1 !important;
      transform: translateX(0) !important;
    }

    @media (max-width: 768px) {
      .whatsapp-badge {
        display: none !important;
      }
      .whatsapp-btn {
        width: 52px !important;
        height: 52px !important;
      }
      .whatsapp-btn svg {
        width: 28px !important;
        height: 28px !important;
      }
      .whatsapp-btn-wrapper {
        bottom: calc(16px + env(safe-area-inset-bottom, 0px)) !important;
        right: calc(16px + env(safe-area-inset-right, 0px)) !important;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pulseStyles }} />
      <div className="whatsapp-btn-wrapper">
        <div className="whatsapp-badge whatsapp-badge-auto">
          {tooltipText}
        </div>
        <a 
          href={`https://wa.me/919313634723?text=${text}`}
          target="_blank" 
          rel="noreferrer" 
          aria-label="Contact on WhatsApp"
          className="whatsapp-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;
