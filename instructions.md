# Botanica Hub 🌿 - Comprehensive Development Guidelines

## Table of Contents
1. [Project Overview & Progress Assessment](#project-overview--progress-assessment)
2. [Design System & Theme Guide](#design-system--theme-guide)
3. [Architecture & Technical Stack](#architecture--technical-stack)
4. [Feature Implementation Roadmap](#feature-implementation-roadmap)
5. [Development Standards & Best Practices](#development-standards--best-practices)
6. [Database Schema & Models](#database-schema--models)
7. [API Documentation](#api-documentation)
8. [UI/UX Guidelines](#uiux-guidelines)
9. [Testing & Quality Assurance](#testing--quality-assurance)
10. [Deployment & DevOps](#deployment--devops)

---

## Project Overview & Progress Assessment

### System Identity
**Name:** Botanica Hub 🌿 (Smart Plant Store Management System)
**Tagline:** "Growing Your Green Dreams"
**Vision:** Modernize plant store operations through digital transformation

### Current Progress Status ✅
Based on codebase analysis, the following components are **IMPLEMENTED**:

#### ✅ **Completed Features**
- **Authentication System**: Customer & Admin login/signup with JWT tokens
- **Navigation Infrastructure**: Responsive navbar with plant-themed design
- **Page Routing**: React Router setup with protected routes
- **Basic UI Framework**: Component structure with consistent theming
- **Database Models**: User, Product, Order, Supplier schemas
- **API Controllers**: CRUD operations for all major entities
- **Product Catalog**: Static product data with 6 plant varieties
- **Admin Foundation**: Basic admin dashboard structure

#### 🔄 **Partially Implemented**
- **User Profile Management**: Basic structure exists, needs enhancement
- **Wishlist System**: UI components exist, backend integration pending
- **Order Tracking**: UI mockup ready, real data integration needed
- **Admin Dashboard**: Basic layout exists, functionality needs implementation

#### ❌ **Pending Implementation** (Priority Features)
- **Inventory Management**: Full CRUD operations for admin
- **Shopping Cart System**: Add/remove items, quantity management
- **Payment Integration**: Gateway setup and processing
- **Delivery Management**: Status tracking and logistics
- **Advanced Search & Filtering**: Category-based product discovery
- **Analytics Dashboard**: Sales reports and inventory insights

---

## Design System & Theme Guide

### Color Palette 🎨
The Botanica Hub follows a nature-inspired color scheme that reflects growth, freshness, and sustainability:

#### Primary Colors
```css
--primary-dark: #2e7d32      /* Dark Forest Green - Headers, CTA buttons */
--primary-medium: #388e3c    /* Medium Green - Navigation, accents */
--primary-light: #43a047     /* Fresh Green - Hover states, highlights */
--primary-pale: #66bb6a      /* Light Green - Success states */
--primary-subtle: #a5d6a7    /* Subtle Green - Icons, secondary text */
```

#### Secondary Colors
```css
--background-light: #f1faee  /* Soft mint - Page backgrounds */
--background-white: #ffffff  /* Pure white - Cards, modals */
--text-primary: #2c3e50     /* Dark slate - Primary text */
--text-secondary: #555555   /* Medium gray - Secondary text */
--text-muted: #888888       /* Light gray - Placeholder text */
```

#### Status Colors
```css
--success: #388e3c          /* Green - Success messages */
--warning: #ffa726          /* Orange - Pending states */
--error: #e74c3c            /* Red - Error messages */
--info: #3498db             /* Blue - Information */
```

### Typography System
```css
/* Primary Font Family */
font-family: 'Segoe UI', 'Roboto', 'Inter', Arial, sans-serif;

/* Heading Scale */
.h1 { font-size: 2.5rem; font-weight: 700; }
.h2 { font-size: 2rem; font-weight: 600; }
.h3 { font-size: 1.5rem; font-weight: 600; }
.h4 { font-size: 1.25rem; font-weight: 500; }

/* Body Text */
.body-large { font-size: 1.125rem; line-height: 1.6; }
.body-regular { font-size: 1rem; line-height: 1.5; }
.body-small { font-size: 0.875rem; line-height: 1.4; }
```

### Component Design Principles
1. **Biophilic Design**: Nature-inspired shapes, organic curves
2. **Growth Metaphors**: Upward animations, expanding elements
3. **Accessibility First**: WCAG 2.1 AA compliance
4. **Mobile-First**: Responsive breakpoints at 768px, 1024px
5. **Micro-interactions**: Hover effects, loading states, transitions

### Visual Elements
- **Border Radius**: 8px for cards, 12px for major containers, 25px for search bars
- **Shadows**: `0 4px 6px rgba(0,0,0,0.1)` for cards, `0 8px 20px rgba(67, 160, 71, 0.4)` for hover states
- **Icons**: Lucide React icon library with consistent 20px/24px sizing
- **Gradients**: `linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)` for headers

---

## Architecture & Technical Stack

### Frontend Architecture 🖥️
```
client/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.js      # Navigation with auth state
│   │   ├── Footer.js      # Site footer
│   │   └── ProtectedRoute.js # Route authentication
│   ├── pages/             # Route components
│   │   ├── Home.js        # Landing page with hero section
│   │   ├── Products.js    # Product catalog with filters
│   │   ├── AdminDashboard.js # Admin control panel
│   │   └── [other pages]
│   ├── contexts/          # React Context API
│   │   └── AuthContext.js # Authentication state management
│   ├── services/          # API communication layer
│   │   └── api.js         # HTTP requests and endpoints
│   ├── data/             # Static data and constants
│   │   └── products.js    # Initial product catalog
│   └── styles/           # CSS modules and themes
```

### Backend Architecture 🗄️
```
server/
├── controllers/           # Business logic handlers
│   ├── authController.js  # Authentication operations
│   ├── productController.js # Product CRUD operations
│   ├── orderController.js  # Order management
│   ├── adminController.js  # Admin-specific operations
│   └── [other controllers]
├── models/               # MongoDB schema definitions
│   ├── User.js           # Customer/Admin user model
│   ├── Product.js        # Plant product schema
│   ├── Order.js          # Order transaction model
│   └── Supplier.js       # Supplier management
├── routes/               # Express route definitions
│   ├── auth.js           # Authentication endpoints
│   ├── products.js       # Product API routes
│   ├── orders.js         # Order processing routes
│   └── [other routes]
├── middleware/           # Custom Express middleware
│   ├── auth.js           # JWT token verification
│   └── errorHandler.js   # Centralized error handling
└── config/               # Configuration files
    └── db.js             # MongoDB connection setup
```

### Technology Stack Summary
- **Frontend**: React 19.1.1 + React Router DOM 7.8.2
- **Backend**: Node.js + Express 5.1.0
- **Database**: MongoDB 8.18.0 + Mongoose ODM
- **Authentication**: JWT (jsonwebtoken 9.0.2) + bcryptjs 3.0.2
- **HTTP Client**: Fetch API (built-in)
- **Icons**: Lucide React 0.542.0
- **Testing**: Jest + React Testing Library
- **Development**: Create React App + Nodemon

---

## Feature Implementation Roadmap

### Phase 1: Core E-commerce Foundation (Weeks 1-4)

#### 1.1 Enhanced Inventory Management 🗃️
**Admin Requirements:**
- [ ] **Product CRUD Interface**: Full create, read, update, delete functionality
- [ ] **Stock Management**: Real-time inventory tracking with low-stock alerts
- [ ] **Category Management**: Plant categories (Indoor, Outdoor, Herbs, etc.)
- [ ] **Image Upload**: Multiple product images with optimization
- [ ] **Bulk Operations**: Import/export product catalogs

**Implementation Steps:**
```javascript
// Enhanced Product Model
const productSchema = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number, default: 0 },
  stock: { type: Number, required: true, min: 0 },
  lowStockThreshold: { type: Number, default: 5 },
  images: [{ url: String, alt: String }],
  category: { 
    type: String, 
    enum: ['Indoor Plants', 'Outdoor Plants', 'Herbs', 'Air Purifiers', 'Palms', 'Flowering'],
    required: true 
  },
  tags: [String],
  care_instructions: {
    light: String,
    water: String,
    humidity: String,
    temperature: String
  },
  plant_info: {
    botanical_name: String,
    mature_size: String,
    growth_rate: { type: String, enum: ['Slow', 'Medium', 'Fast'] },
    pet_safe: { type: Boolean, default: false }
  },
  supplier: { type: ObjectId, ref: 'Supplier' },
  featured: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Out of Stock'], 
    default: 'Active' 
  }
};
```

#### 1.2 User Profile & Wishlist Enhancement 👤
**Customer Requirements:**
- [ ] **Complete Profile Management**: Personal details, shipping addresses, preferences
- [ ] **Wishlist Functionality**: Add/remove plants, share wishlists, move to cart
- [ ] **Plant Preferences**: Care level, indoor/outdoor preference, pet-safe options
- [ ] **Order History**: Past purchases with reorder functionality

**Database Schema Update:**
```javascript
const userSchema = {
  // ... existing fields
  profile: {
    avatar: String,
    phone: String,
    addresses: [{
      type: { type: String, enum: ['Home', 'Office', 'Other'] },
      street: String,
      city: String,
      province: String,
      postal_code: String,
      is_default: Boolean
    }],
    plant_preferences: {
      experience_level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'] },
      space_type: [{ type: String, enum: ['Balcony', 'Garden', 'Indoor', 'Office'] }],
      care_level: { type: String, enum: ['Low', 'Medium', 'High'] },
      pet_safe_only: { type: Boolean, default: false }
    }
  },
  wishlist: [{ type: ObjectId, ref: 'Product' }],
  cart: [{
    product: { type: ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    added_date: { type: Date, default: Date.now }
  }]
};
```

#### 1.3 Shopping Cart & Checkout System 🛒
**E-commerce Requirements:**
- [ ] **Persistent Cart**: Saved cart items across sessions
- [ ] **Quantity Management**: Increase/decrease item quantities
- [ ] **Price Calculations**: Subtotal, taxes, shipping costs
- [ ] **Guest Checkout**: Allow purchases without registration
- [ ] **Checkout Flow**: Multi-step process with validation

### Phase 2: Order & Payment Processing (Weeks 5-8)

#### 2.1 Advanced Order Management 📦
**Order Processing Features:**
- [ ] **Order States**: Pending → Confirmed → Preparing → Shipped → Delivered
- [ ] **Order Tracking**: Real-time status updates with notifications
- [ ] **Shipping Integration**: Calculate shipping costs based on location
- [ ] **Order Modifications**: Cancel/modify orders before shipping

**Enhanced Order Model:**
```javascript
const orderSchema = {
  order_number: { type: String, unique: true },
  customer: { type: ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: ObjectId, ref: 'Product' },
    name: String, // Store name at time of purchase
    price: Number, // Store price at time of purchase
    quantity: Number,
    subtotal: Number
  }],
  shipping_address: {
    recipient_name: String,
    phone: String,
    street: String,
    city: String,
    province: String,
    postal_code: String
  },
  pricing: {
    subtotal: Number,
    shipping_cost: Number,
    tax_amount: Number,
    discount_amount: Number,
    total_amount: Number
  },
  status: {
    current: { 
      type: String, 
      enum: ['Pending', 'Confirmed', 'Preparing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending' 
    },
    history: [{
      status: String,
      timestamp: Date,
      note: String,
      updated_by: { type: ObjectId, ref: 'User' }
    }]
  },
  payment: {
    method: { type: String, enum: ['COD', 'Card', 'Bank Transfer', 'Digital Wallet'] },
    status: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
    transaction_id: String,
    payment_date: Date
  },
  delivery: {
    estimated_date: Date,
    actual_date: Date,
    tracking_number: String,
    delivery_notes: String
  }
};
```

#### 2.2 Payment Gateway Integration 💳
**Payment Methods:**
- [ ] **Cash on Delivery (COD)**: Primary payment method for Sri Lanka
- [ ] **Card Payments**: Credit/Debit card processing
- [ ] **Digital Wallets**: eZ Cash, Dialog eZ Cash integration
- [ ] **Bank Transfer**: Direct bank payment options

### Phase 3: Advanced Features & Analytics (Weeks 9-12)

#### 3.1 Admin Analytics Dashboard 📊
**Business Intelligence Features:**
- [ ] **Sales Analytics**: Revenue trends, best-selling plants, customer insights
- [ ] **Inventory Reports**: Stock levels, turnover rates, reorder alerts
- [ ] **Customer Analytics**: Registration trends, order patterns, retention metrics
- [ ] **Supplier Performance**: Lead times, quality ratings, cost analysis

#### 3.2 Customer Experience Enhancements ⭐
**Advanced Features:**
- [ ] **Plant Care Reminders**: Watering and fertilizing schedules
- [ ] **Growth Tracking**: Photo uploads and progress logging
- [ ] **Community Features**: Plant care tips, user reviews, Q&A
- [ ] **Seasonal Recommendations**: Plant suggestions based on weather/season

---

## Development Standards & Best Practices

### Code Quality Standards 📝

#### React Component Standards
```javascript
// Example: Product Card Component
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const { user } = useAuth();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Component logic here
  
  return (
    <div className="product-card" data-testid="product-card">
      {/* JSX content */}
    </div>
  );
};

export default ProductCard;
```

#### API Response Standards
```javascript
// Success Response
{
  success: true,
  data: { /* response data */ },
  message: "Operation completed successfully",
  timestamp: "2025-09-09T10:00:00Z"
}

// Error Response
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input data",
    details: { field: "email", issue: "Email already exists" }
  },
  timestamp: "2025-09-09T10:00:00Z"
}
```

#### Database Naming Conventions
- **Collections**: Plural nouns (users, products, orders)
- **Fields**: snake_case (created_at, user_id, order_total)
- **Indexes**: Compound indexes for query optimization
- **References**: ObjectId with proper population

### Security Best Practices 🔒

#### Authentication & Authorization
```javascript
// JWT Token Structure
{
  user_id: "ObjectId",
  email: "user@example.com",
  role: "customer|admin",
  exp: timestamp,
  iat: timestamp
}

// Route Protection Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
```

#### Input Validation & Sanitization
```javascript
// Using express-validator
const { body, validationResult } = require('express-validator');

const validateProduct = [
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('price').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }),
  body('category').isIn(['Indoor Plants', 'Outdoor Plants', 'Herbs', 'Air Purifiers'])
];
```

---

## UI/UX Guidelines

### Design Principles 🎨

#### 1. Plant-Centric Visual Language
- **Organic Shapes**: Rounded corners, flowing layouts
- **Growth Metaphors**: Upward animations, expanding elements
- **Natural Imagery**: High-quality plant photography
- **Seasonal Adaptation**: Color schemes that reflect growing seasons

#### 2. Accessibility Standards (WCAG 2.1 AA)
```css
/* Color Contrast Requirements */
.text-primary { color: #2c3e50; } /* 7:1 contrast ratio */
.text-secondary { color: #555555; } /* 4.5:1 contrast ratio */

/* Focus States */
.focusable:focus {
  outline: 2px solid #43a047;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(67, 160, 71, 0.2);
}

/* Screen Reader Support */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

#### 3. Responsive Breakpoint System
```css
/* Mobile First Approach */
.container {
  padding: 1rem;
}

/* Tablet - 768px and up */
@media (min-width: 48rem) {
  .container {
    padding: 2rem;
    max-width: 768px;
  }
}

/* Desktop - 1024px and up */
@media (min-width: 64rem) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Large Desktop - 1440px and up */
@media (min-width: 90rem) {
  .container {
    max-width: 1440px;
  }
}
```

### Component Library Standards

#### Button Variants
```css
/* Primary CTA Button */
.btn-primary {
  background: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(67, 160, 71, 0.4);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #388e3c;
  border: 2px solid #388e3c;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #388e3c;
  color: white;
  transform: translateY(-2px);
}
```

#### Form Controls
```css
/* Input Fields */
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus {
  border-color: #43a047;
  box-shadow: 0 0 0 3px rgba(67, 160, 71, 0.1);
  outline: none;
}

.form-input.error {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}
```

---

## Testing & Quality Assurance

### Testing Strategy 🧪

#### Unit Testing with Jest & React Testing Library
```javascript
// ProductCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: '1',
  name: 'Snake Plant',
  price: 3000,
  image: '/images/snake-plant.jpg',
  category: 'Air Purifiers'
};

const renderWithAuth = (component) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    renderWithAuth(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Snake Plant')).toBeInTheDocument();
    expect(screen.getByText('LKR 3,000')).toBeInTheDocument();
    expect(screen.getByAltText('Snake Plant')).toBeInTheDocument();
  });

  test('handles add to cart action', () => {
    const mockAddToCart = jest.fn();
    renderWithAuth(
      <ProductCard product={mockProduct} onAddToCart={mockAddToCart} />
    );
    
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct.id);
  });
});
```

#### Integration Testing
```javascript
// API Integration Test
describe('Product API', () => {
  test('should fetch products successfully', async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });

  test('should create new product with admin auth', async () => {
    const newProduct = {
      name: 'Test Plant',
      price: 2500,
      category: 'Indoor Plants',
      stock: 10
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(newProduct)
    });

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data.name).toBe('Test Plant');
  });
});
```

### Performance Monitoring

#### Frontend Performance Metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

#### Backend Performance Requirements
- **API Response Time**: < 300ms for CRUD operations
- **Database Query Time**: < 100ms for simple queries
- **Concurrent Users**: Support 100+ simultaneous users
- **Uptime**: 99.5% availability

---

## Deployment & DevOps

### Environment Configuration 🌐

#### Development Environment
```bash
# Client Environment (.env)
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_VERSION=1.0.0

# Server Environment (.env)
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/botanica_hub_dev
JWT_SECRET=your_development_secret_key_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

#### Production Environment
```bash
# Server Production Environment
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/botanica_hub_prod
JWT_SECRET=super_secure_production_secret_key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://botanicahub.com
```

### Deployment Pipeline

#### Frontend Deployment (Netlify/Vercel)
```json
// package.json build scripts
{
  "scripts": {
    "build": "react-scripts build",
    "build:prod": "REACT_APP_ENV=production npm run build",
    "deploy": "npm run build:prod && netlify deploy --prod"
  }
}
```

#### Backend Deployment (Railway/Heroku)
```json
// package.json production scripts
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build step required'",
    "postinstall": "node createAdmin.js"
  }
}
```

### Monitoring & Logging

#### Error Tracking
```javascript
// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
    userAgent: req.get('User-Agent')
  });

  if (process.env.NODE_ENV === 'production') {
    // Log to external service (e.g., Sentry, LogRocket)
    logger.error(err);
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : err.message
    }
  });
};
```

---

## Implementation Priority Checklist

### Sprint 1: Foundation (Week 1-2) ✅
- [x] Project setup and configuration
- [x] Authentication system implementation
- [x] Basic routing and navigation
- [x] Database models and connections
- [x] Initial UI components and styling

### Sprint 2: Inventory Management (Week 3-4) 🔄
- [ ] **Admin Product Management**
  - [ ] Create new products with image upload
  - [ ] Edit existing product details
  - [ ] Delete products with confirmation
  - [ ] View product list with search/filter
  - [ ] Stock level monitoring and alerts
- [ ] **Category Management**
  - [ ] Create and manage plant categories
  - [ ] Assign products to categories
  - [ ] Category-based filtering

### Sprint 3: User Experience (Week 5-6) 🔄
- [ ] **Enhanced User Profiles**
  - [ ] Complete profile management interface
  - [ ] Address book functionality
  - [ ] Plant care preferences
- [ ] **Wishlist System**
  - [ ] Add/remove items from wishlist
  - [ ] Wishlist page with product details
  - [ ] Move items from wishlist to cart
- [ ] **Shopping Cart**
  - [ ] Add products to cart
  - [ ] Update quantities
  - [ ] Remove items
  - [ ] Persistent cart storage

### Sprint 4: Order Processing (Week 7-8) ❌
- [ ] **Checkout Process**
  - [ ] Multi-step checkout form
  - [ ] Address selection/entry
  - [ ] Order summary and confirmation
- [ ] **Payment Integration**
  - [ ] Cash on Delivery option
  - [ ] Payment method selection
  - [ ] Order confirmation emails
- [ ] **Order Management**
  - [ ] Order status tracking
  - [ ] Admin order management interface
  - [ ] Customer order history

### Sprint 5: Advanced Features (Week 9-10) ❌
- [ ] **Search & Discovery**
  - [ ] Advanced product search
  - [ ] Filter by price, category, care level
  - [ ] Sort by popularity, price, rating
- [ ] **Admin Analytics**
  - [ ] Sales dashboard
  - [ ] Inventory reports
  - [ ] Customer analytics
- [ ] **Notifications**
  - [ ] Email notifications
  - [ ] In-app notification system
  - [ ] Low stock alerts

---

## Conclusion

This comprehensive guideline provides the roadmap for completing the Botanica Hub project. The system is well-architected with a solid foundation in place. The next critical steps are implementing the three priority features:

1. **Inventory & Product Management**: Complete admin CRUD operations
2. **User Profile + Wishlist Management**: Enhanced customer experience
3. **Order + Cart and Delivery Management**: Full e-commerce functionality

Focus on completing these features systematically, following the established design patterns and maintaining code quality standards. The current codebase provides excellent scaffolding for rapid feature development.

**Next Immediate Actions:**
1. Implement admin product management interface
2. Complete shopping cart functionality
3. Set up payment processing system
4. Create order tracking system
5. Deploy to production environment

The project is positioned for success with its modern tech stack, clean architecture, and nature-inspired design system. Continue following these guidelines to deliver a comprehensive plant store management solution.
