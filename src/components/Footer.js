import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      whileInView="visible"
      variants={footerVariants}
      viewport={{ once: true }}
    >
      <div className="footer-container">
        <motion.div className="footer-section" variants={itemVariants}>
          <h4>About LU ClassHub</h4>
          <p>A resource sharing platform for University of Lucknow B.Tech students and faculty. Upload, share, and access course materials seamlessly.</p>
          <div className="social-links">
            <a href="https://github.com/Vickyrrrrrr" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/vicky-nishad-117855369/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/vicky.socials/?hl=en" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div className="footer-bottom" variants={itemVariants}>
        <p>&copy; 2025 University of Lucknow - LU ClassHub. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
