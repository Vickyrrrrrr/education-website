import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useClassStore } from '../store/classStore';
import ClassForm from '../components/ClassForm';
import '../styles/TeacherPanel.css';

const TeacherPanel = () => {
  const [showNewClassForm, setShowNewClassForm] = useState(false);
  const classes = useClassStore((state) => state.classes);

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
      className="teacher-panel"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="panel-header" variants={itemVariants}>
        <h1>Faculty Control Panel - University of Lucknow</h1>
        <p>Manage B.Tech program materials and resources</p>
      </motion.div>

      <motion.div className="panel-stats" variants={itemVariants}>
        <div className="stat-card">
          <i className="fas fa-book"></i>
          <div className="stat-content">
            <h3>{classes.length}</h3>
            <p>Total Classes</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-file"></i>
          <div className="stat-content">
            <h3>{classes.reduce((sum, cls) => sum + cls.materials.length, 0)}</h3>
            <p>Total Materials</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-users"></i>
          <div className="stat-content">
            <h3>320</h3>
            <p>Active Students</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="create-class-section" variants={itemVariants}>
        <button
          className="btn-create-class"
          onClick={() => setShowNewClassForm(!showNewClassForm)}
        >
          <i className="fas fa-plus"></i> Create New Class
        </button>

        {showNewClassForm && <ClassForm onClose={() => setShowNewClassForm(false)} />}
      </motion.div>

      <motion.div className="classes-management" variants={itemVariants}>
        <h2>Your Classes</h2>
        <div className="management-table">
          <table>
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Description</th>
                <th>Materials</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem) => (
                <tr key={classItem.id}>
                  <td>
                    <strong>{classItem.name}</strong>
                  </td>
                  <td>{classItem.description}</td>
                  <td>
                    <span className="badge">{classItem.materials.length}</span>
                  </td>
                  <td>
                    <button className="btn-action btn-edit">
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button className="btn-action btn-delete">
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeacherPanel;
