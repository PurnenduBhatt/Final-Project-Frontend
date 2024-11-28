import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/timetable')}>Show Timetable</button>
      <button onClick={() => navigate('/students')}>Show Students</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
