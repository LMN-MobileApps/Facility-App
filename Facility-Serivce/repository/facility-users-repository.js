//const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var mongoCon = require('../db-connection.json');
// var Schema = mongoose.Schema;

// var schema = new Schema({
//     userId: {type: String},
//     userRole: {type: String},
//     active: {type: Boolean}
//  }, { strict: false, '__v': false });

// var FacilityUser = mongoose.model(mongoCon.loadCollection.facility_users, schema, mongoCon.loadCollection.facility_users);

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
} 
