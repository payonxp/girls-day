var express = require('express')
var bodyParser = require('body-parser')
var http = require('http')
var app = express()
var session = require('express-session')
var querystring = require('querystring')
var md5 = require('blueimp-md5')
var accounts = require('./account')
var wishs = require('./wish')
var model = require('./model')

app.use(bodyParser.json())

app.use('/user', accounts)
app.use('/wish', wishs)

var server = app.listen(3000, function() {
    var port = server.address().port
    console.log('app listening at %s', port)
})

module.exports = server
