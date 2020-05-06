const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Type is Required"
        },
        name: {
            type: String,
            trim: true,
            required: "Name is Required"
        },
        duration: {
            type: Number,
            unique: true,
            required: true
        },
        distance: {
            type: Number,
            unique: true
        },
        weight: {
            type: Number,
            unique: true
        },
        reps: {
            type: Number,
            unique: true
        },
        sets: {
            type: Number,
            unique: true
        }
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;