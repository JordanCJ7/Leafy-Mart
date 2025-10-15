const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Authentication Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Hide password by default
  },
  
  // Role-based Access Control
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  
  // Contact Information
  phone: {
    type: String,
    default: ''
  },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zipCode: { type: String, default: '' },
    country: { type: String, default: 'Sri Lanka' }
  },
  
  // Plant Store Business Logic
  plantPreferences: [{
    type: String,
    enum: ['Indoor', 'Outdoor', 'Flowering', 'Foliage', 'Succulents', 'Herbs', 'Trees', 'Shrubs'],
    default: []
  }],
  
  careLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Expert', 'Advanced'],
    default: 'Beginner'
  },
  
  plantingExperience: {
    type: String,
    enum: ['None', 'Some', 'Experienced'],
    default: 'None'
  },
  
  favoriteCategories: [String],
  
  // E-commerce & Purchase History
  totalPurchases: { 
    type: Number, 
    default: 0 
  },
  totalSpent: { 
    type: Number, 
    default: 0 
  },
  
  // Loyalty Program
  membershipLevel: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  
  // Communication Preferences
  newsletter: { 
    type: Boolean, 
    default: true 
  },
  careReminders: { 
    type: Boolean, 
    default: true 
  },
  promotionalEmails: { 
    type: Boolean, 
    default: true 
  },
  
  
  // Account Status & Dates
  isActive: {
    type: Boolean,
    default: true
  },
  lastPurchase: { 
    type: Date 
  },
  registrationDate: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Virtual for full name (backward compatibility with Customer model)
userSchema.virtual('fullName').get(function() {
  return this.name;
});

userSchema.virtual('firstName').get(function() {
  return this.name.split(' ')[0] || this.name;
});

userSchema.virtual('lastName').get(function() {
  const nameParts = this.name.split(' ');
  return nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
});

// Method to calculate membership level based on total spent
userSchema.methods.updateMembershipLevel = function() {
  if (this.totalSpent > 100000) { // > 100,000 LKR
    this.membershipLevel = 'Platinum';
  } else if (this.totalSpent > 50000) { // > 50,000 LKR
    this.membershipLevel = 'Gold';
  } else if (this.totalSpent > 20000) { // > 20,000 LKR
    this.membershipLevel = 'Silver';
  } else {
    this.membershipLevel = 'Bronze';
  }
  return this.membershipLevel;
};

// Method to record purchase
userSchema.methods.recordPurchase = function(amount) {
  this.totalPurchases += 1;
  this.totalSpent += amount;
  this.lastPurchase = new Date();
  
  // Update membership level based on new spending
  this.updateMembershipLevel();
  
  return this.membershipLevel;
};

// Index for efficient queries (email already indexed via unique: true)
userSchema.index({ role: 1 });
userSchema.index({ membershipLevel: 1 });
userSchema.index({ registrationDate: -1 });

module.exports = mongoose.model('User', userSchema);
