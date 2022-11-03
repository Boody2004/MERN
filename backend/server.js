const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const logging = require("./middleware/logging");
const workoutRouts = require("./routes/workouts");

// dotenv configuration
dotenv.config();

// express app
const app = express();

// middleware
app.use(express.json());

app.use(logging);

// routes
app.use("/api/workouts", workoutRouts);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on part", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
