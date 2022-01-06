const express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

const UserService = require("../service/facility-users-service");

router.get('/getAllActiveUsers', function(req, res){
    var svc = new UserService();
    svc.getActiveUsers(function(result) {
        res.send(result);
    })
});


router.get('/getUserRoleById/:id', (req, res) => {
    var svc = new UserService();
    svc.getUserRole(req.params.id.toUpperCase(), function(result) {
        res.send(result);
    })
});


router.get('/userLogin', function(req, res){
    var svc = new UserService();
    svc.getRoleOfUser(req.body.id,req.body.password,function(result) {
        res.send(result);
    })
});

router.post('/createTicket', (req, res) => {
    
    var svc = new UserService();
    svc.createTicket(req.body,function(result){
        res.send(result);
    })
});

module.exports = router;