const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create order
router.post('/', orderController.createOrder);
// Get orders for a user (userId param or from auth)
router.get('/user/:userId', orderController.getUserOrders);
// Update order status (admin)
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;
