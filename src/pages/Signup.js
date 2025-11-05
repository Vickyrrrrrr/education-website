import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../config/supabaseClient';
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
  const navigate = useNavigate();

  const branches = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT'];

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
      setError('⚠️ Backend not configured. Please check console for setup instructions.');
      setLoading(false);
      return;
    }
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
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
        setError(`Database error: ${checkError.message}`);
        setLoading(false);
        return;
      }

      if (existingUser) {
        setError('Email already registered');
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
        setError(`Registration failed: ${insertError.message}`);
        setLoading(false);
        return;
      }

      if (!newUser) {
        setError('Failed to create account. Please try again.');
        setLoading(false);
        return;
      }

      // Set as current user
      localStorage.setItem('luClasshubCurrentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      setUserRole(newUser.role || 'student');
      
      navigate('/classes');
    } catch (err) {
      console.error('Signup error:', err);
      setError(`Registration failed: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
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
