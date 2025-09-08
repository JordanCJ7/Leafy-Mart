const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getProducts);
// Add product
router.post('/', productController.addProduct);
// Update product
router.put('/:id', productController.updateProduct);
// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
