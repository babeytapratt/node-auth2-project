const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secret');

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json('we wants the token, precious')
    } else {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if (error) {
                res.status(401).json('We wants a GOOD token, precious: ' + error.message);
            } else {
                req.decodedToken = decoded
                next();
            }
        })
    }
};
