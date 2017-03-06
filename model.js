var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test/');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("mongoose connection success.");
});

const Schema = mongoose.Schema

// User
var user = new Schema({
	username: String,
	password: String,
	name: String,
	sex: Number,
	phone: Number,
	email: String,
	vip: { type:Boolean, default: false },        // is vip
	active: { type:Boolean, default: false },     // already completed personal info
	banned: { type:Boolean, default: false },     // banned
	wishNum: {type:Number, default: 0}
})

// Wish
var wish = new Schema({
	descp: String,       // description
	time: Date,
	tag: [String],
	status: Number,			 // 0: wait for receiving
											 // 1: received
						 				 	 // 2: complete
	loc: Number,
	userId: String,
	recvId: String,
	sex: Number,
})

// Tucao
var tucao = new Schema({
	descp: String,
	time: Date,
	userId: String,
	liked: { type: Number, default: 0},
})

// Like
var like = new Schema({
	uid: String,
	cid: String
})

// Notice
var notice = new Schema({
	uid: String,
	descp: String,
	data: {
			username: String,
			sex: Number,
			phone: Number,
			email: String,
	},
	read: { type: Boolean, default: false }
})

// models
var User = mongoose.model('User', user)
var Wish = mongoose.model('Wish', wish)
var Tucao = mongoose.model('Tucao', tucao)
var Like = mongoose.model('Like', like)
var Notice = mongoose.model('Notice', notice)

// exports
var model = {}
model.User = User
model.Wish = Wish
model.Tucao = Tucao
model.Like = Like
model.Notice = Notice

module.exports = model
