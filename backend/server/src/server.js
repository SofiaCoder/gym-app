const express = require('express');
const server = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { usersRouter } = require('./routes/usersRouter');
const { authRouter } = require('./routes/authentication');
const { friendRouter } = require('./routes/friendRouter');
server.use(express.json());
server.use(cookieParser());
server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

server.use('/auth', authRouter);
server.use('/friends', friendRouter);
server.use('/users', usersRouter);

exports.server = server;
