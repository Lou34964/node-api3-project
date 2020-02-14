const express = require('express');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const {logger} = require('./middleware');

const server = express();

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
// custom middleware
// middleware file: middleware.js
// function logger(req, res, next) {}

module.exports = server;
