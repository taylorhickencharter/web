const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var timestamps = {
  time: 30000,
  trigger: 0
};

app.get('/', (req, res) => {
  res.send(timestamps);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('time', (data) => {
    //console.log('server/time: ' + data);
    timestamps['time'] = data;
  });
  socket.on('trigger', (data) => {
    console.log('server/trigger: ' + data);
    timestamps['trigger'] = data;
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});