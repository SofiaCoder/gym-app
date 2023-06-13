const express = require('express');
const { authRouter } = require('./routes/authentication');
const { friendRouter } = require('./routes/friendRouter');
const server = express();
const cookieParser = require('cookie-parser');
const { usersRouter } = require('./routes/usersRouter');
server.use(express.json());
server.use(cookieParser());

server.use('/auth', authRouter);
server.use('/friends', friendRouter);
server.use('/users', usersRouter);

exports.server = server;
