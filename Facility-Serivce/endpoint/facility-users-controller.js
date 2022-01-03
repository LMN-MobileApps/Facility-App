const express = require('express');
var router = express.Router();

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

module.exports = router;
