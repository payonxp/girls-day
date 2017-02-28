var express = require('express')
var account = express.Router()
var model = require('./model')

const querystring = require('querystring')

account.get('/info', function(req, res) {
	
	model.User.findOne({ id: 10142510186 }, function(err, user) {
		res.send(JSON.stringify(user))
	})

})


// change user info
account.post('/info', function(req, res) {

    model.User.findOne( { id: req.body.id }, function(err, user) {
        user.name = req.body.name
        user.sex = req.body.sex
        user.phone = req.body.phone
        user.email = req.body.email
        user.save()

        res.send(JSON.stringify({
            ret: 0,
            msg: ''
        }))
    })

})

module.exports = account



