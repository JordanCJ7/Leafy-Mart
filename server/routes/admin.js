const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/auth');

// Get dashboard stats (admin only)
router.get('/stats', authenticateAdmin, adminController.getDashboardStats);

module.exports = router;
