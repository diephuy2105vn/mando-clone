const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const ProductController = require('../controllers/ProductController')

router.post('/create', adminMiddleware, ProductController.create)
router.patch('/update/:id', adminMiddleware, ProductController.update)
router.delete('/delete/:id', adminMiddleware, ProductController.destroy)
router.get('/:id', ProductController.productOnly);
router.get('/', ProductController.index);

module.exports = router;