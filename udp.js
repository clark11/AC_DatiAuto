/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');
var escapeshellarg = require('escapeshellarg');
var spawn = require('child_process').spawn;
var proc;
  var exec = require('child_process').execFile;
app.use('/', express.static(path.join(__dirname, 'stream')));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var sockets = {};
var PORT = 3333;
var HOST = '192.168.1.102';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
    
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    var gear = message.toString('utf8',2,3);
    var speed = message.toString('utf8',6,10);
    var laptime = message.toString('utf8',16,27);
    var rpm = message.toString('utf8',31,35);
   var message = gear + ' '+speed;
    io.sockets.emit('datiauto',gear,speed,laptime,rpm);
});
http.listen(3000, function() {
  console.log('listening on 192.168.1.102:3000');
});
server.bind(PORT, HOST);