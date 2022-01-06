const express = require('express');
var router = express.Router();
const TicketService = require("../service/facility-tickets-service");

router.get('/getAllFacilityTickets', function(req, res) {
    var svc = new TicketService();
    svc.getAllTickets( function(result) {
        res.send(result);
    });
})

router.post('/createTicket', function(req, res) {
    var svc = new TicketService();
    console.log(req.body);
    svc.createTicket( req.body, function(result) {
        res.send(result);
    });
})

module.exports = router;