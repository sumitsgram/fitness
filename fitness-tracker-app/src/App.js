import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import WorkoutList from "./Workouts/WorkoutList";
import WorkoutForm from "./Workouts/WorkoutForm";
import WorkoutDetail from "./Workouts/WorkoutDetail";
import GoalList from "./Goals/GoalList";
import GoalForm from "./Goals/GoalForm";
import GoalDetail from "./Goals/GoalDetail";
import Profile from "./Profile";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Logout from "./Auth/Logout";
import Progress from "./Progress";
import Error from "./Error";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/workouts" exact element={<WorkoutList/>} />
        <Route path="/workouts/new" element={<WorkoutForm/>} />
        <Route path="/workouts/:id" element={<WorkoutDetail/>} />
        <Route path="/goals" exact element={<GoalList/>} />
        <Route path="/goals/new" element={<GoalForm/>} />
        <Route path="/goals/:id" element={<GoalDetail/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/progress" element={<Progress/>} />
        <Route element={<Error/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
