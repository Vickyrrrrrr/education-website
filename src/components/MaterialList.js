import React from 'react';
import { motion } from 'framer-motion';
import { useClassStore } from '../store/classStore';
import '../styles/MaterialList.css';

const MaterialList = ({ materials, classId }) => {
  const deleteMaterial = useClassStore((state) => state.deleteMaterial);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: {
      x: 5,
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    },
  };

  const getFileIcon = (type) => {
    const icons = {
      pdf: 'fas fa-file-pdf',
      pptx: 'fas fa-file-powerpoint',
      doc: 'fas fa-file-word',
      video: 'fas fa-file-video',
      other: 'fas fa-file',
    };
    return icons[type] || 'fas fa-file';
  };

  return (
    <motion.div
      className="material-list"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {materials.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-inbox"></i>
          <p>No materials uploaded yet</p>
        </div>
      ) : (
        materials.map((material) => (
          <motion.div
            key={material.id}
            className="material-item"
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="material-info">
              <i className={`file-icon ${getFileIcon(material.type)}`}></i>
              <div className="material-details">
                <h4>{material.name}</h4>
                <span className="material-meta">
                  {material.size} • {material.date}
                </span>
              </div>
            </div>
            <div className="material-actions">
              <motion.button
                className="btn-download"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-download"></i> Download
              </motion.button>
              <motion.button
                className="btn-delete"
                onClick={() => deleteMaterial(classId, material.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-trash"></i>
              </motion.button>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default MaterialList;
