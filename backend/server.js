// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from environment variable or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI; // MongoDB URI from environment variable
mongoose.connect(MONGO_URI, {});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Define Workout Model
const Schema = mongoose.Schema;
const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Workout = mongoose.model("Workout", workoutSchema);

// Routes
app.get("/api/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    console.error("Error fetching workouts:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch workouts. Please try again." });
  }
});

app.post("/api/workouts", async (req, res) => {
  const { name, date, duration, description } = req.body;

  try {
    const newWorkout = new Workout({ name, date, duration, description });
    await newWorkout.save();
    res
      .status(201)
      .json({ message: "Workout created successfully", workout: newWorkout });
  } catch (err) {
    console.error("Error creating workout:", err);
    res
      .status(500)
      .json({ error: "Failed to create workout. Please try again." });
  }
});

app.get("/api/workouts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.json(workout);
  } catch (err) {
    console.error("Error fetching workout details:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch workout details. Please try again." });
  }
});

app.put("/api/workouts/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, duration, description } = req.body;

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { name, date, duration, description },
      { new: true }
    );
    if (!updatedWorkout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.json({
      message: "Workout updated successfully",
      workout: updatedWorkout,
    });
  } catch (err) {
    console.error("Error updating workout:", err);
    res
      .status(500)
      .json({ error: "Failed to update workout. Please try again." });
  }
});

app.delete("/api/workouts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    res.json({
      message: "Workout deleted successfully",
      workout: deletedWorkout,
    });
  } catch (err) {
    console.error("Error deleting workout:", err);
    res
      .status(500)
      .json({ error: "Failed to delete workout. Please try again." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
