// Local product catalogue (used by Home and ProductDetail)
const products = [
  {
    id: 'tulsi',
    name: 'Tulsi (Holy Basil)',
    priceLKR: 1200, // LKR
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
    tags: ['air-purifying', 'robust', 'low-water'],
    stock: 18,
    desc: 'Very resilient air-purifying plant; tolerates low light and irregular watering — perfect for busy households.',
  img: '/images/snakeplant.png'
  },
  {
    id: 'areca-palm',
    name: 'Areca Palm',
    priceLKR: 7000,
    priceDisplay: 'LKR 7,000',
    category: 'Palms',
    tags: ['indoor', 'humidity-loving', 'statement'],
    stock: 6,
    desc: 'Popular indoor palm in South Asia — bright indirect light and regular humidity keep it happy; great for living rooms and offices.',
  img: '/images/areca.png'
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus (Gulabo)',
    priceLKR: 2500,
    priceDisplay: 'LKR 2,500',
    category: 'Flowering Shrubs',
    tags: ['outdoor', 'flowering', 'sun-loving'],
    stock: 12,
    desc: 'Flowering shrub commonly grown for its bright blooms; thrives in warm climates with full sun and regular watering.',
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
  }
  ,
  {
    id: 'rubber-plant',
    name: 'Rubber Plant (Ficus elastica)',
    priceLKR: 4200,
    priceDisplay: 'LKR 4,200',
    category: 'Foliage',
    tags: ['statement', 'low-light', 'indoors'],
    stock: 8,
    desc: 'Glossy large leaves make this a statement indoor plant; tolerates moderate light and rewards occasional pruning.',
    img: '/images/moneyplant.png'
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
    img: '/images/snakeplant.png'
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
    img: '/images/moneyplant.png'
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig (Small)',
    priceLKR: 8500,
    priceDisplay: 'LKR 8,500',
    category: 'Statement Trees',
    tags: ['large-leaves', 'bright-indirect', 'living-room'],
    stock: 4,
    desc: 'Small-size fiddle leaf fig for apartments — needs bright, indirect light and consistent care to thrive.',
    img: '/images/areca.png'
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    priceLKR: 900,
    priceDisplay: 'LKR 900',
    category: 'Succulents & Cacti',
    tags: ['medicinal', 'drought-tolerant', 'sun-loving'],
    stock: 26,
    desc: 'Low-maintenance succulent valued for its soothing gel — prefers bright light and sparse watering.',
    img: '/images/Tulsi.png'
  }
  ,
  {
    id: 'jasmine-plant',
    name: 'Jasmine (Malli)',
    priceLKR: 2200,
    priceDisplay: 'LKR 2,200',
    category: 'Fragrant Climbers',
    tags: ['outdoor', 'fragrant', 'flowering'],
    stock: 14,
    desc: 'Fragrant climber widely grown for its aromatic white flowers used in garlands and ceremonies; prefers sunny spots and regular feeding.',
    img: '/images/hibiscus.png'
  }
];

export default products;
