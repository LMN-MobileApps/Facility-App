var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoCon = require("../../../db-connection.js");
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});
//Get measure name API Service
router.get('/api/v1/ticket-status/getStatus', function(req, res) {		
    // send records as a response
   const runRequest = async() => {
		let continuedSuccess = await runGetCollection(mongoCon.loadCollection,mongoCon.targetDB,mongoCon.mongoURL);
		return  continuedSuccess;
	}
	runRequest().then(result => {
		if(result){
			
               res.status(200).json({message:"SUCCESS",'result' : result})
            
		}
		else{
            res.status(404).send({message:"FAILED",resp:{statusCode:res.statusCode,headers:res.headers}});
        }
		return result;
	}).catch((error) => {
        console.log(error);
		res.status(500).send(error);
	});  
});

/**********************************************************
 * GET Collection
 ********************************************************/
async function runGetCollection(collectionToGet,targetDb,mongoURL) {
    let url = 'mongodb://'+mongoURL+'/?authSource=admin';
	let data = '';
    var client = await MongoClient.connect(url,  {useNewUrlParser: true, useUnifiedTopology: true})
        .catch(err => { console.log(err); });

    if (!client) {
        return false;
    }
    try {
        const db = client.db(targetDb);
        let collection = await db.collection(collectionToGet);
		data = await collection.find({ State:'State'}).toArray();
    } catch (err) {

        console.log(err);
        return false;
    } finally {
        client.close();
        client=null;
    }
    return data;
}

module.exports = router;