const express = require("express");
const path = require("path");

const htmlRoutes = express.Router();

htmlRoutes.get('/exercise', function(req, res){
    let exercisePage = path.join(__dirname, "../../public/exercise.html")
    res.sendFile(exercisePage);
});

htmlRoutes.get('/stats', function(req, res){
    let statsPage = path.join(__dirname, "../../public/stats.html")
    res.sendFile(statsPage);
});

htmlRoutes.get('/', function(req, res){
    res.send('index.html');
});

module.exports = htmlRoutes;