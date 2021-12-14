var express = require('express');
var router = express.Router();
var devMongoDB = require('./db-connection');
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});


// Define the home page route
router.get('/home', function(req, res) {
    res.send('Home');
});

// Define the about route
router.get('/about', function(req, res) {
  res.send('About us');
});


module.exports = router;