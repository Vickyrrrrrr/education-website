import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useClassStore } from '../store/classStore';
import '../styles/ClassDashboardMinimal.css';

const ClassDashboard = () => {
  const classes = useClassStore((state) => state.classes);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="class-dashboard-minimal">
      <motion.div 
        className="dashboard-header-minimal"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Your Classes</h1>
        <p>Select a subject to view materials</p>
      </motion.div>

      <motion.div 
        className="classes-grid-minimal"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {classes.map((classItem, index) => (
          <motion.div key={classItem.id} variants={itemVariants}>
            <Link to={`/class/${classItem.id}`} className="class-card-minimal">
              <div className="card-content-minimal">
                <div className="card-icon">
                  <i className="fas fa-book"></i>
                </div>
                <div className="card-info">
                  <h3>{classItem.name}</h3>
                  <p className="teacher">{classItem.teacher}</p>
                  <div className="card-meta">
                    <span className="material-count">
                      {classItem.materials.length} materials
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-arrow">
                <i className="fas fa-chevron-right"></i>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ClassDashboard;
