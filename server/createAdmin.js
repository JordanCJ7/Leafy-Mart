// Admin User Creation Script
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('./models/User');

const createAdminUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://cj:777@cluster0.hfvfbcg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        
        console.log('Connected to MongoDB');
        
        // Check if admin already exists
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists:', existingAdmin.email);
            process.exit(0);
        }
        
        // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@leafymart.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        
        const adminUser = new User({
            name: 'System Administrator',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            phone: '0000000000',
            address: {
                street: 'System',
                city: 'System',
                state: 'System',
                zipCode: '00000',
                country: 'Sri Lanka'
            },
            isActive: true
        });
        
        await adminUser.save();
        
        console.log('✅ Admin user created successfully!');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('Please change the default password after first login.');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
        process.exit(1);
    }
};

// Run the script if called directly
if (require.main === module) {
    createAdminUser();
}

module.exports = createAdminUser;
