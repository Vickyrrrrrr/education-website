import React from 'react';
import { motion } from 'framer-motion';
import '../styles/FeaturesSection.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'fas fa-cloud-upload-alt',
      title: 'Easy Upload',
      description: 'Faculty can upload lecture notes, PDFs, videos, and study materials for B.Tech students',
    },
    {
      icon: 'fas fa-download',
      title: 'Quick Download',
      description: 'B.Tech students can instantly download course materials shared by faculty',
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'B.Tech Programs',
      description: 'All major B.Tech branches - CSE, ECE, ME, CE, EE, and IT in one platform',
    },
    {
      icon: 'fas fa-lock',
      title: 'Secure & Private',
      description: 'University-grade security to protect academic materials and student data',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile Friendly',
      description: 'Access B.Tech course materials from any device, anywhere on campus',
    },
    {
      icon: 'fas fa-university',
      title: 'University of Lucknow',
      description: 'Official platform for University of Lucknow B.Tech programs',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: {
      y: -10,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: { type: 'spring' },
    },
  };

  return (
    <motion.section
      className="features-section"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <div className="features-header">
        <h2>Platform Features</h2>
        <p>Everything you need for B.Tech education at University of Lucknow</p>
      </div>

      <motion.div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            variants={featureVariants}
            whileHover="hover"
          >
            <div className="feature-icon">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;
