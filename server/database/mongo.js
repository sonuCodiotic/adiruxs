const mongoose = require('mongoose');
require('dotenv').config();
var mongodbErrorHandler = require('mongoose-mongodb-errors')

mongoose.Promise = Promise;
mongoose.plugin(mongodbErrorHandler);
mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(result => {
        //console.log(result)
        console.log('connected')
    })
    .catch(err => {
        console.log(err)
    })