const express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;

const MasterDataRepository = require('../repository/master-data-repository');

router.get('/getAllFacilityUsers', (req, res) => {
    var repo = new MasterDataRepository();
    repo.getAllFacilityUsers(function(result) {
        res.send(result);
    })
});

router.get('/getAllLocation', (req, res) => {
    var repo = new MasterDataRepository();
    repo.getAllLocation(function(result) {
        res.send(result);
    })
});

router.get('/getAllLocationFloor', (req, res) => {
    var repo = new MasterDataRepository();
    repo.getAllLocationFloor(function(result) {
        res.send(result);
    })
});

router.get('/getAllTicketProblemType', (req, res) => {
    var repo = new MasterDataRepository();
    repo.getAllTicketProblemType(function(result) {
        res.send(result);
    })
});

router.get('/getAllTicketServices', (req, res) => {
    var repo = new MasterDataRepository();
    repo.getAllTicketServices(function(result) {
        res.send(result);
    })
});

router.get('/getAllTicketStatus', (req, res) => {
    var repo = new MasterDataRepository();
    repo.getAllTicketStatus(function(result) {
        res.send(result);
    })
});

module.exports = router;