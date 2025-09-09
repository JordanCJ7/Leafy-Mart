const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateAdmin } = require('../middleware/auth');

// Get all orders (admin only)
router.get('/', authenticateAdmin, orderController.getAllOrders);
// Create order
router.post('/', orderController.createOrder);
// Get orders for a user (userId param or from auth)
router.get('/user/:userId', orderController.getUserOrders);
// Update order status (admin only)
router.patch('/:id/status', authenticateAdmin, orderController.updateOrderStatus);

module.exports = router;
