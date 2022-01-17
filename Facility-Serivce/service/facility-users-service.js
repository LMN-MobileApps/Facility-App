const UserRepository = require("../repository/facility-users-repository");
const TicketRepository = require("../repository/facility-tickets-repository");
var userRole = require("../assets/user-role.json");

var userList = [];
var closedTickets, newTickets;

class UserResponse {
    userId = "";
    userRole = "";

    setResponse(userId, userRole) {
        this.userId = userId;
        this.userRole = userRole;
    }
}

module.exports = class UserService {
   
    getActiveUsers(callback) {
        var repo = new UserRepository();
        repo.getAllUsers(function(result) {
            result.forEach(element => {
                if(element.active == true) {
                    var ur = new UserResponse();
                    ur.setResponse(element.userId, element.userRole);
                    userList.push(ur);
                }
            });
            callback(userList);
        });
    };

    getUserRole(id, callback) {
        var repo = new UserRepository();
        repo.getUserRoleById(id, function(result) {
            callback({"userRole": result.userRole});
        })
    }

    getUserDetails(id,pass,callback){
       var repo=new UserRepository();
       repo.getUserById(id,pass,function(result){
           if(result)
           {
            repo.getUserDetails(id,function(result){
                repo.getFeedback(function(feedback) {
                    feedback.forEach(f => {
                        if(f._id == id) {
                            result.ratings = f.ratings;
                        }
                    });
                    callback(result);
                });
            });
           }
           else{
               callback("User ID or Password Invalid");
           }
       });
    }

    giveFeedback(obj, callback) {
        var repo=new UserRepository();
        repo.giveFeedback(obj, function(result) {
            callback(result);
        });
    }

    getFeedback(callback) {
        var repo=new UserRepository();
        var ticketRepo = new TicketRepository();

        ticketRepo.getTicketsWithStatusTypeAndProblemType(function(res) {
            repo.getFeedback(function(result) {
                let resArray = [];
                closedTickets = 0, newTickets = 0;
                for( let r = 0; r < result.length; r++) {
                    for( let u = 0; u < userRole.length; u++) {
                        if(userRole[u].userid == result[r]._id) {
                            var allTickets = res;
                            for( let at = 0; at < allTickets.length; at++) {
                                if(allTickets[at].assignedTo == result[r]._id) {
                                    if(allTickets[at].statusType[0].statusType == "Pending") {
                                        newTickets++;
                                    }
                                    else if (allTickets[at].statusType[0].statusType == "Resolved" || allTickets[at].statusType[0].statusType == "Rejected") {
                                        closedTickets++;
                                    }
                                }
                            }
                            let temp = {}
                            temp = {"userId": result[r]._id, "name": userRole[u].name, "ratings": parseFloat(result[r].ratings.toFixed(2)), "role": userRole[u].role, "closedTickets": closedTickets, "newTickets": newTickets};
                            closedTickets = newTickets = 0;
                            resArray.push(temp);
                        }
                    }
                }
                callback(resArray);
            });
        });
    }
 
}
