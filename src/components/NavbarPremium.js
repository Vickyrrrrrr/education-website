import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';
import '../styles/NavbarPremium.css';

const Navbar = ({ userRole, setUserRole, isAuthenticated, currentUser, handleLogout }) => {
  const navigate = useNavigate();

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

  const onLogout = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <motion.nav className="navbar" initial="hidden" animate="visible" variants={navVariants}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-graduation-cap"></i> LU ClassHub
        </Link>

        <div className="navbar-menu">
          {!isAuthenticated ? (
            <motion.div className="auth-buttons" variants={itemVariants}>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/signup" className="signup-btn">
                Sign Up
              </Link>
            </motion.div>
          ) : (
            <motion.div className="user-info" variants={itemVariants}>
              <span className="welcome-text">Welcome, {currentUser?.name?.split(' ')[0] || 'User'}</span>
              <button className="logout-btn" onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </motion.div>
          )}

          {isAuthenticated && (
            <motion.div className="role-switch" variants={itemVariants}>
              <button
                className={`role-btn ${userRole === 'student' ? 'active' : ''}`}
                onClick={() => setUserRole('student')}
                disabled={currentUser?.role === 'teacher'}
              >
                <span>Student</span>
              </button>
              <button
                className={`role-btn ${userRole === 'teacher' ? 'active' : ''}`}
                onClick={() => setUserRole('teacher')}
                disabled={currentUser?.role === 'student'}
              >
                <span>Faculty</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
