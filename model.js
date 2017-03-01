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
	uid: Number,
	username: String,
	password: String,
	name: String,
	sex: Number,
	phone: Number,
	email: String,
	vip: { type:Boolean, default: false },        // is vip
	active: { type:Boolean, default: false },     // already completed personal info
	banned: { type:Boolean, default: false },     // banned
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
	userId: Number,
	recvId: Number,
})

// models
var User = mongoose.model('User', user)
var Wish = mongoose.model('Wish', wish)

// exports
var model = {}
model.User = User
model.Wish = wish

module.exports = model
