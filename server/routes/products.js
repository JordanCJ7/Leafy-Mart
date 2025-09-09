const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateAdmin } = require('../middleware/auth');

// Get all products (public)
router.get('/', productController.getProducts);
// Add product (admin only)
router.post('/', authenticateAdmin, productController.addProduct);
// Update product (admin only)
router.put('/:id', authenticateAdmin, productController.updateProduct);
// Delete product (admin only)
router.delete('/:id', authenticateAdmin, productController.deleteProduct);

module.exports = router;
