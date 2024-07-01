// src/components/GoalDetails.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./GoalDetails.css";

const GoalDetails = () => {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    const fetchGoalDetails = async () => {
      try {
        const response = await fetch(`/api/goals/${id}`);
        const data = await response.json();
        setGoal(data);
      } catch (error) {
        console.error("Error fetching goal details:", error);
      }
    };

    fetchGoalDetails();
  }, [id]);

  if (!goal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="goal-details">
      <h2>{goal.title}</h2>
      <p>Due Date: {new Date(goal.dueDate).toLocaleDateString()}</p>
      <p>Description: {goal.description}</p>
      <Link to={`/edit-goal/${goal._id}`} className="edit-goal-button">
        Edit Goal
      </Link>
    </div>
  );
};

export default GoalDetails;
