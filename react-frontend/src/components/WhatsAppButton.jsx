import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/919099599331" 
      target="_blank" 
      rel="noreferrer" 
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} fill="white" color="white" />
    </a>
  );
};

export default WhatsAppButton;
