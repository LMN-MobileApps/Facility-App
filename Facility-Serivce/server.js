process.env.NODE_ENV = 'development';
const app = require('./express-app');
var CryptoJS = require("crypto-js");
require('console-stamp')(console, '[HH:MM:ss.l]');
var MongoClient = require('mongodb').MongoClient;
var mongoCon = require("./db-connection.js");
//Global API Services
// This is just demo api service, can be used in other routes folder als well.
app.get('/api/home',  (req, res) => {	
    res.status(200).json({message:"Home API respose service"})
});
