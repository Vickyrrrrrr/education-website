import React from 'react';
import { motion } from 'framer-motion';
import HeroSectionPremium from '../components/HeroSectionPremium';
import '../styles/Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  return (
    <motion.div className="home" initial="hidden" animate="visible" variants={containerVariants}>
      <HeroSectionPremium />
    </motion.div>
  );
};

export default Home;
