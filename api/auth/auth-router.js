const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { jwtSecret } = require('../../config/secret');

const Users = require('../users/users-model');
const { isValid } = require('../users/users-service');

router.post('/register', (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BYCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                res.status(201).json({ data: user });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({ message: 'Please provide username and password and the password should be alphanumeric' });
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (isValid(req.body)) {
        Users.findBy({ username: username })
            .then(([user]) => {
                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeToken(user);
                    res.status(200).json({
                        message: 'Welcome to our API, ' + user.username,
                        token,
                    });
                } else {
                    res.status(401).json({ message: 'You shall not pass!' });
                }
            })
            .catchJ(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: 'Please provide username and password and the password should be alphanumeric',
        });
    }
});

function makeToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        department: user.department,
    }
    const options = {
        expiresIn: '800s',
    }
    return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
