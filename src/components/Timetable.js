import React, { useState } from 'react';
import axios from 'axios';
import './Timetable.css';

const Timetable = () => {
  const [name, setName] = useState('');
  const [timetable, setTimetable] = useState([]);
  const [error, setError] = useState('');

  const fetchTimetable = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8081/api/courses/timetable',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setTimetable(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch timetable. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Name cannot be empty.');
      return;
    }
    fetchTimetable();
  };

  return (
    <div className="timetable-container">
      <h1>Timetable</h1>
      <form onSubmit={handleSubmit} className="timetable-form">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
        />
        <button type="submit" className="submit-button">
          Get Timetable
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="timetable-grid">
        {timetable.map((entry, index) => (
          <div key={index} className="timetable-card">
            <p><strong>Course:</strong> {entry.course_name}</p>
            <p><strong>Day:</strong> {entry.day_of_week}</p>
            <p><strong>Time:</strong> {entry.start_time}</p>
            <p><strong>Faculty:</strong> {entry.faculty}</p>
            <p><strong>Building:</strong> {entry.building}</p>
            <p><strong>Room Number:</strong> {entry.room_number}</p>
            <p><strong>Specialization:</strong> {entry.specialization}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
