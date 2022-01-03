//Imports
var express = require('express');
var https = require('https');
var fs = require('fs');
const cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var app = express('https');
const basicAuth = require('./_helpers/basic-auth');
const errorHandler = require('./_helpers/error-handler');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//Certificate Configuration if required
/*let options = {
    pfx: fs.readFileSync('cert.pfx'),
    passphrase: 'Ready123'
  };
  */
  let options = {};
//App Configurations
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-Control-Allow-Origin,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// global error handler
app.use(errorHandler);

//Routes and API Services
app.use(require('./routes'));
app.use(require('./endpoint/facility-users-controller'));
app.use(require('./endpoint/master-data-controller'));

// Port Configuration
let port=0;
if(process.env.NODE_ENV.indexOf('production') > -1){
  port = 5000;
}
else{
  port = 3000;
}
/*const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
}); */
//Create and Start Server
/*https.createServer(options,app).listen(port, function () {
  console.log('Server listening on port ' + port);
});*/
app.listen(80, function () {
    console.log('Facility App is listening on port 80!');
});

module.exports = app;
