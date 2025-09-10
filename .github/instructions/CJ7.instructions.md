```instructions
---
applyTo: '**'
---

# Leafy Mart 🌿 - Smart Plant Store Management System
## AI Development Guidelines & Context

### Project Overview
**System Name:** Leafy Mart (SPSMS - Smart Plant Store Management System)
**Vision:** Modernize plant store operations through digital transformation
**Tech Stack:** MERN (MongoDB, Express.js, React 19.1.1, Node.js)
**Target Market:** Sri Lankan plant stores and customers

### Current Implementation Status
This is a **partially implemented** e-commerce plant store with:
- ✅ Authentication system (Customer & Admin with JWT)
- ✅ Basic UI framework with nature-themed design
- ✅ Database models and API controllers
- ✅ Responsive navigation and routing
- 🔄 Partially implemented: User profiles, wishlist, order tracking
- ❌ Pending: Full inventory management, shopping cart, payment processing

### Priority Features to Implement
1. **Inventory & Product Management**: Admin CRUD operations for plant products
2. **User Profile + Wishlist Management**: Complete customer experience
3. **Order + Cart and Delivery Management**: Full e-commerce functionality

### Development Commands
```bash
# Frontend Development
cd client
npm start

# Backend Development  
cd server
npx nodemon server.js

# Create Admin User
cd server
node createAdmin.js
```

### VS Code Configuration
The project includes pre-configured VS Code settings for optimal development experience:

#### Automatic Terminal Setup
- **Tasks configured** to automatically start frontend and backend in separate terminals
- **Keyboard shortcuts** for quick access to development commands
- **Integrated debugging** support for both React and Node.js

#### Available Tasks (Ctrl+Shift+P → "Tasks: Run Task"):
- `Start Backend Server`: Runs `cd server; npx nodemon server.js`
- `Start Frontend Client`: Runs `cd client; npm start`
- `Start Full Application`: Runs both backend and frontend simultaneously

#### Keyboard Shortcuts:
- **Ctrl+Shift+F5**: Start full application (both frontend and backend)
- **Ctrl+Shift+B**: Start backend server only
- **Ctrl+Shift+R**: Start frontend client only

#### Auto-Start on Folder Open:
The tasks are configured to automatically start when you open the workspace folder in VS Code, ensuring immediate development readiness.

#### Configuration Files:
- `.vscode/tasks.json`: Task definitions for terminal automation
- `.vscode/launch.json`: Debug configurations
- `.vscode/settings.json`: Workspace-specific settings
- `.vscode/keybindings.json`: Custom keyboard shortcuts

### Design System Guidelines
- **Colors**: Nature-inspired greens (#2e7d32, #388e3c, #43a047, #f1faee)
- **Typography**: Segoe UI, clean and accessible
- **Components**: Organic shapes, plant-themed icons (Lucide React)
- **Responsive**: Mobile-first with 768px, 1024px breakpoints

### Code Standards
- **React**: Functional components with hooks, Context API for state
- **API**: RESTful endpoints with consistent JSON responses
- **Database**: MongoDB with Mongoose ODM, proper validation
- **Security**: JWT authentication, input validation, CORS protection
- **Testing**: Jest + React Testing Library

### Key Business Rules
- Plant categories: Indoor Plants, Outdoor Plants, Herbs, Air Purifiers, Palms, Flowering
- Payment methods: Cash on Delivery (primary for Sri Lanka), Card payments
- Order states: Pending → Confirmed → Preparing → Shipped → Delivered
- Stock management with low-stock alerts (threshold: 5 units)

### File Structure Context
```
client/src/
├── components/    # Reusable UI (Navbar, Footer, ProtectedRoute)
├── pages/        # Route components (Home, Products, Admin)
├── contexts/     # AuthContext for user state
├── services/     # API communication layer
└── data/         # Static product catalog

server/
├── controllers/  # Business logic (auth, product, order)
├── models/       # MongoDB schemas (User, Product, Order)
├── routes/       # Express endpoints
├── middleware/   # Authentication & error handling
└── config/       # Database connection
```

### AI Assistant Guidelines
1. **Stay Focused**: Only suggest code related to plant store e-commerce functionality
2. **Follow Patterns**: Use existing component and API patterns in the codebase
3. **Plant Context**: Remember this is for botanical/plant products, not generic e-commerce
4. **Sri Lankan Market**: Consider local payment methods, shipping, and preferences
5. **Security First**: Always implement proper authentication and input validation
6. **Mobile Responsive**: Ensure all components work on mobile devices
7. **Nature Theme**: Maintain the green, organic design aesthetic

### Common Tasks
- Adding new plant products with care instructions
- Implementing shopping cart with plant-specific features
- Creating admin interfaces for inventory management
- Building customer wishlist and order tracking
- Setting up payment processing (COD priority)
- Developing plant care preference systems

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.
```