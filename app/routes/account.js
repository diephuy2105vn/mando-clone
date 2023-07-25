var express = require('express');
var router = express.Router();
var AccountController = require('../controllers/AccountController')

router.post('/login', AccountController.login)
router.post('/register', AccountController.register);

module.exports = router;