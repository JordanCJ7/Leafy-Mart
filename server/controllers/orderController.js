const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
exports.createOrder = async (req, res) => {
	try {
		const orderData = {
			...req.body,
			customerId: req.user?._id || req.body.customerId
		};
		
		// Validate and calculate totals
		if (orderData.items && orderData.items.length > 0) {
			// Verify products exist and have sufficient stock
			for (let item of orderData.items) {
				const product = await Product.findById(item.productId);
				if (!product) {
					return res.status(400).json({ error: `Product not found: ${item.productId}` });
				}
				if (product.stock < item.quantity) {
					return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
				}
				// Set price at time of order
				item.price = product.priceLKR;
			}
		}
		
		const order = new Order(orderData);
		
		// Calculate total if not provided
		if (!order.total) {
			order.calculateTotal();
		}
		
		const savedOrder = await order.save();
		
		// Update product stock
		for (let item of orderData.items) {
			await Product.findByIdAndUpdate(
				item.productId,
				{ $inc: { stock: -item.quantity } }
			);
		}
		
		res.status(201).json(savedOrder);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const skip = (page - 1) * limit;
		
		const query = { customerId: req.user?._id || req.params.userId };
		
		// Add status filter if provided
		if (req.query.status) {
			query.status = req.query.status;
		}
		
		const orders = await Order.find(query)
			.populate('items.productId', 'name img category')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);
			
		const total = await Order.countDocuments(query);
		
		res.json({
			orders,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit)
			}
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate('items.productId', 'name img category')
			.populate('customerId', 'name email phone');
			
		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}
		
		// Check if user owns this order (unless admin)
		if (!req.user.isAdmin && order.customerId._id.toString() !== req.user._id.toString()) {
			return res.status(403).json({ error: 'Access denied' });
		}
		
		res.json(order);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const skip = (page - 1) * limit;
		
		let query = {};
		
		// Add filters
		if (req.query.status) {
			query.status = req.query.status;
		}
		if (req.query.paymentStatus) {
			query.paymentStatus = req.query.paymentStatus;
		}
		if (req.query.dateFrom || req.query.dateTo) {
			query.createdAt = {};
			if (req.query.dateFrom) {
				query.createdAt.$gte = new Date(req.query.dateFrom);
			}
			if (req.query.dateTo) {
				query.createdAt.$lte = new Date(req.query.dateTo);
			}
		}
		
		const orders = await Order.find(query)
			.populate('customerId', 'name email phone')
			.populate('items.productId', 'name img category')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);
			
		const total = await Order.countDocuments(query);
		
		res.json({
			orders,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit)
			}
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Update order status (admin)
exports.updateOrderStatus = async (req, res) => {
	try {
		const { status, trackingNumber, notes } = req.body;
		
		const updateData = { status };
		
		if (trackingNumber) {
			updateData.trackingNumber = trackingNumber;
		}
		
		if (notes) {
			updateData.notes = notes;
		}
		
		// Set processed info
		updateData.processedBy = req.user.name || req.user.email;
		updateData.processedAt = new Date();
		
		// Set delivery date if status is delivered
		if (status === 'Delivered') {
			updateData.actualDelivery = new Date();
		}
		
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true }
		).populate('customerId', 'name email phone');
		
		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}
		
		res.json(order);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
	try {
		const { paymentStatus, paymentMethod } = req.body;
		
		const updateData = { paymentStatus };
		if (paymentMethod) {
			updateData.paymentMethod = paymentMethod;
		}
		
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true }
		);
		
		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}
		
		res.json(order);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// Cancel order
exports.cancelOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);
		
		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}
		
		// Check if user owns this order (unless admin)
		if (!req.user.isAdmin && order.customerId.toString() !== req.user._id.toString()) {
			return res.status(403).json({ error: 'Access denied' });
		}
		
		// Only allow cancellation if order is not yet shipped
		if (order.status === 'Shipped' || order.status === 'Delivered') {
			return res.status(400).json({ error: 'Cannot cancel shipped or delivered orders' });
		}
		
		// Restore product stock
		for (let item of order.items) {
			await Product.findByIdAndUpdate(
				item.productId,
				{ $inc: { stock: item.quantity } }
			);
		}
		
		order.status = 'Cancelled';
		await order.save();
		
		res.json(order);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Get order statistics (admin)
exports.getOrderStats = async (req, res) => {
	try {
		const stats = await Order.aggregate([
			{
				$group: {
					_id: '$status',
					count: { $sum: 1 },
					totalValue: { $sum: '$total' }
				}
			}
		]);
		
		const totalOrders = await Order.countDocuments();
		const totalRevenue = await Order.aggregate([
			{ $match: { status: { $in: ['Delivered', 'Shipped'] } } },
			{ $group: { _id: null, total: { $sum: '$total' } } }
		]);
		
		res.json({
			statusStats: stats,
			totalOrders,
			totalRevenue: totalRevenue[0]?.total || 0
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
