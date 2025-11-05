import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import AnimatedBackgroundPremium from './AnimatedBackgroundPremium';
import '../styles/HeroSectionPremium.css';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <motion.section
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <AnimatedBackgroundPremium />
        </Canvas>
      </div>

      <motion.div className="hero-content" variants={containerVariants}>
        <motion.h1 variants={itemVariants}>
          <span className="highlight">LU ClassHub</span>
        </motion.h1>
        <motion.p variants={itemVariants}>
          Share and Access B.Tech Resources - University of Lucknow
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link to="/classes" className="cta-button">
            Browse Resources
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
