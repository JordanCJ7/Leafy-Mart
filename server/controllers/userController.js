const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Admin User Management Functions

// Get all users with filtering and pagination
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const membershipLevel = req.query.membershipLevel || '';
    const sortBy = req.query.sortBy || 'registrationDate';
    const sortOrder = req.query.sortOrder || 'desc';

    // Build filter query
    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role) {
      filter.role = role;
    }
    
    if (membershipLevel) {
      filter.membershipLevel = membershipLevel;
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;
    
    const users = await User.find(filter)
      .select('-password')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id)
      .select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
};

// Update user (Admin)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Remove fields that shouldn't be updated directly
    delete updateData.password;
    delete updateData.totalPurchases;
    delete updateData.totalSpent;

    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      error: error.message
    });
  }
};

// Delete user (soft delete by deactivating)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deactivated successfully',
      data: user
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate user',
      error: error.message
    });
  }
};

// Reactivate user
exports.reactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User reactivated successfully',
      data: user
    });
  } catch (error) {
    console.error('Reactivate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reactivate user',
      error: error.message
    });
  }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const inactiveUsers = totalUsers - activeUsers;
    
    // Users by role
    const customerCount = await User.countDocuments({ role: 'customer' });
    const adminCount = await User.countDocuments({ role: 'admin' });
    
    // Users by membership level
    const membershipStats = await User.aggregate([
      { $match: { role: 'customer' } },
      {
        $group: {
          _id: '$membershipLevel',
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentRegistrations = await User.countDocuments({
      registrationDate: { $gte: sevenDaysAgo }
    });

    // Top spenders
    const topSpenders = await User.find({ role: 'customer' })
      .select('name email totalSpent membershipLevel')
      .sort({ totalSpent: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          activeUsers,
          inactiveUsers,
          customerCount,
          adminCount,
          recentRegistrations
        },
        membershipStats,
        topSpenders
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
      error: error.message
    });
  }
};

// Customer Profile Management Functions

// Update customer profile (self)
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      phone,
      address,
      plantPreferences,
      careLevel,
      plantingExperience,
      favoriteCategories,
      newsletter,
      careReminders,
      promotionalEmails
    } = req.body;

    const updateData = {
      name,
      phone,
      address,
      plantPreferences,
      careLevel,
      plantingExperience,
      favoriteCategories,
      newsletter,
      careReminders,
      promotionalEmails
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// Change password (self)
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get user with password
    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error.message
    });
  }
};

// Get user's order history
exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const Order = require('../models/Order');
    
    const orders = await Order.find({ customerId: userId })
      .populate('items.productId', 'name price image')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments({ customerId: userId });
    const totalPages = Math.ceil(totalOrders / limit);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages,
          totalOrders,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Get order history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order history',
      error: error.message
    });
  }
};

// Delete account (self - hard delete)
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Hard delete - remove user completely from database
    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account',
      error: error.message
    });
  }
};
