const UserRepository = require("../repository/facility-users-repository");
var user=require("../assets/user.json");
var user=require("../assets/user-role.json");

var userList = [];
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

    getRoleOfUser(id,pass,callback){
       var repo=new UserRepository();
       repo.getUserById(id,pass,function(result){
           if(result)
           {
            repo.getRole(id,function(result){
                callback(result);
            });
           }
           else{
               callback();
           }
       });
    }
 
}
