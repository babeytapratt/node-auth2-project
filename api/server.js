const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../api/auth/auth-router');
const userRouter = require('../api/users/users-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.json({ api: 'up' });
});

module.exports = server;
