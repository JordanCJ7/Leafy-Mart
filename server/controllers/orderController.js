const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
	try {
		const order = new Order({ ...req.body, user: req.user?._id || req.body.user });
		const saved = await order.save();
		res.status(201).json(saved);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
	try {
		const orders = await Order.find({ user: req.user?._id || req.params.userId });
		res.json(orders);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ status: req.body.status },
			{ new: true }
		);
		res.json(order);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
