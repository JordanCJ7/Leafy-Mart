const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');
require('dotenv').config();

// Import existing products data
const existingProducts = [
  {
    id: 'tulsi',
    name: 'Tulsi (Holy Basil)',
    priceLKR: 1200,
    priceDisplay: 'LKR 1,200',
    category: 'Herbs',
    tags: ['medicinal', 'herb', 'balcony'],
    stock: 24,
    desc: 'Sacred and medicinal herb common across South Asia — useful in teas and rituals. Thrives in warm sunny spots and regular watering.',
    img: '/images/tulsi.png'
  },
  {
    id: 'money-plant',
    name: 'Money Plant (Pothos)',
    priceLKR: 1800,
    priceDisplay: 'LKR 1,800',
    category: 'Indoor Vines',
    tags: ['easy-care', 'trailing', 'low-light'],
    stock: 40,
    desc: 'Hardy trailing vine ideal for indoors and balconies. Low light tolerant and very easy to propagate from cuttings.',
    img: '/images/moneyplant.png'
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant (Sansevieria)',
    priceLKR: 3000,
    priceDisplay: 'LKR 3,000',
    category: 'Air Purifiers',
    tags: ['low-light', 'statement', 'indoors'],
    stock: 15,
    desc: 'Striking upright leaves with yellow borders; excellent air purifier and extremely low maintenance.',
    img: '/images/snakeplant.png'
  },
  {
    id: 'areca-palm',
    name: 'Areca Palm',
    priceLKR: 5500,
    priceDisplay: 'LKR 5,500',
    category: 'Palms',
    tags: ['air-purifying', 'office', 'tropical'],
    stock: 6,
    desc: 'Graceful feathery fronds bring tropical elegance indoors; thrives in bright, indirect light with consistent moisture.',
    img: '/images/areca.png'
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus',
    priceLKR: 2400,
    priceDisplay: 'LKR 2,400',
    category: 'Flowering Shrubs',
    tags: ['tropical', 'large-space', 'fragrant'],
    stock: 12,
    desc: 'Vibrant tropical blooms in stunning colors; prefers full sun and regular feeding for continuous flowering.',
    img: '/images/hibiscus.png'
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    priceLKR: 3600,
    priceDisplay: 'LKR 3,600',
    category: 'Shade Plants',
    tags: ['shade-tolerant', 'flowering', 'clean-air'],
    stock: 10,
    desc: 'Compact, shade-tolerant plant with elegant white blooms; prefers consistent moisture and bright, indirect light.',
    img: '/images/peacelily.png'
  },
  {
    id: 'rubber-plant',
    name: 'Rubber Plant (Ficus elastica)',
    priceLKR: 4200,
    priceDisplay: 'LKR 4,200',
    category: 'Foliage',
    tags: ['statement', 'low-light', 'indoors'],
    stock: 8,
    desc: 'Glossy large leaves make this a statement indoor plant; tolerates moderate light and rewards occasional pruning.',
    img: '/images/Money%20Plant.png'
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant (Zamioculcas)',
    priceLKR: 2900,
    priceDisplay: 'LKR 2,900',
    category: 'Low-Maintenance',
    tags: ['low-light', 'drought-tolerant', 'office'],
    stock: 22,
    desc: 'Almost indestructible, the ZZ plant is perfect for offices and low-light corners — very low watering needs.',
    img: '/images/Snake%20Plant.png'
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    priceLKR: 1500,
    priceDisplay: 'LKR 1,500',
    category: 'Hanging & Trailing',
    tags: ['easy-care', 'air-purifying', 'kids-friendly'],
    stock: 30,
    desc: 'Classic hanging plant with arching leaves and baby plantlets — forgiving and great for beginners.',
    img: '/images/Money%20Plant.png'
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    priceLKR: 6800,
    priceDisplay: 'LKR 6,800',
    category: 'Statement Trees',
    tags: ['statement', 'indoors', 'decorative'],
    stock: 4,
    desc: 'Large, violin-shaped leaves create a dramatic focal point; needs bright, indirect light and consistent watering.',
    img: '/images/Areca%20Palm.png'
  },
  {
    id: 'jade-plant',
    name: 'Jade Plant',
    priceLKR: 1800,
    priceDisplay: 'LKR 1,800',
    category: 'Succulents & Cacti',
    tags: ['drought-tolerant', 'outdoor', 'low-light'],
    stock: 35,
    desc: 'Thick, fleshy leaves store water efficiently — perfect for sunny windows and requires minimal watering.',
    img: '/images/Tulsi.png'
  },
  {
    id: 'jasmine',
    name: 'Jasmine',
    priceLKR: 3200,
    priceDisplay: 'LKR 3,200',
    category: 'Fragrant Climbers',
    tags: ['fragrant', 'climbing', 'flowering'],
    stock: 18,
    desc: 'Intensely fragrant white flowers bloom in evening hours; perfect climber for trellises and garden walls.',
    img: '/images/Hibiscus.png'
  }
];

async function seedProducts() {
  try {
    console.log('Connecting to MongoDB...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(existingProducts);
    console.log(`Successfully seeded ${insertedProducts.length} products`);

    // Display inserted products
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (${product.category})`);
    });

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

seedProducts();
