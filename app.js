var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(8000, function() {
	console.log('listening on 8000');
});
var io = socket.listen(server);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');

	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});