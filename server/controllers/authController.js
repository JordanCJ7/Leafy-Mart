const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id, role = 'customer') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '30d',
    });
};

// Customer registration
const registerCustomer = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Check if customer already exists
        const existingCustomer = await User.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ 
                success: false, 
                message: 'Customer with this email already exists' 
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create customer
        const customer = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            role: 'customer'
        });

        // Generate token
        const token = generateToken(customer._id, 'customer');

        res.status(201).json({
            success: true,
            message: 'Customer registered successfully',
            user: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                role: customer.role
            },
            token
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to register customer',
            error: error.message 
        });
    }
};

// Customer login
const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find customer
        const customer = await User.findOne({ email }).select('+password');
        if (!customer) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Generate token
        const token = generateToken(customer._id, customer.role);

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: customer._id,
                name: customer.name,
                email: customer.email,
                role: customer.role
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to login',
            error: error.message 
        });
    }
};

// Admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin user
        const admin = await User.findOne({ email, role: 'admin' }).select('+password');
        if (!admin) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid admin credentials' 
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid admin credentials' 
            });
        }

        // Generate token
        const token = generateToken(admin._id, 'admin');

        res.json({
            success: true,
            message: 'Admin login successful',
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            },
            token
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to login as admin',
            error: error.message 
        });
    }
};

// Get current user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.json({
            success: true,
            user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    address: user.address,
                    plantPreferences: user.plantPreferences
                }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to get user profile',
            error: error.message 
        });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { name, phone, address, plantPreferences } = req.body;
        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                name,
                phone,
                address,
                plantPreferences
            },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
                plantPreferences: user.plantPreferences
            }
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

module.exports = {
    registerCustomer,
    loginCustomer,
    loginAdmin,
    getUserProfile,
    updateUserProfile
};
