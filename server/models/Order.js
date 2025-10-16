const mongoose = require('mongoose');

// Status History Schema - tracks each status update with its tracking number
const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    required: true
  },
  trackingNumber: {
    type: String, // Format: #001, #002, etc.
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  updatedBy: String, // Admin name or email
  notes: String
}, { _id: true });

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Order Items
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }, // Price at time of order
  }],
  
  // Order Details
  orderNumber: { type: String, unique: true, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  
  // Pricing
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Membership discount
  discountPercentage: { type: Number, default: 0 }, // Store the discount percentage applied
  tax: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  total: { type: Number, required: true },
  
  // Payment
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'], 
    default: 'Pending' 
  },
  paymentMethod: {
    type: String,
    enum: ['Cash on Delivery', 'Card', 'Bank Transfer', 'Digital Wallet'],
    default: 'Cash on Delivery'
  },
  
  // Shipping Information
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'Sri Lanka' }
  },
  
  // Delivery Information
  estimatedDelivery: Date,
  actualDelivery: Date,
  trackingNumber: String, // Current/latest tracking number
  
  // Status History - tracks all status updates with sequential tracking numbers
  statusHistory: [statusHistorySchema],
  
  // Special Instructions
  notes: String,
  specialInstructions: String,
  
  // Order Processing
  processedBy: String, // Admin who processed the order
  processedAt: Date,
  stockDeducted: { type: Boolean, default: false }, // Track if inventory has been decremented
  
  // Plant Care Information
  careInstructions: [String], // Care instructions for ordered plants
  seasonalNotes: String, // Seasonal care notes
  
  // (feedback removed)
  
}, { timestamps: true });

// Generate order number before validation so required validation passes
orderSchema.pre('validate', async function(next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Count orders today to generate sequence
    const startOfDay = new Date(year, date.getMonth(), date.getDate());
    const endOfDay = new Date(year, date.getMonth(), date.getDate() + 1);
    
    const todayOrderCount = await mongoose.model('Order').countDocuments({
      createdAt: { $gte: startOfDay, $lt: endOfDay }
    });
    
    const sequence = String(todayOrderCount + 1).padStart(3, '0');
    this.orderNumber = `ORD${year}${month}${day}${sequence}`;
  }
  next();
});

// Method to calculate total
orderSchema.methods.calculateTotal = function() {
  const itemsTotal = this.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  this.subtotal = itemsTotal;
  // Total = subtotal - discount + tax + shipping
  this.total = this.subtotal - this.discount + this.tax + this.shippingCost;
  return this.total;
};

// Method to generate next tracking number for this order
orderSchema.methods.generateTrackingNumber = function() {
  // Count existing status history entries to determine next sequence number
  const sequenceNumber = this.statusHistory.length + 1;
  // Format as #001, #002, etc. (hash + zero-padded 3 digits)
  const trackingNumber = '#' + String(sequenceNumber).padStart(3, '0');
  return trackingNumber;
};

// Method to add status update to history with tracking number
orderSchema.methods.addStatusUpdate = function(status, updatedBy, notes) {
  const trackingNumber = this.generateTrackingNumber();
  
  this.statusHistory.push({
    status,
    trackingNumber,
    updatedBy,
    notes,
    timestamp: new Date()
  });
  
  return trackingNumber;
};

module.exports = mongoose.model('Order', orderSchema);
