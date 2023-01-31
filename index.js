import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { Server as SocketServer } from 'socket.io';
import Sockets from './src/socket.js';

import { connectDB } from './src/db.js';
import { PORT } from './src/config.js';
import cors from 'cors';

connectDB();
// Initializations
const app = express();
const server = http.createServer(app);
const httpServer = server.listen(PORT);
const io = new SocketServer(httpServer, {
  allowRequest: (req, callback) => {
    const noOriginHeader = req.headers.origin === undefined;
    callback(null, noOriginHeader);
  },
});
Sockets(io);

// Middlewares
app.use(cors());
app.use(morgan('dev'));

// io.on('connection', (socket) => {
//   socket.on('message', (body) => {
//     socket.broadcast.emit('message', {
//       body,
//       from: socket.id.slice(8),
//     });
//   });
//   socket.on('saludo', (body) => {
//     console.log(body);
//     socket.broadcast.emit('saludo', {
//       body,
//     });
//   });
// });
