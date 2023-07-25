const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.post('/confirm/:id', OrderController.confirm)
router.patch('/update/:id', OrderController.update)
router.post('/create', OrderController.create)

module.exports = router;