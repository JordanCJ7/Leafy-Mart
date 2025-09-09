const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all orders (admin only)
router.get('/', authenticateToken, requireAdmin, orderController.getAllOrders);
// Create order
router.post('/', orderController.createOrder);
// Get orders for a user (userId param or from auth)
router.get('/user/:userId', orderController.getUserOrders);
// Update order status (admin only)
router.patch('/:id/status', authenticateToken, requireAdmin, orderController.updateOrderStatus);

module.exports = router;
