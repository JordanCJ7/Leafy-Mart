const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticateAdmin, auth } = require('../middleware/auth');

// Customer routes
router.post('/order/:orderId', auth, feedbackController.createFeedback);
router.get('/order/:orderId', auth, feedbackController.getFeedbackByOrder);
router.get('/customer', auth, feedbackController.getCustomerFeedback);

// Public routes
router.get('/product/:productId', feedbackController.getProductFeedback);
router.put('/:id/helpful', feedbackController.voteFeedbackHelpful);

// Admin routes
router.get('/', authenticateAdmin, feedbackController.getAllFeedback);
router.get('/stats', authenticateAdmin, feedbackController.getFeedbackStats);
router.put('/:id/status', authenticateAdmin, feedbackController.updateFeedbackStatus);

module.exports = router;
