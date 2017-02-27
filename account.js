var express = require('express')
var account = express.Router()
var model = require('./model')

const querystring = require('querystring')

account.use('/user', function (req, res, next) {
    console.log(req.session.id)
    next()
})

account.get('/user/test', function(req, res) {
    res.send('testing')
})

// change user info
account.post('/user/info', function(req, res) {

    model.User.findOne( { id:id }, function(err, user) {
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



