const mongoose = require('mongoose');
const path = require('path');
const Product = require('./models/Product');
const connectDB = require('./config/db');
// Ensure we load the server/.env even when seeder is run from the repo root
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Define 25 products. Do NOT include `id` so the Product model auto-generates Pnnn ids.
const products = [
  { name: 'Tulsi (Holy Basil)', priceLKR: 1200, category: 'Herbs', tags: ['medicinal', 'herb', 'balcony'], stock: 24, desc: 'Sacred and medicinal herb common across South Asia — useful in teas and rituals. Thrives in warm sunny spots and regular watering.', img: '/images/tulsi.png' },
  { name: 'Money Plant (Pothos)', priceLKR: 1800, category: 'Indoor Vines', tags: ['easy-care', 'trailing', 'low-light'], stock: 40, desc: 'Hardy trailing vine ideal for indoors and balconies. Low light tolerant and very easy to propagate from cuttings.', img: '/images/moneyplant.png' },
  { name: 'Snake Plant (Sansevieria)', priceLKR: 3000, category: 'Air Purifiers', tags: ['low-light', 'statement', 'indoors'], stock: 15, desc: 'Striking upright leaves with yellow borders; excellent air purifier and extremely low maintenance.', img: '/images/snakeplant.png' },
  { name: 'Areca Palm', priceLKR: 5500, category: 'Palms', tags: ['air-purifying', 'office', 'tropical'], stock: 6, desc: 'Graceful feathery fronds bring tropical elegance indoors; thrives in bright, indirect light with consistent moisture.', img: '/images/areca.png' },
  { name: 'Hibiscus', priceLKR: 2400, category: 'Flowering Shrubs', tags: ['tropical', 'large-space', 'fragrant'], stock: 12, desc: 'Vibrant tropical blooms in stunning colors; prefers full sun and regular feeding for continuous flowering.', img: '/images/hibiscus.png' },
  { name: 'Peace Lily', priceLKR: 3600, category: 'Shade Plants', tags: ['shade-tolerant', 'flowering', 'clean-air'], stock: 10, desc: 'Compact, shade-tolerant plant with elegant white blooms; prefers consistent moisture and bright, indirect light.', img: '/images/peacelily.png' },
  { name: 'Rubber Plant (Ficus elastica)', priceLKR: 4200, category: 'Foliage', tags: ['statement', 'low-light', 'indoors'], stock: 8, desc: 'Glossy large leaves make this a statement indoor plant; tolerates moderate light and rewards occasional pruning.', img: '/images/tulsi.png' },
  { name: 'ZZ Plant (Zamioculcas)', priceLKR: 2900, category: 'Low-Maintenance', tags: ['low-light', 'drought-tolerant', 'office'], stock: 22, desc: 'Almost indestructible, the ZZ plant is perfect for offices and low-light corners — very low watering needs.', img: '/images/tulsi.png' },
  { name: 'Spider Plant', priceLKR: 1500, category: 'Hanging & Trailing', tags: ['easy-care', 'air-purifying', 'kids-friendly'], stock: 30, desc: 'Classic hanging plant with arching leaves and baby plantlets — forgiving and great for beginners.', img: '/images/tulsi.png' },
  { name: 'Fiddle Leaf Fig', priceLKR: 6800, category: 'Statement Trees', tags: ['statement', 'indoors', 'decorative'], stock: 4, desc: 'Large, violin-shaped leaves create a dramatic focal point; needs bright, indirect light and consistent watering.', img: '/images/tulsi.png' },
  { name: 'Jade Plant', priceLKR: 1800, category: 'Succulents & Cacti', tags: ['drought-tolerant', 'outdoor', 'low-light'], stock: 35, desc: 'Thick, fleshy leaves store water efficiently — perfect for sunny windows and requires minimal watering.', img: '/images/tulsi.png' },
  { name: 'Jasmine', priceLKR: 3200, category: 'Fragrant Climbers', tags: ['fragrant', 'climbing', 'flowering'], stock: 18, desc: 'Intensely fragrant white flowers bloom in evening hours; perfect climber for trellises and garden walls.', img: '/images/tulsi.png' },
  { name: 'Aloe Vera', priceLKR: 900, category: 'Succulents & Cacti', tags: ['medicinal', 'easy-care', 'drought-tolerant'], stock: 50, desc: 'Aloe vera is a medicinal succulent used for soothing burns and skin care; very tolerant of neglect.', img: '/images/tulsi.png' },
  { name: 'Lavender', priceLKR: 2100, category: 'Flowering Shrubs', tags: ['fragrant', 'flowering', 'decorative'], stock: 14, desc: 'Aromatic perennial with purple blooms; great for potting and attracting pollinators.', img: '/images/tulsi.png' },
  { name: 'Rosemary', priceLKR: 1300, category: 'Herbs', tags: ['medicinal', 'herb', 'balcony'], stock: 28, desc: 'Woody perennial herb with needle-like leaves, used widely in cooking and aromatherapy.', img: '/images/tulsi.png' },
  { name: 'bonsai (Ficus)', priceLKR: 5200, category: 'Statement Trees', tags: ['indoors', 'decorative', 'statement'], stock: 5, desc: 'Carefully pruned bonsai tree for indoor display; requires regular pruning and attention.', img: '/images/tulsi.png' },
  { name: 'Orchid (Phalaenopsis)', priceLKR: 7500, category: 'Flowering Shrubs', tags: ['fragrant', 'large-space', 'indoors'], stock: 7, desc: 'Elegant long-lasting blooms ideal for display; prefers bright, indirect light and humidity.', img: '/images/tulsi.png' },
  { name: 'Echeveria', priceLKR: 1400, category: 'Succulents & Cacti', tags: ['drought-tolerant', 'decorative', 'easy-care'], stock: 26, desc: 'Rosette-forming succulent available in many colors; perfect for small pots and rock gardens.', img: '/images/tulsi.png' },
  { name: 'Mint', priceLKR: 800, category: 'Herbs', tags: ['herb', 'balcony', 'easy-care'], stock: 60, desc: 'Fast-growing herb used for teas and cooking; best kept in pots to contain spread.', img: '/images/tulsi.png' },
  { name: 'Ponytail Palm', priceLKR: 3300, category: 'Foliage', tags: ['drought-tolerant', 'statement', 'indoors'], stock: 9, desc: 'Unique bulbous trunk with long arching leaves — a drought-tolerant conversation piece.', img: '/images/tulsi.png' },
  { name: 'Camellia', priceLKR: 4800, category: 'Flowering Shrubs', tags: ['decorative', 'large-space', 'fragrant'], stock: 6, desc: 'Showy glossy leaves with rose-like blooms in cooler seasons; prefers acidic soil.', img: '/images/tulsi.png' },
  { name: 'Geranium', priceLKR: 1100, category: 'Flowering Shrubs', tags: ['decorative', 'easy-care', 'flowering'], stock: 34, desc: 'Vibrant flowering plant for pots and beds; blooms profusely with regular deadheading.', img: '/images/tulsi.png' },
  { name: 'Sago Palm', priceLKR: 6200, category: 'Palms', tags: ['statement', 'outdoor', 'decorative'], stock: 3, desc: 'Architectural cycad with stiff fronds; suitable for larger gardens and planters.', img: '/images/tulsi.png' },
  { name: 'Monstera Deliciosa', priceLKR: 5200, category: 'Foliage', tags: ['statement', 'indoors', 'decorative'], stock: 7, desc: 'Popular tropical split-leaf plant, great as a statement indoor plant; prefers bright, indirect light.', img: '/images/tulsi.png' },
  { name: 'Begonia', priceLKR: 1250, category: 'Shade Plants', tags: ['shade-tolerant', 'decorative', 'flowering'], stock: 20, desc: 'Colorful foliage and flowers; performs well in shaded spots and as a container plant.', img: '/images/tulsi.png' }
];

async function seedProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Create products one-by-one so Mongoose hooks (pre-validate) run and generate Pnnn ids
    const created = [];
    for (const p of products) {
      const createdProduct = await Product.create(p);
      created.push(createdProduct);
      console.log(`Created: ${createdProduct.id} - ${createdProduct.name}`);
    }

    console.log(`Successfully seeded ${created.length} products`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

seedProducts();
