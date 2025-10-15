const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  priceLKR: { type: Number, required: true },
  // priceDisplay is derived from priceLKR for presentation; implemented as a virtual below
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

// Include virtuals when converting documents to JSON or Objects so frontend receives priceDisplay
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

// Virtual getter for formatted price display (not stored in DB)
productSchema.virtual('priceDisplay').get(function() {
  if (typeof this.priceLKR === 'number') {
    return `LKR ${this.priceLKR.toLocaleString()}`;
  }
  return '';
});

// Auto-generate product `id` in the pattern Pnnn (P001, P002, ...)
productSchema.pre('validate', async function(next) {
  try {
    if (!this.id) {
      // Find the product with the highest numeric P### id
      const Product = mongoose.model('Product');
      const doc = await Product.find({ id: /^P\d{3}$/ }).sort({ id: -1 }).limit(1).lean();
      let nextNum = 1;
      if (doc && doc.length > 0) {
        const match = doc[0].id.match(/^P(\d{3})$/);
        if (match) {
          nextNum = parseInt(match[1], 10) + 1;
        }
      }

      const padded = String(nextNum).padStart(3, '0');
      this.id = `P${padded}`;
    }
  } catch (err) {
    console.warn('Failed to auto-generate product id:', err);
    // Let validation continue; if id is required and missing, validation will fail
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
