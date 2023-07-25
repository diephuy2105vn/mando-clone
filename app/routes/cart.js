const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController')

router.post('/create', CartController.create);
router.patch('/:id', CartController.update);
router.delete('/:id', CartController.destroy);

module.exports = router;