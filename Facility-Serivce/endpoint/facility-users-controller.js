const express = require('express');
var router = express.Router();

const UserService = require("../service/facility-users-service");

router.get('/getAllActiveUsers', function(req, res){
    var svc = new UserService();
    svc.getActiveUsers(function(result) {
        res.send(result);
    });
});


router.get('/getUserRoleById/:id', (req, res) => {
    var svc = new UserService();
    svc.getUserRole(req.params.id.toUpperCase(), function(result) {
        res.send(result);
    })
});

router.post('/userLogin', function(req, res){
    var svc = new UserService();
    svc.getUserDetails(req.body.id,req.body.password,function(result) {
        res.send(result);
    })
});

router.post('/giveFeedback', function(req, res) {
    var svc = new UserService();
    svc.giveFeedback(req.body, function(result) {
        res.send(result);
    })
});

router.get('/getTopRated', function(req, res) {
    var svc = new UserService();
    svc.getFeedback( function(result) {
        res.send(result);
    })
});

router.get('/teamAwards', function(req, res){
    var svc = new UserService();
    svc.getTeamAwards(function(result) {
        res.send(result);
    });
});


module.exports = router;
