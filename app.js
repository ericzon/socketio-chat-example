var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  console.log("GET ", new Date());
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  console.log('session id: ', socket.id);
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('user disconnected', 'user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log( 'User sent message "' + msg + '"');
    io.emit('chat message', 'User ['+socket.id+'] sent message "' + msg + '"');
  });
});

var port = 5500;
http.listen(port, function () {
  console.log('listening on *:',port, new Date());
});

