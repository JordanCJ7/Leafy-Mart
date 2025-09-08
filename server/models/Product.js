const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: String,
  category: String,
  supplier: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
