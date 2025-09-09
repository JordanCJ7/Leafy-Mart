const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Customer authentication routes
router.post('/register', authController.registerCustomer);
router.post('/login', authController.loginCustomer);

// Admin authentication routes
router.post('/admin/login', authController.loginAdmin);

// Protected routes
router.get('/profile', auth, authController.getUserProfile);
router.put('/profile', auth, authController.updateUserProfile);

// Admin routes (keeping existing functionality)
router.get('/admin/verify', adminController.verifyAdmin);

module.exports = router;
