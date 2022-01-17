var MongoClient = require('mongodb').MongoClient;
var mongoCon = require('../db-connection.json');
var user = require("../assets/user.json");
var userRole = require("../assets/user-role.json");

module.exports = class UserRepository {
    getAllUsers(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.facility_users).find({}).toArray(function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs);
                }
                db.close();
            });
        });
    }

    getUserRoleById(id, callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.facility_users).findOne({userId: id}, function(err, doc) {
                if (err) { throw err;}
                else {
                    callback(doc);
                }
                db.close();
            });
        });
    }
    getUserById(id,pass,callback){
        let flag=0;
        
        for(let i=0;i<user.length;i++)
        {
            if(user[i].userid==id)
            {
                if(user[i].password==pass){
                   
                    flag=1;
                }
            }
        }

        if(flag==1)
        {
            callback(true);
        }
        else{
            callback(false);
        }
    }

    getUserDetails(id,callback){
        let i;
        for(i=0;i<userRole.length;i++)
        {
            if(userRole[i].userid==id)
            {
                callback(userRole[i]);
            }
        }
    }
    getFeedback(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
            dbo.collection(mongoCon.loadCollection.facility_feedback).aggregate(
                        [
                            {
                           $group: {
                                  _id: "$ratedTo",
                                  ratings: { $avg: "$ratings" }
                                }
                            }
                        ]
                    ).toArray(function(err, res) {
                        if(err) throw err;
                        else {
                            callback(res);
                        }
                        db.close();
                    });
        });
    }
    dashboard(callback){
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
           
             dbo.collection(mongoCon.loadCollection.facility_tickets).aggregate([
                { $lookup:
                   {
                     from: mongoCon.loadCollection.ticket_status,
                     localField: 'statusCode',
                     foreignField: 'statusCode',
                     as: 'statusType'
                   }
                 },{ $lookup:
                    {
                      from: mongoCon.loadCollection.ticket_problem_type,
                      localField: 'problemCode',
                      foreignField: 'problemCode',
                      as: 'problemType'
                    }
                  }
                ]).toArray(function(err, res) {
                    if (err) throw err;
                    callback(res);
                    db.close();
                  });
          
        });
    }

    giveFeedback(obj, callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.facility_feedback).insertOne(obj, function(err, docs) {
                if (err) { throw err;}
                else {
                    callback({"message": "Feedback submitted successfully!"});
                }
                db.close();
            });
        });
    }

    getFeedback(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.facility_feedback).aggregate(
                        [
                            {
                              $group: {
                                  _id: "$ratedTo",
                                  ratings: { $avg: "$ratings" }
                                }
                            }
                        ]
                    ).toArray(function(err, res) {
                        if(err) throw err;
                        else {
                            callback(res);
                        }
                        db.close();
                    });
        });
    }

} 
