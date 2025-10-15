/**
 * Test/Demo Script for Report Generation
 * This file demonstrates how to use the report generation functions
 */

import { generateUserReport, generateProductReport, generateOrderReport } from './client/src/utils/reportGenerator';

// Sample User Data
const sampleUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    membershipLevel: 'Gold',
    points: 1500,
    isDeleted: false
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'customer',
    membershipLevel: 'Silver',
    points: 800,
    isDeleted: false
  },
  {
    _id: '3',
    name: 'Admin User',
    email: 'admin@leafymart.lk',
    role: 'admin',
    membershipLevel: 'Platinum',
    points: 0,
    isDeleted: false
  }
];

const sampleUserStats = {
  totalUsers: 3,
  customerCount: 2,
  goldMembers: 1,
  activeUsers: 3
};

// Sample Product Data
const sampleProducts = [
  {
    _id: '1',
    name: 'Monstera Deliciosa',
    category: 'Indoor Plants',
    priceLKR: 2500,
    stock: 15,
    tags: ['Indoor', 'Low Light']
  },
  {
    _id: '2',
    name: 'Snake Plant',
    category: 'Indoor Plants',
    priceLKR: 1500,
    stock: 8,
    tags: ['Indoor', 'Air Purifying']
  },
  {
    _id: '3',
    name: 'Peace Lily',
    category: 'Indoor Plants',
    priceLKR: 1800,
    stock: 50,
    tags: ['Indoor', 'Flowering']
  }
];

// Sample Order Data
const sampleOrders = [
  {
    _id: '1',
    orderId: 'ORD001',
    customerName: 'John Doe',
    shippingAddress: { name: 'John Doe' },
    createdAt: new Date('2025-10-10'),
    items: [
      { productName: 'Monstera Deliciosa', quantity: 2 }
    ],
    total: 5000,
    paymentStatus: 'Paid',
    status: 'Delivered'
  },
  {
    _id: '2',
    orderId: 'ORD002',
    customerName: 'Jane Smith',
    shippingAddress: { name: 'Jane Smith' },
    createdAt: new Date('2025-10-15'),
    items: [
      { productName: 'Snake Plant', quantity: 1 },
      { productName: 'Peace Lily', quantity: 1 }
    ],
    total: 3300,
    paymentStatus: 'Paid',
    status: 'Pending'
  }
];

const sampleOrderStats = {
  totalOrders: 2,
  totalRevenue: 8300,
  pendingOrders: 1,
  deliveredOrders: 1
};

// Demo Functions
export const demoUserReport = () => {
  console.log('Generating User Report...');
  generateUserReport(sampleUsers, sampleUserStats);
  console.log('User Report Generated Successfully!');
};

export const demoProductReport = () => {
  console.log('Generating Product Report...');
  generateProductReport(sampleProducts);
  console.log('Product Report Generated Successfully!');
};

export const demoOrderReport = () => {
  console.log('Generating Order Report...');
  generateOrderReport(sampleOrders, sampleOrderStats);
  console.log('Order Report Generated Successfully!');
};

// Run all demos
export const runAllDemos = () => {
  console.log('=== Running All Report Demos ===\n');
  
  setTimeout(() => {
    demoUserReport();
  }, 500);
  
  setTimeout(() => {
    demoProductReport();
  }, 1500);
  
  setTimeout(() => {
    demoOrderReport();
  }, 2500);
  
  setTimeout(() => {
    console.log('\n=== All Reports Generated ===');
    console.log('Check your Downloads folder for:');
    console.log('- User_Report_*.pdf');
    console.log('- Product_Report_*.pdf');
    console.log('- Order_Report_*.pdf');
  }, 3500);
};

// Usage instructions
console.log(`
╔════════════════════════════════════════════════════════════════╗
║           LEAFY MART - REPORT GENERATION DEMO                  ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  To test report generation in browser console:                 ║
║                                                                ║
║  1. Open the application in browser                            ║
║  2. Login as admin                                             ║
║  3. Navigate to Admin Dashboard                                ║
║  4. Click "Generate Report" button in any section              ║
║                                                                ║
║  Available Sections:                                           ║
║  - User Management                                             ║
║  - Product Management                                          ║
║  - Order Management                                            ║
║                                                                ║
║  Reports will automatically download as PDF files              ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
`);
