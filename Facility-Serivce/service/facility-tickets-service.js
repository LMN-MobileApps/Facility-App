const TicketRepository = require("../repository/facility-tickets-repository");

module.exports = class TicketService {

    getAllTickets(callback) {
        var repo = new TicketRepository();
        repo.getAllTickets( function(result) {
            callback(result);
        });
    }

    createTicket(ticketObj, callback) {
        var repo = new TicketRepository();
        repo.createNewTicket(ticketObj, function(result) {
            callback(result);
        });
    }
}