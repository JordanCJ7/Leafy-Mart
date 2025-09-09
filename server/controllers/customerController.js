const Customer = require('../models/Customer');
const Order = require('../models/Order');

// Get all customers (Admin only)
exports.getAllCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const search = req.query.search;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const customers = await Customer.find(query)
      .sort({ registrationDate: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');
    
    const total = await Customer.countDocuments(query);
    
    res.json({
      customers,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    // Get customer's order history
    const orders = await Order.find({ customerId: req.params.id })
      .populate('items.productId')
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      customer,
      recentOrders: orders
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new customer
exports.createCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      plantPreferences,
      careLevel,
      newsletter,
      careReminders,
      promotionalEmails
    } = req.body;
    
    // Check if customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer with this email already exists' });
    }
    
    const customer = new Customer({
      firstName,
      lastName,
      email,
      phone,
      address,
      plantPreferences: plantPreferences || [],
      careLevel: careLevel || 'Beginner',
      newsletter: newsletter !== undefined ? newsletter : true,
      careReminders: careReminders !== undefined ? careReminders : true,
      promotionalEmails: promotionalEmails !== undefined ? promotionalEmails : true
    });
    
    await customer.save();
    
    res.status(201).json({
      message: 'Customer created successfully',
      customer
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const updates = req.body;
    
    // Prevent updating certain fields
    delete updates._id;
    delete updates.totalPurchases;
    delete updates.totalSpent;
    delete updates.loyaltyPoints;
    delete updates.membershipLevel;
    delete updates.registrationDate;
    
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.json({
      message: 'Customer updated successfully',
      customer
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete customer (Soft delete - mark as inactive)
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.json({
      message: 'Customer deactivated successfully',
      customer
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get customer statistics
exports.getCustomerStats = async (req, res) => {
  try {
    const stats = await Customer.aggregate([
      {
        $group: {
          _id: null,
          totalCustomers: { $sum: 1 },
          activeCustomers: {
            $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
          },
          averageSpent: { $avg: '$totalSpent' },
          totalRevenue: { $sum: '$totalSpent' }
        }
      }
    ]);
    
    const membershipDistribution = await Customer.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$membershipLevel',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const careLevelDistribution = await Customer.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$careLevel',
          count: { $sum: 1 }
        }
      }
    ]);
    
    res.json({
      overview: stats[0] || {
        totalCustomers: 0,
        activeCustomers: 0,
        averageSpent: 0,
        totalRevenue: 0
      },
      membershipDistribution,
      careLevelDistribution
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Process purchase and update customer data
exports.processPurchase = async (req, res) => {
  try {
    const { customerId, orderAmount, items } = req.body;
    
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    // Update customer purchase data
    customer.totalPurchases += 1;
    customer.totalSpent += orderAmount;
    customer.lastPurchase = new Date();
    
    // Add loyalty points
    const pointsEarned = customer.addLoyaltyPoints(orderAmount);
    
    // Update membership level
    customer.updateMembershipLevel();
    
    // Update favorite categories based on purchased items
    if (items && items.length > 0) {
      const categories = items.map(item => item.category).filter(Boolean);
      customer.favoriteCategories = [...new Set([...customer.favoriteCategories, ...categories])];
    }
    
    await customer.save();
    
    res.json({
      message: 'Purchase processed successfully',
      customer,
      pointsEarned
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
