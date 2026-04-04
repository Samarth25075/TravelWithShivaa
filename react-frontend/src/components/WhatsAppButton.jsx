import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  const phoneNumber = "919313634723"; // Updated to your personal number
  const message = "Hi Shiv Travel! I'm interested in booking a tour. Can you please help me?";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '64px',
        height: '64px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
        zIndex: 9999
      }}
    >
      <MessageCircle size={32} />
      
      {/* Tooltip (Optional but looks premium) */}
      <div style={{
        position: 'absolute',
        right: '80px',
        backgroundColor: 'white',
        padding: '10px 20px',
        borderRadius: '12px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        color: '#333',
        fontWeight: 800,
        fontSize: '14px',
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
      }}>
        Chat on WhatsApp
      </div>
    </motion.div>
  );
};

export default WhatsAppButton;
