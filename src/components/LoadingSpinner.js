import React from 'react';
import { motion } from 'framer-motion';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };

  const dotVariants = {
    animate: (i) => ({
      scale: [1, 1.5, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1,
        repeat: Infinity,
        delay: i * 0.2
      }
    })
  };

  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <motion.div className="loading-spinner-container">
          <motion.div
            className={`loading-spinner ${size}`}
            variants={spinnerVariants}
            animate="animate"
          >
            <div className="spinner-gradient"></div>
          </motion.div>
          <p className="loading-text">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={`loading-spinner ${size}`}
      variants={spinnerVariants}
      animate="animate"
    >
      <div className="spinner-gradient"></div>
    </motion.div>
  );
};

export const LoadingDots = () => {
  return (
    <div className="loading-dots">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="loading-dot"
          custom={i}
          variants={{
            animate: (i) => ({
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              transition: {
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }
            })
          }}
          animate="animate"
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
