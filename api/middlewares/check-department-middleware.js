module.exports = (department) => (req, res, next) => {
    if (req.decodedToken.department === department) {
        next();
    } else {
        res.status(403).json('This is the wrong department for you')
    }
};
