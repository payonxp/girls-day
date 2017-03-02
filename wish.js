var express = require('express')
var wish = express.Router()
var model = require('./model')

// get wish
wish.get('/getlist', function(req, res) {
    var query = {}

    if (req.query.loc != null) {
        query.loc = req.query.loc
    }
    if (req.query.status != null) {
        query.status = req.query.status
    }

  	if (req.query.uid != null) {
  		query.userId = req.query.uid
  	}

    if (req.query.from == 0) {
        query.userId = req.query.uid
    } else if (req.query.from == 1) {
        query.recvId = req.query.uid
    }

    model.Wish.find(query, function(err, wishes) {
        res.send(JSON.stringify({
            ret: '0000',
            data: wishes
        }))
    })

})

// create new wish
wish.post('/create', function(req, res) {

    var newWish = new model.Wish({
        descp: req.body.descp,
        time: new Date(),
        tag: req.body.tag,
		loc: req.body.loc,
        status: 0,
        userId: req.body.uid,
    })
    newWish.save()

    res.send(JSON.stringify({
        ret: '0000'
    }))
})

// finish wish
wish.post('/finish', function(req, res) {

    model.Wish.findOne({
        _id: req.body.wid,
        userId: req.body.uid
    }, function(err, _wish) {
        _wish.status = 2
        _wish.save()

        res.send(JSON.stringify({
            ret: '0000'
        }))
    })
})

// accept wish
wish.post('/accept', function(req, res) {

    model.Wish.findOne({ _id: req.body.wid }, function(err, _wish) {
        _wish.status = 1
        _wish.recvId = req.body.uid

        _wish.save()

        res.send(JSON.stringify({
            ret: '0000'
        }))
    })
})

module.exports = wish
