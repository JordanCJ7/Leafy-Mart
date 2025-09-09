const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

// Simple admin authentication
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Simple admin credentials check (In production, use proper password hashing)
    const adminCredentials = {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    };
    
    if (username !== adminCredentials.username || password !== adminCredentials.password) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }
    
    // Generate admin token
    const token = jwt.sign(
      { 
        role: 'admin', 
        username: username 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '8h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      admin: {
        username,
        role: 'admin'
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify admin token
exports.verifyAdmin = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    res.json({
      valid: true,
      admin: {
        username: decoded.username,
        role: decoded.role
      }
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
	try {
		// Get counts
		const totalCustomers = await Customer.countDocuments();
		const totalProducts = await Product.countDocuments();
		const totalOrders = await Order.countDocuments();
		
		// Get revenue
		const orders = await Order.find();
		const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
		
		// Get recent orders
		const recentOrders = await Order.find()
			.populate('customerId', 'firstName lastName email')
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
			totalCustomers,
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
