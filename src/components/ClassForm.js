import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useClassStore } from '../store/classStore';
import '../styles/ClassForm.css';

const ClassForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    description: '',
  });
  const addClass = useClassStore((state) => state.addClass);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClass = {
      id: Date.now(),
      ...formData,
      materials: [],
    };
    addClass(newClass);
    onClose();
  };

  return (
    <motion.form
      className="class-form"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label>Class Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Web Development 101"
          required
        />
      </div>

      <div className="form-group">
        <label>Instructor Name</label>
        <input
          type="text"
          name="teacher"
          value={formData.teacher}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the class"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Create Class
        </button>
        <button type="button" className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </motion.form>
  );
};

export default ClassForm;
