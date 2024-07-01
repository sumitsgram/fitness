// src/components/Progress.js

import React, { useEffect, useState } from "react";
import "./Progress.css";

const Progress = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        // Replace with actual API endpoint to fetch progress data
        const response = await fetch("/api/progress");
        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className="progress-container">
      <h2>Progress</h2>
      {progressData.length > 0 ? (
        <ul className="progress-list">
          {progressData.map((item) => (
            <li key={item.id}>
              <p>
                <strong>Date:</strong> {item.date}
              </p>
              <p>
                <strong>Weight:</strong> {item.weight} lbs
              </p>
              {/* Add more progress metrics as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No progress data available</p>
      )}
    </div>
  );
};

export default Progress;
