import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Navbar.css';
import '../styles/NavbarPremium.css';

const Navbar = ({ userRole, setUserRole, isAuthenticated, currentUser, handleLogout }) => {
  const navigate = useNavigate();
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

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  const onLogout = () => {
    handleLogout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <motion.nav className="navbar" initial="hidden" animate="visible" variants={navVariants}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-graduation-cap"></i> LU ClassHub
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {!isAuthenticated ? (
                <div className="mobile-auth-buttons">
                  <Link 
                    to="/login" 
                    className="login-btn"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="signup-btn"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <>
                  <div className="mobile-user-info">
                    <span className="welcome-text">
                      Welcome, {currentUser?.name?.split(' ')[0] || 'User'}
                    </span>
                  </div>
                  
                  {isAuthenticated && (
                    <div className="mobile-role-switch">
                      <button
                        className={`role-btn ${userRole === 'student' ? 'active' : ''}`}
                        onClick={() => {
                          setUserRole('student');
                          setMobileMenuOpen(false);
                        }}
                        disabled={currentUser?.role === 'teacher'}
                      >
                        <span>Student</span>
                      </button>
                      <button
                        className={`role-btn ${userRole === 'teacher' ? 'active' : ''}`}
                        onClick={() => {
                          setUserRole('teacher');
                          setMobileMenuOpen(false);
                        }}
                        disabled={currentUser?.role === 'student'}
                      >
                        <span>Faculty</span>
                      </button>
                    </div>
                  )}

                  <button className="mobile-logout-btn" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
