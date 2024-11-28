import React, { useState } from 'react';
import axios from 'axios';
import './students.css'; // Import the CSS file

const Students = () => {
  const [course_name, setcourse_name] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8081/api/students/by-course-name',
        { course_name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setStudents(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch students. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (course_name.trim() === '') {
      setError('Course name cannot be empty.');
      return;
    }
    fetchStudents();
  };

  return (
    <div className="students-container">
      <h1>Students</h1>
      <form onSubmit={handleSubmit} className="students-form">
        <label>
          Enter course name:
          <input
            type="text"
            value={course_name}
            onChange={(e) => setcourse_name(e.target.value)}
            className="course-input"
          />
        </label>
        <button type="submit" className="submit-button">
          Get Students
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="students-list">
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="student-card">
              <p><strong>Student ID:</strong> {student.student_id}</p>
              <p><strong>Student Name:</strong> {student.student_name || 'N/A'}</p>
              <p><strong>Course Name:</strong> {student.course_name || 'N/A'}</p>
              <p><strong>Specialization:</strong> {student.specialization}</p>
              <p><strong>Grade:</strong> {student.grade}</p>
              <p><strong>Comments:</strong> {student.comments}</p>
            </div>
          ))
        ) : (
          <p className="no-students">No students found for this course.</p>
        )}
      </div>
    </div>
  );
};

export default Students;
