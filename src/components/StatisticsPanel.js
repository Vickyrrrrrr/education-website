import React from 'react';
import { motion } from 'framer-motion';
import '../styles/StatisticsPanel.css';

const StatisticsPanel = () => {
  const stats = [
    {
      icon: 'fas fa-users',
      value: '2,500+',
      label: 'Active Students',
      color: '#1e40af'
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      value: '150+',
      label: 'Expert Faculty',
      color: '#7c3aed'
    },
    {
      icon: 'fas fa-graduation-cap',
      value: '6',
      label: 'B.Tech Programs',
      color: '#f59e0b'
    },
    {
      icon: 'fas fa-file-alt',
      value: '10,000+',
      label: 'Study Materials',
      color: '#10b981'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="statistics-panel"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="stat-card"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <div className="stat-icon" style={{ color: stat.color }}>
            <i className={stat.icon}></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-value" style={{ textShadow: `0 0 20px ${stat.color}40` }}>
              {stat.value}
            </h3>
            <p className="stat-label">{stat.label}</p>
          </div>
          <div className="stat-glow" style={{ background: `radial-gradient(circle, ${stat.color}30, transparent)` }}></div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatisticsPanel;
