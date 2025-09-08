const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

// Get all suppliers
router.get('/', supplierController.getSuppliers);
// Add supplier
router.post('/', supplierController.addSupplier);
// Update supplier
router.put('/:id', supplierController.updateSupplier);
// Delete supplier
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
