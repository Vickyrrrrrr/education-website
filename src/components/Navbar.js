import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';

const Navbar = ({ userRole, setUserRole }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav className="navbar" initial="hidden" animate="visible" variants={navVariants}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-graduation-cap"></i> LU ClassHub
        </Link>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <motion.div className="navbar-links" variants={navVariants}>
            <motion.div variants={itemVariants}>
              <Link to="/">Home</Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/classes">Classes</Link>
            </motion.div>
            {userRole === 'teacher' && (
              <motion.div variants={itemVariants}>
                <Link to="/teacher-panel">Teacher Panel</Link>
              </motion.div>
            )}
          </motion.div>

          <motion.div className="navbar-actions" variants={navVariants}>
            <motion.select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="role-selector"
              variants={itemVariants}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </motion.select>
            <motion.button className="btn-login" variants={itemVariants}>
              Login
            </motion.button>
          </motion.div>
        </div>

        <div
          className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
