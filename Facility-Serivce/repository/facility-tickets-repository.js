var MongoClient = require('mongodb').MongoClient;
var mongoCon = require('../db-connection.json');
var user = require("../assets/user.json");
var userRole = require("../assets/user-role.json");

module.exports = class TicketRepository {

    getAllTickets(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.facility_tickets).find({}).toArray( function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs);
                }
                db.close();
            });
        });
    }

    getLengthOfCollection(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.facility_tickets).find({}).toArray( function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs.length + 1001);
                }
                db.close();
            });
        });
    }

    createNewTicket(ticketObj, callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.facility_tickets).insertOne(ticketObj, function(err, docs) {
                if (err) { callback({
                    "status": "Something went wrong!",
                    "message": "Please try again later."});
                    throw err;}
                else {
                    callback({
                        "status": "Ticket created successfully!",
                        "message": "Your Ticket ID " + ticketObj.ticketId + " is on progress team will get back to you",
                        "ticketId": ticketObj.ticketId.toString()});
                }
                db.close();
            });
        });
    }

    getTicketsWithStatusTypeAndProblemType(callback){
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

    getCategoryTickets(category, callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
            var query = { problemType: category };
            var probCode;

            dbo.collection(mongoCon.loadCollection.ticket_problem_type).findOne(query, function(err, doc) {
                if (err) { throw err;}
                else {
                    probCode = doc.problemCode;
                    query = { problemCode: probCode };

                    dbo.collection(mongoCon.loadCollection.facility_tickets).find(query).toArray( function(err, docs) {
                        if (err) { throw err;}
                        else {
                            callback(docs);
                        }
                        db.close();
                    });
                }
            });
        });
    }

    getTicketsByFacilityId(facilityId, callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
            var query = { assignedTo: facilityId };

            dbo.collection(mongoCon.loadCollection.facility_tickets).find(query).toArray( function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs);
                }
            });
        });
    }

    editTicket(ticketObj, callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
            var query = { ticketId: ticketObj.ticketId };

            dbo.collection(mongoCon.loadCollection.facility_tickets).updateOne(query, {$set: ticketObj}, function(err, docs) {
                if (err) { throw err;}
                else {
                    callback({"message": "Ticket updated successfully!"});
                }
            });
        });
    }
}