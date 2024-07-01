// src/components/Home.js

import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Workout Tracker</h1>
        <p>Track and manage your workouts efficiently.</p>
      </header>
      <main className="home-main">
        <section className="home-features">
          <h2>Features</h2>
          <ul>
            <li>View all your workouts</li>
            <li>Add new workouts</li>
            <li>Edit or delete workouts</li>
            <li>Set and track fitness goals</li>
          </ul>
        </section>
        <section className="home-about">
          <h2>About</h2>
          <p>
            Workout Tracker is a simple web application to help you track and
            manage your workout sessions. It allows you to add, edit, and delete
            workouts, keeping your fitness routine organized.
          </p>
        </section>
      </main>
      <footer className="home-footer">
        <p>&copy; 2024 Workout Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
