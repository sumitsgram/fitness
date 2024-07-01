// src/components/GoalList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GoalList.css";

const GoalList = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("/api/goals");
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  return (
    <div className="goal-list">
      <h2>Goals</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>
            <Link to={`/goals/${goal._id}`}>{goal.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/add-goal" className="add-goal-button">
        Add Goal
      </Link>
    </div>
  );
};

export default GoalList;
