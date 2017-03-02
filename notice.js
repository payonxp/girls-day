var express = require('express')
var notice = express.Router()
var model = require('./model')

// get notice
notice.get('/getnotice', function(req, res) {

    model.Notice.find({ uid: req.query.uid}, function(err, list) {
        res.send(JSON.stringify({
            ret: '0000',
            data: list
        }))
    })
})

// read
notice.post('/read', function(req, res) {

    model.Notice.find({ uid: req.body.uid, _id: req.body.cid}, function(err, notice) {
        notice.read = true
        notice.save()
    })
})

module.exports = notice
