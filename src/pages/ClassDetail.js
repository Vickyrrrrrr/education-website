import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClassStore } from '../store/classStore';
import MaterialUpload from '../components/MaterialUpload';
import MaterialList from '../components/MaterialList';
import '../styles/ClassDetail.css';

const ClassDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const classes = useClassStore((state) => state.classes);
  const [showUpload, setShowUpload] = useState(false);
  
  const classItem = classes.find((cls) => cls.id === parseInt(classId));

  if (!classItem) {
    return (
      <div className="class-detail">
        <button onClick={() => navigate('/classes')}>Back to Classes</button>
        <p>Class not found</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="class-detail"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.button
        className="btn-back"
        onClick={() => navigate('/classes')}
        variants={itemVariants}
      >
        <i className="fas fa-arrow-left"></i> Back to Classes
      </motion.button>

      <motion.div className="class-header" variants={itemVariants}>
        <div className="header-content">
          <h1>{classItem.name}</h1>
          <p className="teacher-info">
            <i className="fas fa-chalkboard-user"></i> Instructor: {classItem.teacher}
          </p>
          <p className="class-desc">{classItem.description}</p>
        </div>
      </motion.div>

      <motion.div className="class-materials-section" variants={itemVariants}>
        <div className="section-header">
          <h2>Class Materials</h2>
          <button
            className="btn-upload"
            onClick={() => setShowUpload(!showUpload)}
          >
            <i className="fas fa-plus"></i> Upload Material
          </button>
        </div>

        {showUpload && <MaterialUpload classId={classItem.id} />}

        <MaterialList materials={classItem.materials} classId={classItem.id} />
      </motion.div>
    </motion.div>
  );
};

export default ClassDetail;
