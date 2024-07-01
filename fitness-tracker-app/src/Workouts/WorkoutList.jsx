// src/components/WorkoutList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./WorkoutList.css";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts");
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="workout-list">
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            <Link to={`/workouts/${workout._id}`}>{workout.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/add-workout" className="add-workout-button">
        Add Workout
      </Link>
    </div>
  );
};

export default WorkoutList;
