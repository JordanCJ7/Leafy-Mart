const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticateAdmin } = require('../middleware/auth');

// Get all customers (Admin only)
router.get('/', authenticateAdmin, customerController.getAllCustomers);

// Get customer statistics (Admin only) 
router.get('/stats', authenticateAdmin, customerController.getCustomerStats);

// Get customer by ID
router.get('/:id', customerController.getCustomerById);

// Create new customer
router.post('/', customerController.createCustomer);

// Update customer
router.put('/:id', customerController.updateCustomer);

// Delete customer (soft delete)
router.delete('/:id', authenticateAdmin, customerController.deleteCustomer);

// Process purchase
router.post('/purchase', customerController.processPurchase);

module.exports = router;
