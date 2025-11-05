import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useClassStore } from '../store/classStore';
import '../styles/MaterialUpload.css';

const MaterialUpload = ({ classId }) => {
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileType, setFileType] = useState('pdf');
  const [dragActive, setDragActive] = useState(false);
  const addMaterial = useClassStore((state) => state.addMaterial);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      setFileSize((file.size / 1024 / 1024).toFixed(2) + 'MB');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fileName) {
      const newMaterial = {
        id: Date.now(),
        name: fileName,
        size: fileSize,
        date: new Date().toISOString().split('T')[0],
        type: fileType,
      };
      addMaterial(classId, newMaterial);
      setFileName('');
      setFileSize('');
    }
  };

  return (
    <motion.form
      className={`material-upload ${dragActive ? 'drag-active' : ''}`}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="upload-area"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <i className="fas fa-cloud-upload-alt"></i>
        <p>Drag and drop your file here or click to select</p>
        <input type="file" hidden onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFileName(file.name);
            setFileSize((file.size / 1024 / 1024).toFixed(2) + 'MB');
          }
        }} />
      </div>

      {fileName && (
        <motion.div
          className="file-preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <i className="fas fa-file"></i>
          <div>
            <p>{fileName}</p>
            <span>{fileSize}</span>
          </div>
        </motion.div>
      )}

      <div className="form-group">
        <label>File Type</label>
        <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
          <option value="pdf">PDF</option>
          <option value="pptx">PowerPoint</option>
          <option value="doc">Document</option>
          <option value="video">Video</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" className="btn-upload-submit">
        <i className="fas fa-upload"></i> Upload Material
      </button>
    </motion.form>
  );
};

export default MaterialUpload;
