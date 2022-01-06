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

    createNewTicket(ticketObj, callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.facility_tickets).insertOne(ticketObj, function(err, docs) {
                if (err) { throw err;}
                else {
                    callback("Ticket Successfully created");
                }
                db.close();
            });
        });
    }
}