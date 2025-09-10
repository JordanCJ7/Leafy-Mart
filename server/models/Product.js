const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  priceLKR: { type: Number, required: true },
  priceDisplay: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Herbs', 'Indoor Vines', 'Air Purifiers', 'Palms', 'Flowering Shrubs', 'Shade Plants', 'Foliage', 'Low-Maintenance', 'Hanging & Trailing', 'Statement Trees', 'Succulents & Cacti', 'Fragrant Climbers']
  },
  tags: [{ 
    type: String,
    enum: ['medicinal', 'herb', 'balcony', 'easy-care', 'trailing', 'low-light', 'statement', 'indoors', 'office', 'air-purifying', 'tropical', 'large-space', 'fragrant', 'colorful', 'flowering', 'shade-tolerant', 'clean-air', 'drought-tolerant', 'kids-friendly', 'outdoor', 'decorative', 'climbing', 'spines', 'blue-flowers', 'winter-hardy']
  }],
  stock: { type: Number, required: true, min: 0 },
  img: { type: String, required: true },
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  supplier: { type: String }
}, { timestamps: true });

// Auto-generate priceDisplay before saving
productSchema.pre('save', function(next) {
  if (this.priceLKR) {
    this.priceDisplay = `LKR ${this.priceLKR.toLocaleString()}`;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
