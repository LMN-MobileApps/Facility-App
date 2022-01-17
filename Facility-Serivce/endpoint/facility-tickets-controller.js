const express = require('express');
var router = express.Router();
const TicketService = require("../service/facility-tickets-service");

router.get('/getAllFacilityTickets', function(req, res) {
    var svc = new TicketService();
    svc.getAllTickets( function(result) {
        res.send(result);
    });
});

router.post('/createTicket', function(req, res) {
    var svc = new TicketService();
    svc.createTicket( req.body, function(result) {
        res.send(result);
    });
});

router.post('/dashboardFilter', function(req, res) {
    var svc = new TicketService();
    svc.getCategoryTicketsCount(req.body.category, req.body.userId, function(result) {
        res.send(result);
    });
});

router.put('/editTicket', function(req, res) {
    var svc = new TicketService();
    svc.editTicket(req.body, function(result) {
        res.send(result);
    });
});

module.exports = router;