// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the updated CSS file

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/timetable')}>Show Timetable</button>
      <button onClick={() => navigate('/students')}>Show Students</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
