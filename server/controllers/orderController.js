const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Shipping & Tax config (can be overridden with environment variables)
const TAX_RATE = parseFloat(process.env.TAX_RATE) || 0.02; // 2% default
const FREE_SHIPPING_THRESHOLD = parseFloat(process.env.FREE_SHIPPING_THRESHOLD) || 10000; // LKR
const STANDARD_SHIPPING_FEE = parseFloat(process.env.STANDARD_SHIPPING_FEE) || 350; // LKR

// Helper function to calculate membership discount
const calculateMembershipDiscount = (membershipLevel, subtotal) => {
  const discountRates = {
    'Silver': 0.05,     // 5%
    'Gold': 0.10,       // 10%
    'Platinum': 0.15    // 15%
  };
  
  const discountPercentage = discountRates[membershipLevel] || 0;
  const discountAmount = subtotal * discountPercentage;
  
  return {
    discountAmount,
    discountPercentage: discountPercentage * 100 // Convert to percentage
  };
};

// Create a new order
exports.createOrder = async (req, res) => {
	try {
		const orderData = {
			...req.body,
			customerId: req.user?.id || req.body.customerId
		};

		console.log('createOrder - incoming orderData:', JSON.stringify(orderData, null, 2));
		
		// Get customer information to apply membership discount
		const customer = await User.findById(orderData.customerId);
		if (!customer) {
			return res.status(400).json({ error: 'Customer not found' });
		}
		
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
		
		// Calculate subtotal
		const itemsTotal = order.items.reduce((sum, item) => {
			return sum + (item.price * item.quantity);
		}, 0);
		order.subtotal = itemsTotal;
		
		// Apply membership discount
		const { discountAmount, discountPercentage } = calculateMembershipDiscount(
			customer.membershipLevel, 
			order.subtotal
		);
		order.discount = discountAmount;
		order.discountPercentage = discountPercentage;

		// Calculate tax (use TAX_RATE) and shipping cost
		// Allow overriding tax/shipping via request if needed (but default to configured rules)
		order.tax = typeof order.tax === 'number' ? order.tax : parseFloat((order.subtotal * TAX_RATE).toFixed(2));

		// Shipping fee: free over threshold, otherwise standard fee
		const calculateShippingFee = (subtotal) => {
			if (!subtotal || subtotal <= 0) return 0;
			return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
		};
		order.shippingCost = typeof order.shippingCost === 'number' ? order.shippingCost : calculateShippingFee(order.subtotal);
		
		// Calculate total (subtotal - discount + tax + shipping)
		order.calculateTotal();
		
		const savedOrder = await order.save();
		
		// DO NOT update product stock here - stock will be decremented when order is confirmed by admin
		// This prevents inventory from being locked for pending/unconfirmed orders
		
		// Update customer's purchase history and membership level
		// Note: We record the purchase immediately for membership tier calculation
		// If order is cancelled later, this could be adjusted, but typically membership
		// benefits are given based on order placement rather than fulfillment
		customer.recordPurchase(order.total);
		await customer.save();
		
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
		
		const query = { customerId: req.user?.id || req.params.userId };
		
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
		console.error('getOrderStats error:', err);
		console.error(err.stack);
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
		if (!req.user.isAdmin && order.customerId._id.toString() !== req.user.id.toString()) {
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
		
		// Fetch the current order to check previous status
		const order = await Order.findById(req.params.id).populate('items.productId');
		
		if (!order) {
			return res.status(404).json({ error: 'Order not found' });
		}
		
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
		
		// Decrement stock when order is confirmed for the first time
		// Only deduct stock if not already deducted and status is being changed to Confirmed or Processing
		if (!order.stockDeducted && (status === 'Confirmed' || status === 'Processing')) {
			// Verify stock availability before confirming
			for (let item of order.items) {
				const product = await Product.findById(item.productId);
				if (!product) {
					return res.status(400).json({ error: `Product not found: ${item.productId}` });
				}
				if (product.stock < item.quantity) {
					return res.status(400).json({ 
						error: `Insufficient stock for ${product.name}. Available: ${product.stock}, Required: ${item.quantity}` 
					});
				}
			}
			
			// All checks passed, decrement stock
			for (let item of order.items) {
				await Product.findByIdAndUpdate(
					item.productId,
					{ $inc: { stock: -item.quantity } }
				);
			}
			
			updateData.stockDeducted = true;
		}
		
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			updateData,
			{ new: true }
		).populate('customerId', 'name email phone');
		
		res.json(updatedOrder);
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
		if (!req.user.isAdmin && order.customerId.toString() !== req.user.id.toString()) {
			return res.status(403).json({ error: 'Access denied' });
		}
		
		// Only allow cancellation if order is not yet shipped
		if (order.status === 'Shipped' || order.status === 'Delivered') {
			return res.status(400).json({ error: 'Cannot cancel shipped or delivered orders' });
		}
		
		// Restore product stock ONLY if it was already deducted
		if (order.stockDeducted) {
			for (let item of order.items) {
				await Product.findByIdAndUpdate(
					item.productId,
					{ $inc: { stock: item.quantity } }
				);
			}
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
		console.log('getOrderStats - start');

		let stats = [];
		let totalOrders = 0;
		let totalRevenue = 0;
		let recentOrders = [];
		let monthlyRevenue = [];

		// stats aggregation
		try {
			stats = await Order.aggregate([
				{
					$group: {
						_id: '$status',
						count: { $sum: 1 },
						totalValue: { $sum: '$total' }
					}
				}
			]);
			console.log('getOrderStats - stats aggregation done', stats);
		} catch (errAgg) {
			console.error('getOrderStats - stats aggregation failed:', errAgg && errAgg.stack ? errAgg.stack : errAgg);
		}

		// total orders
		try {
			totalOrders = await Order.countDocuments();
			console.log('getOrderStats - totalOrders', totalOrders);
		} catch (errCount) {
			console.error('getOrderStats - countDocuments failed:', errCount && errCount.stack ? errCount.stack : errCount);
		}

		// total revenue
		try {
			const revAgg = await Order.aggregate([
				{ $match: { status: { $in: ['Delivered', 'Shipped'] } } },
				{ $group: { _id: null, total: { $sum: '$total' } } }
			]);
			totalRevenue = revAgg[0]?.total || 0;
			console.log('getOrderStats - totalRevenue', totalRevenue);
		} catch (errRev) {
			console.error('getOrderStats - totalRevenue aggregation failed:', errRev && errRev.stack ? errRev.stack : errRev);
		}

		// recent orders
		try {
			recentOrders = await Order.find()
				.populate('customerId', 'name email')
				.populate('items.productId', 'name img')
				.sort({ createdAt: -1 })
				.limit(10);
			console.log('getOrderStats - recentOrders length', recentOrders.length);
		} catch (errRecent) {
			console.error('getOrderStats - recentOrders failed:', errRecent && errRecent.stack ? errRecent.stack : errRecent);
		}

		// monthly revenue
		try {
			monthlyRevenue = await Order.aggregate([
				{
					$match: {
						status: { $in: ['Delivered', 'Shipped'] },
						createdAt: { $gte: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000) }
					}
				},
				{
					$group: {
						_id: {
							year: { $year: '$createdAt' },
							month: { $month: '$createdAt' }
						},
						revenue: { $sum: '$total' },
						orders: { $sum: 1 }
					}
				},
				{ $sort: { '_id.year': 1, '_id.month': 1 } }
			]);
			console.log('getOrderStats - monthlyRevenue', monthlyRevenue.length);
		} catch (errMonth) {
			console.error('getOrderStats - monthlyRevenue failed:', errMonth && errMonth.stack ? errMonth.stack : errMonth);
		}

		res.json({
			statusStats: stats,
			totalOrders,
			totalRevenue,
			recentOrders,
			monthlyRevenue
		});
	} catch (err) {
		console.error('getOrderStats error (outer):', err && err.stack ? err.stack : err);
		res.status(500).json({ error: err.message });
	}
};

// feedback functionality removed

// Bulk update order status
exports.bulkUpdateOrderStatus = async (req, res) => {
	try {
		const { orderIds, status, notes } = req.body;
		
		if (!Array.isArray(orderIds) || orderIds.length === 0) {
			return res.status(400).json({ error: 'Order IDs array is required' });
		}
		
		const updateData = { 
			status,
			processedBy: req.user.name || req.user.email,
			processedAt: new Date()
		};
		
		if (notes) updateData.notes = notes;
		if (status === 'Delivered') updateData.actualDelivery = new Date();
		
		const result = await Order.updateMany(
			{ _id: { $in: orderIds } },
			updateData
		);
		
		const updatedOrders = await Order.find({ _id: { $in: orderIds } })
			.populate('customerId', 'name email');
		
		res.json({
			message: `${result.modifiedCount} orders updated successfully`,
			updatedOrders
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
