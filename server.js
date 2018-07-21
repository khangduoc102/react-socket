var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

console.log(__dirname + '/build/index.html');
/*
app.get('/', function(req, res){
  res.sendFile(__dirname + '/build/index.html');
});
*/
const desDate = new Date("2018-08-04T15:00:00").getTime();
const orgDate = new Date("2018-07-06T02:00:00").getTime();

const totalTime = desDate - orgDate;

console.log(orgDate);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', {percent: (new Date().getTime() - orgDate) / totalTime * 100, left: desDate - new Date().getTime()});
    }, interval);
    });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});