var express = require('express');
var router = express.Router();
var AdminController = require('../controllers/AdminController')
const loginMiddleware = require('../middleware/loginMiddleware')
/* GET home page. */
router.get('/product/store', AdminController.storeProduct)
router.get('/product/create', AdminController.createProduct);
router.get('/product/:id', AdminController.updateProduct);
router.get('/order/store', AdminController.storeOrder)
router.get('/order/:id', AdminController.inforOrder);

module.exports = router;