const express = require("express");
const path = require("path");
const db = require("../../models");

var apiRoutes = express.Router();

apiRoutes.get('/api/workouts', async function(req, res){
    let result = await db.Workout.find({});
    res.json(result);
});

apiRoutes.put('/api/workouts/:id', async function(req, res){
    let id = req.params.id;
    let exercise = req.body;
    if (!id) {
        console.log('not ID!');
    } else {
        await db.Workout.findByIdAndUpdate(id, {$push: {exercises: exercise}});
        res.json({'id': id});
    }
});

apiRoutes.post('/api/workouts', async function(req, res){
    let workout = new db.Workout({exercises: []});
    let result = await workout.save();
    res.send(result);
});

apiRoutes.get('/api/workouts/range', async function(req, res){
    let result = await db.Workout.find({});
    res.json(result);
});

module.exports = apiRoutes;