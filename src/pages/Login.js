import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../config/supabaseClient';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Auth.css';

const Login = ({ setIsAuthenticated, setCurrentUser, setUserRole }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if Supabase is configured
    if (!supabase) {
      setToast({ show: true, message: 'Backend not configured. Please check setup.', type: 'error' });
      setLoading(false);
      return;
    }
    
    try {
      // Query Supabase for user with matching credentials
      const { data: users, error: queryError } = await supabase
        .from('users')
        .select('*')
        .eq('email', formData.email)
        .eq('password', formData.password)
        .single();

      if (queryError) {
        setToast({ show: true, message: 'Invalid email or password', type: 'error' });
        setLoading(false);
        return;
      }

      if (users) {
        // Store current user in localStorage
        localStorage.setItem('luClasshubCurrentUser', JSON.stringify(users));
        setCurrentUser(users);
        setIsAuthenticated(true);
        setUserRole(users.role || 'student');
        setToast({ show: true, message: 'Login successful! Welcome back.', type: 'success' });
        setTimeout(() => navigate('/classes'), 500);
      } else {
        setToast({ show: true, message: 'Invalid email or password', type: 'error' });
      }
    } catch (err) {
      setToast({ show: true, message: 'Login failed. Please try again.', type: 'error' });
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
      
      {loading && <LoadingSpinner fullScreen={true} />}
      
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Login to access LU ClassHub</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@student.lkouniv.ac.in"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
