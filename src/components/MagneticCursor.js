import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './MagneticCursor.css';

const MagneticCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(2)';
        cursorRef.current.style.borderColor = 'rgba(30, 64, 175, 0.6)';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1)';
        cursorRef.current.style.borderColor = 'rgba(30, 64, 175, 0.4)';
      }
    };

    window.addEventListener('mousemove', moveCursor);

    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .glassmorphic-card, .view-class-btn, .nav-link, .role-btn'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
      <motion.div
        ref={cursorDotRef}
        className="cursor-dot"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      />
    </>
  );
};

export default MagneticCursor;
