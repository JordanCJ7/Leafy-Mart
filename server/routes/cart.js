const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// In-memory storage for demonstration (in production, use database)
const userCarts = new Map();

// Get user's cart
router.get('/', auth, (req, res) => {
  try {
    const userId = req.user._id.toString();
    const cart = userCarts.get(userId) || { items: [], updatedAt: new Date() };
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save user's cart
router.post('/', auth, (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { items } = req.body;
    
    const cart = {
      items: items || [],
      updatedAt: new Date()
    };
    
    userCarts.set(userId, cart);
    res.json({ message: 'Cart saved successfully', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear user's cart
router.delete('/', auth, (req, res) => {
  try {
    const userId = req.user._id.toString();
    userCarts.delete(userId);
    res.json({ message: 'Cart cleared successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
