var express = require('express')
var account = express.Router()
var model = require('./model')
var querystring = require('querystring')
var http = require('http')
var md5 = require('blueimp-md5')

// signup
account.post('/signup', function(request, response) {

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
        var result = "";
        res.setEncoding('utf8')
        res.on('data', function(chunk) {
            result += chunk
        })
        res.on('end', function() {
            var json = JSON.parse(result)
            if (json.ret == 1 && json.msg == "ok") {
                authSuccessHandler(request.body.id, md5(request.body.pwd, "1a2b3c4d"),
                    function(ret) {
                        response.send(JSON.stringify({
                            ret: ret.ret,
                            msg: ret.msg,
                            data: {
                                uid: ret.id,
                                username: request.body.id
                            }
                        }))
                    })   // id & pwd correct
            } else {
                response.send(JSON.stringify({
                    ret: '0001',
                    msg: '数据库认证失败'

                }))
            }
        })
    });

    req.write(data)
    req.end()

    // id & pwd correct
    function authSuccessHandler(username, password, callback) {
        model.User.findOne( { username: username }, function(err, user){
            if (user === null) {    // new user
                var newUser = new model.User({
                    id: md5(username, '1a2b3c4d5e'),
                    username: username,
                    password: password,
                })
                newUser.save()
                callback({ ret: '0000', msg: 'ok', id: newUser._id })
            } else {
                callback({ ret: '0001', msg: '用户名已存在'})
            }
        })
    }
})

// login
account.post('/login', function(req, res) {

    model.User.findOne({
        username: req.body.id,
        password: md5(req.body.pwd, "1a2b3c4d")
    }, function(err, user) {
        if (user === null) {
            res.send(JSON.stringify({
                ret: '0001',
                msg: '用户名或密码错误'
            }))
        } else {
            res.send(JSON.stringify({
                ret: '0000',
                msg: 'ok',
                uid: user._id,
                username: user.username
            }))
        }
    })

})


// get info
account.get('/info', function(req, res) {

	model.User.findOne({ _id: req.query.uid }, function(err, user) {
		if (user === null) {
            res.send(JSON.stringify({
                ret: '0001'
            }))
        } else {
            res.send(JSON.stringify({
                ret: '0000',
                user: user
            }))
        }
	})

})


// change user info
account.post('/info', function(req, res) {

    model.User.findOne( { _id: req.body.uid }, function(err, user) {
        user.name = req.body.name
        user.sex = req.body.sex
        user.phone = req.body.phone
        user.email = req.body.email
		    user.active = true
        user.save()

        res.send(JSON.stringify({
            ret: 0000,
            msg: ''
        }))
    })
})

module.exports = account
