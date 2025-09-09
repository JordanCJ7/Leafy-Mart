const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
	try {
		// Get counts
		const totalUsers = await User.countDocuments();
		const totalProducts = await Product.countDocuments();
		const totalOrders = await Order.countDocuments();
		
		// Get revenue
		const orders = await Order.find();
		const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
		
		// Get recent orders
		const recentOrders = await Order.find()
			.populate('user', 'name email')
			.sort({ createdAt: -1 })
			.limit(5);
		
		// Get low stock products (assuming stock < 10 is low)
		const lowStockProducts = await Product.find({ stock: { $lt: 10 } }).limit(5);
		
		// Get order status breakdown
		const orderStatuses = await Order.aggregate([
			{
				$group: {
					_id: '$status',
					count: { $sum: 1 }
				}
			}
		]);
		
		res.json({
			totalUsers,
			totalProducts,
			totalOrders,
			totalRevenue,
			recentOrders,
			lowStockProducts,
			orderStatuses
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
