var express = require('express')
var wish = express.Router()
var model = require('./model')
var mail = require('./mail')

// get wish
wish.get('/getlist', function(req, res) {
    var query = {}

    if (req.query.loc != null) {
        query.loc = req.query.loc
    }

    if (req.query.status != null) {
        query.status = req.query.status
    }

    if (req.query.from == 0) {
        query.userId = req.query.uid
    } else if (req.query.from == 1) {
        query.recvId = req.query.uid
    }

    model.Wish.find(query).skip(req.query.page * 10).limit(10).sort('-time')
      .exec(function(err, wishes) {
          res.send(JSON.stringify({
              ret: '0000',
              data: wishes
          }))
      })
})

// create new wish
wish.post('/create', function(req, res) {

    model.User.findOne({_id: req.body.uid} ,function(err, user){
      if (user.vip == true && user.wishNum > 8 || user.vip == false && user.wishNum > 5 ) {
        res.send(JSON.stringify({
            ret: '0001',
            msg: '您发起的愿望已超出上限'
        }))
      } else {
        user.wishNum += 1
        user.save()

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
      }
    })
})

// finish wish
wish.post('/finish', function(req, res) {

    model.Wish.findOne({
        _id: req.body.wid,
        userId: req.body.uid
    }, function(err, _wish) {
        _wish.status = 2
        _wish.save()

        model.User.findOne( { _id: _wish.userId}, function(err, user) {
            model.User.findOne( {_id: _wish.recvId}, function(err, recer) {

                user.wishNum -= 1
                user.save()

                var newNotice = new model.Notice({
                    uid: _wish.recvId,
                    descp: '您接受的愿望已被完成'
                })
                newNotice.save()
            })
        })
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

        model.User.findOne( { _id: _wish.userId}, function(err, user) {
            model.User.findOne( {_id: _wish.recvId}, function(err, recer) {
                var newNotice = new model.Notice({
                    uid: _wish.userId,
                    descp: '您的愿望已被接受',
                    data: {
                        username: recer.username,
                        sex: recer.sex,
                        phone: recer.phone,
                        email: recer.email,
                    }
                })
                newNotice.save()
                mail.sendEmail("您在HELPMAP有被领取的心愿", user.email, user.name, "您的愿望已被"+recer.name+"同学领取",recer.phone)

                var newNotice2 = new model.Notice({
                    uid: _wish.recerId,
                    descp: '您已接受愿望',
                    data: {
                        username: user.username,
                        sex: user.sex,
                        phone: user.phone,
                        email: user.email,
                    }
                })
                newNotice2.save()
                mail.sendEmail("您在HELPMAP领取了心愿", recer.email, recer.name, "您已领取"+user.name+"同学的愿望",user.phone)
            })
        })

        res.send(JSON.stringify({
            ret: '0000'
        }))
    })
})

module.exports = wish
