const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateAdmin } = require('../middleware/auth');

// Get all products (public)
router.get('/', productController.getProducts);

// Get product options for dropdowns (admin only)
router.get('/options', authenticateAdmin, productController.getProductOptions);

// Get product by ID (public)
router.get('/:id', productController.getProductById);

// Add product (admin only)
router.post('/', authenticateAdmin, productController.addProduct);

// Update product (admin only)
router.put('/:id', authenticateAdmin, productController.updateProduct);

// Delete product (admin only)
router.delete('/:id', authenticateAdmin, productController.deleteProduct);

module.exports = router;
