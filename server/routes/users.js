const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get user profile
router.get('/:id', userController.getProfile);
// Update user profile
router.put('/:id', userController.updateProfile);
// Get wishlist
router.get('/:id/wishlist', userController.getWishlist);

module.exports = router;
