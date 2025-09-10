const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// In-memory storage for demonstration (in production, use database)
const userWishlists = new Map();

// Get user's wishlist
router.get('/', auth, (req, res) => {
  try {
    const userId = req.user.id.toString();
    const wishlist = userWishlists.get(userId) || { items: [], updatedAt: new Date() };
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save user's wishlist
router.post('/', auth, (req, res) => {
  try {
    const userId = req.user.id.toString();
    const { items } = req.body;
    
    const wishlist = {
      items: items || [],
      updatedAt: new Date()
    };
    
    userWishlists.set(userId, wishlist);
    res.json({ message: 'Wishlist saved successfully', wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear user's wishlist
router.delete('/', auth, (req, res) => {
  try {
    const userId = req.user.id.toString();
    userWishlists.delete(userId);
    res.json({ message: 'Wishlist cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
