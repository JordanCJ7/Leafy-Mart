const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  // Basic Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  
  // Address Information
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'Sri Lanka' }
  },
  
  // Plant Store Specific
  plantPreferences: [{
    type: String,
    enum: ['Indoor', 'Outdoor', 'Flowering', 'Foliage', 'Succulents', 'Herbs', 'Trees', 'Shrubs']
  }],
  
  careLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  
  // Purchase History
  totalPurchases: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  favoriteCategories: [String],
  
  // Loyalty Program
  loyaltyPoints: { type: Number, default: 0 },
  membershipLevel: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  
  // Communication Preferences
  newsletter: { type: Boolean, default: true },
  careReminders: { type: Boolean, default: true },
  promotionalEmails: { type: Boolean, default: true },
  
  // Account Status
  isActive: { type: Boolean, default: true },
  lastPurchase: { type: Date },
  registrationDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Virtual for full name
customerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to calculate membership level based on total spent
customerSchema.methods.updateMembershipLevel = function() {
  if (this.totalSpent >= 50000) { // 50,000 LKR
    this.membershipLevel = 'Platinum';
  } else if (this.totalSpent >= 25000) { // 25,000 LKR
    this.membershipLevel = 'Gold';
  } else if (this.totalSpent >= 10000) { // 10,000 LKR
    this.membershipLevel = 'Silver';
  } else {
    this.membershipLevel = 'Bronze';
  }
};

// Method to add loyalty points
customerSchema.methods.addLoyaltyPoints = function(purchaseAmount) {
  // 1 point per 100 LKR spent
  const pointsEarned = Math.floor(purchaseAmount / 100);
  this.loyaltyPoints += pointsEarned;
  return pointsEarned;
};

module.exports = mongoose.model('Customer', customerSchema);
