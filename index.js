var express = require('express')
var bodyParser = require('body-parser')
var http = require('http')
var app = express()
app.use(bodyParser.json())

var server = app.listen(3000, function() {
	var port = server.address().port
	console.log('app listening at %s', port)
})

const querystring = require('querystring');
// login
app.post('/login', function(req, response) {
	var data = querystring.stringify({
		id: req.body.username,
		pwd: req.body.password,
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
  };  
  var req = http.request(options, function(res) {
		var result = ''
		res.setEncoding('utf8')
    res.on('data', function (chunk) {
			result += chunk;
		}) 
		res.on('end', function() {
			response.send(result);
		}) 
	});
  req.write(data);
  req.end();
})


module.exports = server
