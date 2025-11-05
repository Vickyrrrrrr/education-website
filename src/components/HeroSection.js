import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import AnimatedBackground from './AnimatedBackground';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Canvas className="hero-canvas">
        <AnimatedBackground />
      </Canvas>

      <motion.div className="hero-content" variants={containerVariants}>
        <motion.h1 variants={itemVariants}>
          Welcome to <span className="highlight">LU ClassHub</span>
        </motion.h1>
        <motion.p variants={itemVariants}>
          University of Lucknow - B.Tech Programs Resource Platform
        </motion.p>
        <motion.div className="hero-buttons" variants={itemVariants}>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 100, 200, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
          <motion.button
            className="btn btn-secondary"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 150, 0, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
