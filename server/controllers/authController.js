const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const existing = await User.findOne({ email });
		if (existing) return res.status(400).json({ error: 'Email already in use' });
		const hash = await bcrypt.hash(password, 10);
		const user = new User({ name, email, password: hash });
		await user.save();
		res.status(201).json({ message: 'Registered' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Login
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ error: 'Invalid credentials' });
		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(400).json({ error: 'Invalid credentials' });
		const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
		res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
