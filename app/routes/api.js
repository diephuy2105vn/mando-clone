var express = require('express');
var ApiController = require('../controllers/ApiController');

var router = express.Router();

router.get('/cart/:idUser', ApiController.cartOfUserApi)
router.get('/product/:id', ApiController.productOnlyApi)
router.get('/product', ApiController.productApi);
router.get('/order', ApiController.orderApi);

module.exports = router;
