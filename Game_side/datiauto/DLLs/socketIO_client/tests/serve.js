// DEBUG=* node serve.js

var app = require('http').createServer(serve).listen(9000);
var io = require('socket.io')(app);
var fs = require('fs');
var PAYLOAD = {'xxx': 'yyy'};

io.on('connection', function(socket) {
  socket.on('message', function(data, fn) {
    if (fn) {
      // Client requests callback
      if (data) {
        fn(data);
      } else {
        fn();
      }
    } else if (typeof data === 'object') {
      // Data has type object or is null
      socket.json.send(data ? data : 'message_response');
    } else {
      // Data has type string or is ''
      socket.send(data ? data : 'message_response');
    }
  });
  socket.on('emit', function() {
    socket.emit('emit_response');
  });
  socket.on('emit_with_payload', function(payload) {
    socket.emit('emit_with_payload_response', payload);
  });
  socket.on('emit_with_multiple_payloads', function(payload1, payload2) {
    socket.emit('emit_with_multiple_payloads_response', payload1, payload2);
  });
  socket.on('emit_with_callback', function(fn) {
    fn();
  });
  socket.on('emit_with_callback_with_payload', function(fn) {
    fn(PAYLOAD);
  });
  socket.on('emit_with_callback_with_multiple_payloads', function(fn) {
    fn(PAYLOAD, PAYLOAD);
  });
  socket.on('emit_with_event', function(payload) {
    socket.emit('emit_with_event_response', payload);
  });
  socket.on('trigger_server_expects_callback', function(payload) {
    socket.emit('server_expects_callback', payload, function(payload) {
      socket.emit('server_received_callback', payload);
    });
  });
  socket.on('aaa', function() {
    socket.emit('aaa_response', PAYLOAD);
  });
  socket.on('bbb', function(payload, fn) {
    if (fn) fn(payload);
  });
  socket.on('wait_with_disconnect', function() {
    socket.emit('wait_with_disconnect_response');
  });
});

io.of('/chat').on('connection', function(socket) {
  socket.on('emit_with_payload', function(payload) {
    socket.emit('emit_with_payload_response', payload);
  });
  socket.on('aaa', function() {
    socket.emit('aaa_response', 'in chat');
  });
  socket.on('trigger_server_expects_callback', function(payload) {
    socket.emit('server_expects_callback', payload, function(payload) {
      socket.emit('server_received_callback', payload);
    });
  });
});

io.of('/news').on('connection', function(socket) {
  socket.on('emit_with_payload', function(payload) {
    socket.emit('emit_with_payload_response', payload);
  });
  socket.on('aaa', function() {
    socket.emit('aaa_response', 'in news');
  });
});

function serve(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    res.writeHead(200);
    res.end(data);
  });
}
