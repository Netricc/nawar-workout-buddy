const express = require("express");
const cors = require("cors");
const workoutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000/",
      "https://nawar-workout-buddy.vercel.app/",
    ],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to the Database");
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connect faild to the Database: ", error);
  });
