const express = require('express');
const { authRouter } = require('./routes/authentication');
const server = express();
server.use(express.json());

server.use('/auth', authRouter);

exports.server = server;