var express = require('express')
var tucao = express.Router()
var model = require('./model')

// get tucao
tucao.get('/getlist', function(req, res) {

    model.Tucao.find({}).skip(req.query.page * 10).limit(10).sort('-time')
      .exec( function(err, list) {

          var likeList = []
          for (var tucao in list) {
              model.Like.findOne({ uid: req.query.uid, cid: tucao._id} {

              })
          }

          res.send(JSON.stringify({
              ret: '0000',
              data: list
          }))
      })
})

// send tucao
tucao.post('/send', function(req, res) {

    var newTucao = new model.Tucao({
        descp: req.body.descp,
        userId: req.body.uid,
        time: new Date()
    })

    newTucao.save()
    res.send(JSON.stringify({
        ret: '0000',
    }))
})

// like
tucao.post('/like', function(req, res) {

    model.Tucao.findOne({ _id: req.body.cid}, function(err, tucao) {

        model.Like.findOne({uid: req.body.uid, cid: req.body.cid}, function(err, like) {
            if (like == null) {
                var newLike = new model.Like({
                    uid: req.body.uid,
                    cid: req.body.cid
                })
                newLike.save()
                tucao.liked += 1
                tucao.save()
            } else {
                like.remove()
                tucao.liked -= 1
                tucao.save()
            }
            res.send(JSON.stringify({
                ret: '0000'
            }))
        })
    })
})

module.exports = tucao
