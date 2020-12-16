const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../middlewares/restricted-middleware');
const checkDepartment = require('../middlewares/check-department-middleware');

router.get('/', restricted, checkDepartment('sales', 'information technology', 'customer service'), (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});

module.exports = router;
