import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../styles/GlassmorphicCard.css';
import '../styles/ClassDashboardUltra.css';

const GlassmorphicCardUltra = ({ children, className = '', delay = 0 }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    // Update mouse position for gradient effect
    const percentX = (mouseX / width) * 100;
    const percentY = (mouseY / height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${percentX}%`);
    cardRef.current.style.setProperty('--mouse-y', `${percentY}%`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glassmorphic-card ${className}`}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="card-glow"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />
      <div style={{ transform: 'translateZ(20px)', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default GlassmorphicCardUltra;
