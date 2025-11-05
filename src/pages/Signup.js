import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../config/supabaseClient';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Auth.css';

const Signup = ({ setIsAuthenticated, setCurrentUser, setUserRole }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    branch: 'CSE'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const branches = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z\d]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
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
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setToast({ show: true, message: 'Passwords do not match', type: 'error' });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setToast({ show: true, message: 'Password must be at least 6 characters', type: 'warning' });
      setLoading(false);
      return;
    }

    try {
      // Check if email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', formData.email)
        .single();

      // If there's an error other than "not found", show it
      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Check email error:', checkError);
        setToast({ show: true, message: `Database error: ${checkError.message}`, type: 'error' });
        setLoading(false);
        return;
      }

      if (existingUser) {
        setToast({ show: true, message: 'Email already registered', type: 'warning' });
        setLoading(false);
        return;
      }

      // Create new user in Supabase
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            branch: formData.branch
          }
        ])
        .select()
        .single();

      if (insertError) {
        console.error('Insert error:', insertError);
        setToast({ show: true, message: `Registration failed: ${insertError.message}`, type: 'error' });
        setLoading(false);
        return;
      }

      if (!newUser) {
        setToast({ show: true, message: 'Failed to create account. Please try again.', type: 'error' });
        setLoading(false);
        return;
      }

      // Set as current user
      localStorage.setItem('luClasshubCurrentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      setUserRole(newUser.role || 'student');
      setToast({ show: true, message: 'Account created successfully! Welcome to LU ClassHub.', type: 'success' });
      
      setTimeout(() => navigate('/classes'), 500);
    } catch (err) {
      console.error('Signup error:', err);
      setToast({ show: true, message: `Registration failed: ${err.message || 'Unknown error'}`, type: 'error' });
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
          <h1>Join LU ClassHub</h1>
          <p>Create your account to get started</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">University Email</label>
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="teacher">Faculty</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className={`strength-fill strength-${
                      passwordStrength < 40 ? 'weak' : 
                      passwordStrength < 70 ? 'medium' : 'strong'
                    }`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
                <span className="strength-text">
                  {passwordStrength < 40 ? 'Weak' : 
                   passwordStrength < 70 ? 'Medium' : 'Strong'}
                </span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
