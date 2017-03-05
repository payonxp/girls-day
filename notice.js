var express = require('express')
var notice = express.Router()
var model = require('./model')

// get notice
notice.get('/getnotice', function(req, res) {

    model.Notice.find({ uid: req.query.uid}).skip(req.query.page * 10).limit(10).sort('-time')
      .exec(function(err, list) {
          res.send(JSON.stringify({
              ret: '0000',
              data: list
          }))
      })
})

// read
notice.post('/read', function(req, res) {

    model.Notice.find({ uid: req.body.uid }, function(err, notices) {
        for each (var notice in notices) {
            notice.read = true
            notice.save()
        }
    })
})

module.exports = notice
