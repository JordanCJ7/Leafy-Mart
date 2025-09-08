const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user?._id || req.params.id);
		res.json(user);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

// Update user profile
exports.updateProfile = async (req, res) => {
	try {
		console.log('=== updateProfile endpoint called ===');
		console.log('Method:', req.method);
		console.log('Headers:', JSON.stringify(req.headers, null, 2));
		console.log('Body:', JSON.stringify(req.body, null, 2));
		const user = await User.findByIdAndUpdate(req.user?._id || req.params.id, req.body, { new: true });
		res.json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get wishlist
exports.getWishlist = async (req, res) => {
	try {
		const user = await User.findById(req.user?._id || req.params.id).populate('wishlist');
		res.json(user.wishlist);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};
