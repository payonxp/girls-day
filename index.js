var express = require('express')
var bodyParser = require('body-parser')
var http = require('http')
var app = express()
var session = require('express-session')
var querystring = require('querystring')

var accounts = require('./account')
var model = require('./model')

app.use(bodyParser.json())

app.use('/user', accounts)

var server = app.listen(3000, function() {
    var port = server.address().port
    console.log('app listening at %s', port)
})

// login
app.post('/login', function(request, response) {
	
	// receive id and pwd from request
    var data = querystring.stringify({
        id: request.body.id,
        pwd: request.body.pwd,
        act: 'login'
    });
    var options = {
        host: '202.120.82.2',
        port: 8081,
        path: '/ClientWeb/pro/ajax/login.aspx',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    }

    // send login msg
    var req = http.request(options, function(res) {
        var result = ''
        res.setEncoding('utf8')
        res.on('data', function(chunk) {
            result += chunk;
        })
        res.on('end', function() {
            var json = JSON.parse(result);
            if (json.ret == 1 && json.msg == "ok") {
                loginSuccessHandler(json.data.id)   // id & pwd correct
            }
            response.send(JSON.stringify({
                ret: json.ret,
                msg: json.msg
            }))
        })
    });
    req.write(data)
    req.end()

    // id & pwd correct
    function loginSuccessHandler(id) {
        model.User.findOne( { id: id }, function(err, user){
            if (user === null) {    // new user
                var newUser = new model.User({
                    id: id
                })
                newUser.save()
            }
        })
    }
})

module.exports = server
