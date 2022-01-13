const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./mongoclientconfig.js');
var FacilityUserController = require('../endpoint/facilityusercontroller')

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:8100'}));

app.listen(8000, () => console.log('Server started at port : 8000'));
app.use('/', FacilityUserController);
module.exports = app;