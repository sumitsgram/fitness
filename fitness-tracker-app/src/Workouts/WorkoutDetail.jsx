// src/components/WorkoutDetails.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./WorkoutDetails.css";

const WorkoutDetails = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await fetch(`/api/workouts/${id}`);
        const data = await response.json();
        setWorkout(data);
      } catch (error) {
        console.error("Error fetching workout details:", error);
      }
    };

    fetchWorkoutDetails();
  }, [id]);

  if (!workout) {
    return <div>Loading...</div>;
  }

  return (
    <div className="workout-details">
      <h2>{workout.name}</h2>
      <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
      <p>Duration: {workout.duration} minutes</p>
      <p>Description: {workout.description}</p>
      <Link to={`/edit-workout/${workout._id}`} className="edit-workout-button">
        Edit Workout
      </Link>
    </div>
  );
};

export default WorkoutDetails;
