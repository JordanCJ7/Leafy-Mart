const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for authentication
const authenticateToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'Access token required' });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
		const user = await User.findById(decoded.userId);
		if (!user) {
			return res.status(401).json({ error: 'User not found' });
		}
		req.user = user;
		next();
	} catch (err) {
		return res.status(403).json({ error: 'Invalid token' });
	}
};

// Middleware for admin authorization
const requireAdmin = (req, res, next) => {
	if (!req.user || !req.user.isAdmin) {
		return res.status(403).json({ error: 'Admin access required' });
	}
	next();
};

module.exports = { authenticateToken, requireAdmin };
