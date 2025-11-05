import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarPremium from './components/NavbarPremium';
import MagneticCursor from './components/MagneticCursor';
import Home from './pages/Home';
import ClassDashboard from './pages/ClassDashboard';
import ClassDetail from './pages/ClassDetail';
import TeacherPanel from './pages/TeacherPanel';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

function App() {
  const [userRole, setUserRole] = useState('student'); // 'student' or 'teacher'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const user = localStorage.getItem('luClasshubCurrentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      setIsAuthenticated(true);
      setUserRole(userData.role || 'student');
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('luClasshubCurrentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUserRole('student');
  };

  return (
    <Router>
      <div className="app">
        <MagneticCursor />
        <NavbarPremium 
          userRole={userRole} 
          setUserRole={setUserRole}
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} setUserRole={setUserRole} />} />
          <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} setUserRole={setUserRole} />} />
          <Route path="/classes" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ClassDashboard /></ProtectedRoute>} />
          <Route path="/class/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ClassDetail /></ProtectedRoute>} />
          <Route path="/teacher-panel" element={<ProtectedRoute isAuthenticated={isAuthenticated}><TeacherPanel /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
