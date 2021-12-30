var MongoClient = require('mongodb').MongoClient;
var mongoCon = require('../db-connection.json');

module.exports = class MasterDataRepository {
    getAllFacilityUsers(callback) {
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

    getAllLocation(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.location).find({}).toArray(function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs);
                }
                db.close();
            });
        });
    }

    getAllLocationFloor(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.location_floor).find({}).toArray(function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs);
                }
                db.close();
            });
        });
    }

    getAllTicketProblemType(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.ticket_problem_type).find({}).toArray(function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs);
                }
                db.close();
            });
        });
    }

    getAllTicketServices(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.ticket_services).find({}).toArray(function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs);
                }
                db.close();
            });
        });
    }

    getAllTicketStatus(callback) {
        const client = MongoClient.connect(mongoCon.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
            if (err) throw err;
            var dbo = db.db(mongoCon.targetDB);
    
            dbo.collection(mongoCon.loadCollection.ticket_staus).find({}).toArray(function(err, docs) {
                if (err) { throw err;}
                else {
                    callback(docs);
                }
                db.close();
            });
        });
    }
}