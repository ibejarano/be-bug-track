const router = require('express').Router();
const User = require('../models/user.model');
const userHandler = require('../controllers/user');

router.route('/').get( userHandler.getAll )

router.route('/info').get( userHandler.getInfo )

router.route('/logout').post( userHandler.logout );

module.exports = router;