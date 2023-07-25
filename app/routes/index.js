var express = require('express');
var SiteController = require('../controllers/SiteController')
var loginMiddleware = require('../middleware/loginMiddleware');
const statusLoginMiddleware = require('../middleware/statusLoginMiddleware');

var router = express.Router();

/* GET home page. */
router.post('/logout', statusLoginMiddleware, function(req, res, next) {
    try {
        delete res.locals.user
        res.clearCookie('token')

        res.json({status:'Success'})
    }
    catch(e) {
        res.json({status: 'Error'})
    }
})
router.get('/payment', SiteController.payment)
router.get('/register', SiteController.register)
router.get('/login', SiteController.login)
router.get('/', SiteController.index);

module.exports = router;

