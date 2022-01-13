var MongoClient = require('mongodb').MongoClient;
var mongoCon = require('../db-connection.json');

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
                if (err) { throw err;}
                else {
                    callback({"status":"Ticket created successfully!","message":`Your Ticket ID ${ticketObj.ticketId} is on progress team will get back to you`});
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

    getStatusTicketsForEmployee(id,callback){
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.facility_tickets).find({createdBy:id}).toArray( function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs);
                }
                db.close();
            });
        });
    }
}