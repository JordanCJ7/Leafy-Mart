const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
  total: Number,
  address: String,
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
