const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

// Admin routes for user management
router.get('/admin/users', protect, admin, userController.getAllUsers);
router.get('/admin/users/stats', protect, admin, userController.getUserStats);
router.get('/admin/users/:id', protect, admin, userController.getUserById);
router.put('/admin/users/:id', protect, admin, userController.updateUser);
router.delete('/admin/users/:id', protect, admin, userController.deleteUser);
router.put('/admin/users/:id/reactivate', protect, admin, userController.reactivateUser);

// Customer profile routes (self-management)
router.get('/profile', protect, (req, res) => {
  // For profile route, we need to send the user data directly since protect middleware already loads it
  if (!req.user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: req.user
  });
});
router.put('/profile', protect, userController.updateProfile);
router.put('/profile/change-password', protect, userController.changePassword);
router.get('/profile/orders', protect, userController.getOrderHistory);
router.delete('/profile', protect, userController.deleteAccount);

module.exports = router;
