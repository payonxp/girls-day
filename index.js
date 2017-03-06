var express = require('express')
var bodyParser = require('body-parser')
var http = require('http')
var app = express()
var session = require('express-session')
var querystring = require('querystring')
var md5 = require('blueimp-md5')

var account = require('./account')
var wish = require('./wish')
var model = require('./model')
var tucao = require('./tucao')
var notice = require('./notice')

app.use(bodyParser.json())

// routers

app.use('/', function(req, res, next) {

	res.set('Access-Control-Allow-Origin', '*')
	res.set('Access-Control-Allow-Credentials', true)
	res.set('Access-Control-Allow-Headers', 'x-requested-with, content-type')
	next()
})

app.use('/user', account)
app.use('/wish', wish)
app.use('/tucao', tucao)
app.use('/notice', notice)

var server = app.listen(3000, function() {
    var port = server.address().port
    console.log('app listening at %s', port)
})

module.exports = server
