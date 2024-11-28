import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const name = "SpecializationName"; // Replace with the actual name you want to send

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:8081/api/courses/timetable',
          { name }, // Sending the name in the request body
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTimetable(response.data);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimetable();
  }, [name]); // Add `name` as a dependency in case it changes

  return (
    <div>
      <h1>Timetable</h1>
      <ul>
        {timetable.map((entry, index) => (
          <li key={index}>{entry.courseName} - {entry.facultyName}</li> // Modify based on your data structure
        ))}
      </ul>
    </div>
  );
};

export default Timetable;
