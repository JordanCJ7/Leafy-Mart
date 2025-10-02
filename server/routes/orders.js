const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateAdmin, auth } = require('../middleware/auth');

// Public / authenticated routes
// Create order (authenticated users)
router.post('/', auth, orderController.createOrder);

// Get user's orders (authenticated users)
router.get('/user', auth, orderController.getUserOrders);

// Admin routes (must be registered before parameterized routes to avoid collisions)
router.get('/', authenticateAdmin, orderController.getAllOrders);
router.get('/stats', authenticateAdmin, orderController.getOrderStats);
router.put('/bulk/status', authenticateAdmin, orderController.bulkUpdateOrderStatus);
router.put('/:id/status', authenticateAdmin, orderController.updateOrderStatus);
router.put('/:id/payment', authenticateAdmin, orderController.updatePaymentStatus);
// feedback request route removed

// Parameterized routes (after admin routes)
// Get specific order by ID (authenticated users)
router.get('/:id', auth, orderController.getOrderById);

// Cancel order (authenticated users)
router.put('/:id/cancel', auth, orderController.cancelOrder);

module.exports = router;
