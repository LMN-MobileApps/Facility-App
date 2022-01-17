const TicketRepository = require("../repository/facility-tickets-repository");
const MasterDataRepository = require('../repository/master-data-repository');
userRole = require('../assets/user-role.json');

resArray=[]
module.exports = class TicketService {

    getAllTickets(callback) {
        var repo = new TicketRepository();
        repo.getAllTickets( function(result) {
            callback(result);
        });
    }

    createTicket(ticketObj, callback) {
        var repo = new TicketRepository();
        repo.getLengthOfCollection(function(len) {
            ticketObj.ticketId = "LT_" + len.toString();
            repo.createNewTicket(ticketObj, function(result) {
                callback(result);
            });
        });
    }

    getCategoryTicketsCount(category, facilityId, callback) {
        var repo = new TicketRepository();
        repo.getCategoryTickets(category, function(result) {
            var mdrepo = new MasterDataRepository();
            let totalTickets = 0, pendingTickets = 0, resolvedTickets = 0, rejectedTickets = 0, ticketsAssigned = 0;
            mdrepo.getAllTicketStatus(function(status) {
                totalTickets = result.length;
                status.forEach( s => {
                    result.forEach( r => {
                        if((s.statusCode == r.statusCode) && (s.statusType == "Pending")) {
                            pendingTickets = pendingTickets + 1;
                        }
                        else if((s.statusCode == r.statusCode) && (s.statusType == "Resolved")) {
                            resolvedTickets = resolvedTickets + 1;
                        }
                        else if((s.statusCode == r.statusCode) && (s.statusType == "Rejected")) {
                            rejectedTickets = rejectedTickets + 1;
                        }
                    });
                });

                result.forEach( r => {
                    if(r.assignedTo == facilityId) {
                        ticketsAssigned = ticketsAssigned + 1;
                    }
                });

                callback({
                    "TotalTickets": totalTickets,
                    "TotalTicketsAssigned": ticketsAssigned,
                    "PendingTickets": pendingTickets,
                    "ResolvedTickets": resolvedTickets,
                    "RejectedTickets": rejectedTickets
                });
            });
        });
    }
    
    editTicket(ticketObj, callback) {
        var repo = new TicketRepository();
        repo.editTicket(ticketObj, function(result) {
            callback(result);
        });
    }
}
