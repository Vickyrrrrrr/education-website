import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useClassStore } from '../store/classStore';
import GlassmorphicCardUltra from '../components/GlassmorphicCardUltra';
import ParticleBackground from '../components/ParticleBackground';
import '../styles/ClassDashboard.css';
import '../styles/ClassDashboardPremium.css';
import '../styles/ClassDashboardUltra.css';

const ClassDashboard = () => {
  const classes = useClassStore((state) => state.classes);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div className="class-dashboard" initial="hidden" animate="visible" variants={containerVariants}>
      <ParticleBackground />
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <h1>B.Tech Programs - University of Lucknow</h1>
        <p>Access course materials and resources for all B.Tech branches</p>
      </motion.div>

      <motion.div className="classes-grid">
        {classes.map((classItem, index) => (
          <GlassmorphicCardUltra key={classItem.id} delay={index * 0.15}>
            <div className="class-card">
              <div className="class-header">
                <h3>{classItem.name}</h3>
                <span className="material-count">
                  <i className="fas fa-book"></i> {classItem.materials.length} materials
                </span>
              </div>
              <p className="teacher-name">
                <i className="fas fa-user-tie"></i> {classItem.teacher}
              </p>
              <p className="class-description">{classItem.description}</p>
              <div className="class-stats">
                <div className="stat">
                  <i className="fas fa-file-pdf"></i>
                  <span>{classItem.materials.filter(m => m.type === 'pdf').length} PDFs</span>
                </div>
                <div className="stat">
                  <i className="fas fa-file-powerpoint"></i>
                  <span>{classItem.materials.filter(m => m.type === 'pptx').length} Slides</span>
                </div>
              </div>
              <Link to={`/class/${classItem.id}`} className="view-class-btn">
                <span>View Class</span>
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </GlassmorphicCardUltra>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ClassDashboard;
