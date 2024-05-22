import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import userRoutes from './routes/route.js';
import Connection from './database/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

mongoose.set('strictQuery', true);

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST']
  }
});

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload1', express.static(path.join(__dirname, 'upload1')));

Connection();
app.use('/', userRoutes);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log("Server is running on port", port);
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message); // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});
