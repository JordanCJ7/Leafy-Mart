const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get dashboard stats (admin only)
router.get('/stats', authenticateToken, requireAdmin, adminController.getDashboardStats);

module.exports = router;
