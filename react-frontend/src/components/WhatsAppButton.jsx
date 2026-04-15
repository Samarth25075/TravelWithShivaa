import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/919313634723" 
      target="_blank" 
      rel="noreferrer" 
      className="concierge-float"
      aria-label="Contact Concierge"
    >
      <div className="pulse-effect"></div>
      <span className="concierge-text">Luxury Concierge</span>
      <div className="concierge-icon-wrapper">
        <MessageCircle size={28} />
      </div>
    </a>
  );
};

export default WhatsAppButton;
