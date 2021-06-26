const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

const bodyParser = require('body-parser')

require("./database/mongo");


//import all router file
const user = require('./api/routes/User')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//router call
app.use('/user', user)

module.exports = app;
