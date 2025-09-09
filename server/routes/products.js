const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all products (public)
router.get('/', productController.getProducts);
// Add product (admin only)
router.post('/', authenticateToken, requireAdmin, productController.addProduct);
// Update product (admin only)
router.put('/:id', authenticateToken, requireAdmin, productController.updateProduct);
// Delete product (admin only)
router.delete('/:id', authenticateToken, requireAdmin, productController.deleteProduct);

module.exports = router;
