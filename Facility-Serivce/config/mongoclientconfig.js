const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:ctli%40123@65.151.188.204:27017/lumen_facility?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', (err) => {
    if(!err)
        console.log('MongoDB connection succeeded...');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;