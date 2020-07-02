var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/GUI/index.html');
});
app.get('/logo.png', (req, res) => {
  res.sendFile(__dirname + '/GUI/logo.png');
});
app.get('/socket.io-client.js', (req, res) => {
  res.sendFile(__dirname + '/GUI/socket.io-client.js');
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/GUI/style.css');
});
app.get('/logic.js', (req, res) => {
  res.sendFile(__dirname + '/GUI/logic.js');
});
let aimdata = {smoothX:1,smoothY:1}
let glowdata = {ally:[0,0,0],enemy:[0,0,0]}
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('aimdata',(data)=>{
    socket.broadcast.emit('aimdata',data)
    console.log(data)
  })
  socket.on('glowdata',(data)=>{
    socket.broadcast.emit('glowdata',data)
  })
  socket.on('glowtoggle',(data)=>{
    socket.broadcast.emit('glowtoggle',data)
  })
  socket.on('aimtoggle',(data)=>{
    socket.broadcast.emit('aimtoggle',data)
  })
});

http.listen(3000, () => {
  console.log('GUI Started!');
});