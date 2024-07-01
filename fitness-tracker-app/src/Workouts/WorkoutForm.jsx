// src/components/WorkoutForm.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WorkoutForm.css";

const WorkoutForm = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [form, setForm] = useState({
    name: "",
    date: "",
    duration: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchWorkoutDetails = async () => {
        try {
          const response = await fetch(`/api/workouts/${id}`);
          const data = await response.json();
          setForm({
            name: data.name,
            date: data.date.split("T")[0],
            duration: data.duration,
            description: data.description,
          });
        } catch (error) {
          console.error("Error fetching workout details:", error);
        }
      };

      fetchWorkoutDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/workouts/${id}` : "/api/workouts";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        history.push("/workouts");
      } else {
        console.error("Error submitting workout form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting workout form:", error);
    }
  };

  return (
    <div className="workout-form-container">
      <h2>{isEditing ? "Edit Workout" : "Add Workout"}</h2>
      <form className="workout-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Duration (minutes):
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">
          {isEditing ? "Update Workout" : "Add Workout"}
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
