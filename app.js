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

// io.on('connection', function(socket) {
// 	console.log('a user connected');

// 	socket.on('chat message', function(msg) {
// 		console.log(msg)
// 		io.emit('chat message', msg);
// 	});

// 	socket.on('disconnect', function() {
// 		console.log('user disconnected');
// 	});
// });

var chat = io.of('/chat');

chat.on('connection', function(socket) {
	console.log('user connected to chat');
	socket.emit('joined', 'You have joined chat');

	socket.join('room', function() {
		console.log('user joined room');
		console.log(socket.rooms);
	});
	chat.to('room').emit('joined', 'you have joined a room.');

	socket.on('message', function(data) {
		console.log(data);
		chat.emit('message', data);
	})

	// socket.leave('room', function() {
	// 	console.log('user left room');
	// });

	socket.on('disconnect', function() {
		console.log('user disconnected chat');
	});
});