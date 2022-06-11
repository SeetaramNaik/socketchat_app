const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
  // var socket = io({transports: ['websocket'], upgrade: false});

  console.log(`USER CONNECTED : ${socket.id}`);

  socket.on('join_room', (room_id) => {
    socket.join(room_id);
    console.log(`User with ID : ${socket.id} joined room : ${room_id}`);
  });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED...', socket.id);
  });
});

server.listen(4001, () => {
  console.log('server started');
});
