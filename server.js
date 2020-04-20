const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 7500;

const db = require("./models")

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));


//api
app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(data => {
        console.log(data);
        res.json(data);
    });
});

app.put("/api/workouts", (req, res) => {
    db.Workout.find({_id: req.params.id}).then(data => {
        console.log(data[0].exercises)
        var exercises = data[0].exercises;
        exercises.push(req.body);
        db.Workout.findOneAndUpdate({_id:req.params.id}, {exercises:exercises}, (data) => {
            res.json(data);
        });
    });
});

app.post("/api/workouts", ({body}, res) => {
    db.Workout.create(body)
    .then();
});



//html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});

app.get("exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./exercise.html"))
});


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser:true
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`)
});