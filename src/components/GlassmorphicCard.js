import React from 'react';
import { motion } from 'framer-motion';
import '../styles/GlassmorphicCard.css';

const GlassmorphicCard = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      className={`glassmorphic-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      <div className="card-glow"></div>
      {children}
    </motion.div>
  );
};

export default GlassmorphicCard;
