const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout"
// mongoose.connect(MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://WorkoutTrackerUser:WorkoutTrackerPW1@ds235840.mlab.com:35840/heroku_6ml9v6vw"
mongoose.connect(MONGODB_URI);

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

// app.get("/api/workouts/range", (req, res) => {
//     db.Workout.find({}, (error, data) => {
//         if (error) {
//             res.send(error);
//         } else {
//             res.json(data);
//         }
//     });
// });

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(7)
    .then(data => res.json(data))
    .catch(error => res.send(error));
});

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});


