const TicketRepository = require("../repository/facility-tickets-repository");
const MasterDataRepository = require("../repository/master-data-repository");
var userRole=require("../assets/user-role.json");
const FacilityUserRepository=require("../repository/facility-users-repository");

result=[];
resArray=[]
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
        var role;
        var repo=new TicketRepository();
        userrepo.getRole(id,function(r){
            role=r.role;
        });
        console.log(role);
        if(role=="Employee")
        {
            repo.getStatusTicketsForEmployee(id, function(result) {
                callback(result);
            });
        }
        else{
        repo.getTicketsWithStatusTypeAndProblemType(function(res){
            res.forEach(res=>{
                res.statusType=res.statusType[0].statusType;
                res.problemType=res.problemType[0].problemType;
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
            callback(resArray);
        });
    }
    }

}