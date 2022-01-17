const TicketRepository = require("../repository/facility-tickets-repository");
const MasterDataRepository = require('../repository/master-data-repository');
userRole = require('../assets/user-role.json');

result=[];
resArray=[];
empArray=[];
assignedToMeCount=0;
pendingTicketsCount=0;
resolvedTicketsCount=0;
rejectedTicketsCount=0;

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
    
    dashboard(id,callback){
        assignedToMeCount=0;
        pendingTicketsCount=0;
        resolvedTicketsCount=0;
        rejectedTicketsCount=0;
        var repo=new TicketRepository();
        repo.getTicketsWithStatusTypeAndProblemType(function(res){
            for(let i=0;i<res.length;i++)
            {
                if(res[i].assignedTo==id)
                {    
                    assignedToMeCount++;
                }
                if(res[i].statusType[0].statusType=="Pending")
                {
                    pendingTicketsCount++;
                }
                if(res[i].statusType[0].statusType=="Resolved")
                {
                    resolvedTicketsCount++;
                }
                if(res[i].statusType[0].statusType=="Rejected")
                {
                    rejectedTicketsCount++;
                }
            }
            resArray=[]
            let r={};
            r.TotalTickets=res.length;
            r.TicketsAssignedToMe=assignedToMeCount;
            r.PendingTickets=pendingTicketsCount;
            r.ResolvedTickets=resolvedTicketsCount;
            r.RejectedTickets=rejectedTicketsCount;
            resArray.push(r);

            callback(resArray);
        });  
    }

    getStatusTickets(id,callback) {
       var userrepo=new FacilityUserRepository();
        resArray=[];
        empArray=[];
        var role;
        var repo=new TicketRepository();
        userrepo.getRole(id,function(r){
            role=r.role;
        });

        repo.getTicketsWithStatusTypeAndProblemType(function(res){
            res.forEach(res=>{
                res.statusType=res.statusType[0].statusType;
                res.problemType=res.problemType[0].problemType;
                res.serviceName=res.serviceName[0].serviceName;
                resArray.push(res);
            });
            resArray.forEach( r=> {
                userRole.forEach(u => {
                    if(u.userid == r.createdBy) {
                        r.createdName = u.name;
                        r.createdEmail = u.email;
                    }
                    if(u.userid == r.assignedTo) {
                        r.facilityName = u.name;
                    }
                });
            });
            if(role=="Employee")
            {
                resArray.forEach(e=>{
                    if(e.createdBy==id)
                    {
                        empArray.push(e);
                    }
                });
                callback(empArray);
            }
            else{
                callback(resArray);
            }
        });
    }
    
    editTicket(ticketObj, callback) {
        var repo = new TicketRepository();
        repo.editTicket(ticketObj, function(result) {
            callback(result);
        });
    }
}
