import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Company/Brand Information
const BRAND_INFO = {
  name: 'Leafy Mart',
  tagline: 'Smart Plant Store Management',
  address: '123 Green Street, Colombo, Sri Lanka',
  phone: '+94 11 234 5678',
  email: 'info@leafymart.lk',
  website: 'www.leafymart.lk'
};

// Colors
const COLORS = {
  primary: '#2e7d32',
  secondary: '#66bb6a',
  accent: '#4caf50',
  dark: '#1b5e20',
  light: '#f1f8e9',
  text: '#333333',
  lightText: '#666666',
  border: '#e0e0e0'
};

/**
 * Add header to PDF document
 */
const addHeader = (doc, title) => {
  const pageWidth = doc.internal.pageSize.width;
  
  // Header background
  doc.setFillColor(COLORS.primary);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(BRAND_INFO.name, 20, 20);
  
  // Tagline
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(BRAND_INFO.tagline, 20, 28);
  
  // Report title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 20, 38);
  
  // Date on the right
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const dateStr = `Generated: ${new Date().toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`;
  doc.text(dateStr, pageWidth - 20, 38, { align: 'right' });
  
  return 50; // Return Y position for content start
};

/**
 * Add footer to PDF document
 */
const addFooter = (doc) => {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  doc.setFillColor(COLORS.light);
  doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');
  
  doc.setTextColor(COLORS.text);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  
  // Company info
  const footerText = `${BRAND_INFO.name} | ${BRAND_INFO.phone} | ${BRAND_INFO.email} | ${BRAND_INFO.website}`;
  doc.text(footerText, pageWidth / 2, pageHeight - 15, { align: 'center' });
  
  // Page number
  const pageNum = `Page ${doc.internal.getCurrentPageInfo().pageNumber}`;
  doc.text(pageNum, pageWidth - 20, pageHeight - 15, { align: 'right' });
};

/**
 * Add statistics cards to PDF
 */
const addStatistics = (doc, stats, startY) => {
  const pageWidth = doc.internal.pageSize.width;
  const cardWidth = (pageWidth - 60) / 4;
  let xPos = 20;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.text);
  doc.text('Summary Statistics', 20, startY);
  
  startY += 10;
  
  stats.forEach((stat, index) => {
    // Card background
    doc.setFillColor(COLORS.light);
    doc.roundedRect(xPos, startY, cardWidth, 25, 3, 3, 'F');
    
    // Card border
    doc.setDrawColor(COLORS.primary);
    doc.setLineWidth(0.5);
    doc.roundedRect(xPos, startY, cardWidth, 25, 3, 3, 'S');
    
    // Stat value
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text(String(stat.value), xPos + cardWidth / 2, startY + 12, { align: 'center' });
    
    // Stat label
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.lightText);
    doc.text(stat.label, xPos + cardWidth / 2, startY + 20, { align: 'center' });
    
    xPos += cardWidth + 5;
  });
  
  return startY + 35;
};

/**
 * Generate User Management Report
 */
export const generateUserReport = (users, stats) => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'User Management Report');
  
  // Add statistics
  const userStats = [
    { label: 'Total Users', value: stats?.totalUsers || users.length },
    { label: 'Customers', value: stats?.customerCount || users.filter(u => u.role === 'customer').length },
    { label: 'Gold Members', value: stats?.goldMembers || users.filter(u => u.membershipLevel === 'Gold').length },
    { label: 'Active Users', value: stats?.activeUsers || users.filter(u => !u.isDeleted).length }
  ];
  
  yPos = addStatistics(doc, userStats, yPos);
  
  // User table
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.text);
  doc.text('User Details', 20, yPos);
  yPos += 5;
  
  const tableData = users.map((user, index) => [
    index + 1,
    user.name || 'N/A',
    user.email || 'N/A',
    user.role || 'N/A',
    user.membershipLevel || 'Bronze',
    user.points || 0,
    user.isDeleted ? 'Deleted' : 'Active'
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Name', 'Email', 'Role', 'Membership', 'Points', 'Status']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: COLORS.primary,
      textColor: '#ffffff',
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.text
    },
    alternateRowStyles: {
      fillColor: COLORS.light
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { cellWidth: 35 },
      2: { cellWidth: 50 },
      3: { halign: 'center', cellWidth: 20 },
      4: { halign: 'center', cellWidth: 25 },
      5: { halign: 'center', cellWidth: 20 },
      6: { halign: 'center', cellWidth: 20 }
    },
    margin: { top: 10, left: 20, right: 20 },
    didDrawPage: (data) => {
      addFooter(doc);
    }
  });
  
  // Save the PDF
  doc.save(`User_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};

/**
 * Generate Product Management Report
 */
export const generateProductReport = (products, options = {}) => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'Product Inventory Report');
  
  // Calculate statistics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalValue = products.reduce((sum, p) => sum + (p.priceLKR * (p.stock || 0)), 0);
  const lowStock = products.filter(p => (p.stock || 0) < 10).length;
  const categories = [...new Set(products.map(p => p.category))].length;
  
  // Add statistics
  const productStats = [
    { label: 'Total Products', value: totalProducts },
    { label: 'Total Stock', value: totalStock },
    { label: 'Low Stock Items', value: lowStock },
    { label: 'Categories', value: categories }
  ];
  
  yPos = addStatistics(doc, productStats, yPos);
  
  // Add total value
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary);
  doc.text(`Total Inventory Value: LKR ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPos);
  yPos += 10;
  
  // Product table
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.text);
  doc.text('Product Details', 20, yPos);
  yPos += 5;
  
  const tableData = products.map((product, index) => [
    index + 1,
    product.name || 'N/A',
    product.category || 'N/A',
    `LKR ${product.priceLKR?.toFixed(2) || '0.00'}`,
    product.stock || 0,
    `LKR ${((product.priceLKR || 0) * (product.stock || 0)).toFixed(2)}`,
    (product.stock || 0) < 10 ? 'Low' : (product.stock || 0) < 50 ? 'Medium' : 'Good'
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Product Name', 'Category', 'Price', 'Stock', 'Value', 'Stock Status']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: COLORS.primary,
      textColor: '#ffffff',
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      textColor: COLORS.text
    },
    alternateRowStyles: {
      fillColor: COLORS.light
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { cellWidth: 50 },
      2: { halign: 'center', cellWidth: 30 },
      3: { halign: 'right', cellWidth: 25 },
      4: { halign: 'center', cellWidth: 20 },
      5: { halign: 'right', cellWidth: 30 },
      6: { halign: 'center', cellWidth: 25 }
    },
    margin: { top: 10, left: 20, right: 20 },
    didDrawPage: (data) => {
      addFooter(doc);
    },
    didParseCell: (data) => {
      // Color code stock status
      if (data.column.index === 6 && data.section === 'body') {
        if (data.cell.raw === 'Low') {
          data.cell.styles.textColor = '#d32f2f';
          data.cell.styles.fontStyle = 'bold';
        } else if (data.cell.raw === 'Medium') {
          data.cell.styles.textColor = '#f57c00';
        } else {
          data.cell.styles.textColor = '#388e3c';
        }
      }
    }
  });
  
  // Save the PDF
  doc.save(`Product_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};

/**
 * Generate Order Management Report
 */
export const generateOrderReport = (orders, stats) => {
  const doc = new jsPDF();
  let yPos = addHeader(doc, 'Order Management Report');
  
  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Add statistics
  const orderStats = [
    { label: 'Total Orders', value: stats?.totalOrders || totalOrders },
    { label: 'Total Revenue', value: `LKR ${(stats?.totalRevenue || totalRevenue).toLocaleString()}` },
    { label: 'Pending', value: stats?.pendingOrders || pendingOrders },
    { label: 'Delivered', value: stats?.deliveredOrders || deliveredOrders }
  ];
  
  yPos = addStatistics(doc, orderStats, yPos);
  
  // Add average order value
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.primary);
  doc.text(`Average Order Value: LKR ${averageOrderValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 20, yPos);
  yPos += 10;
  
  // Order table
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLORS.text);
  doc.text('Order Details', 20, yPos);
  yPos += 5;
  
  const tableData = orders.map((order, index) => [
    index + 1,
    order.orderId || order._id?.substring(0, 8) || 'N/A',
    order.customerName || order.shippingAddress?.name || 'N/A',
    new Date(order.createdAt).toLocaleDateString(),
    order.items?.length || 0,
    `LKR ${(order.total || 0).toFixed(2)}`,
    order.paymentStatus || 'N/A',
    order.status || 'N/A'
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Order ID', 'Customer', 'Date', 'Items', 'Total', 'Payment', 'Status']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: COLORS.primary,
      textColor: '#ffffff',
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 8,
      textColor: COLORS.text
    },
    alternateRowStyles: {
      fillColor: COLORS.light
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { cellWidth: 20 },
      2: { cellWidth: 35 },
      3: { halign: 'center', cellWidth: 25 },
      4: { halign: 'center', cellWidth: 15 },
      5: { halign: 'right', cellWidth: 25 },
      6: { halign: 'center', cellWidth: 20 },
      7: { halign: 'center', cellWidth: 25 }
    },
    margin: { top: 10, left: 20, right: 20 },
    didDrawPage: (data) => {
      addFooter(doc);
    },
    didParseCell: (data) => {
      // Color code order status
      if (data.column.index === 7 && data.section === 'body') {
        const status = data.cell.raw;
        if (status === 'Delivered') {
          data.cell.styles.textColor = '#388e3c';
          data.cell.styles.fontStyle = 'bold';
        } else if (status === 'Cancelled') {
          data.cell.styles.textColor = '#d32f2f';
          data.cell.styles.fontStyle = 'bold';
        } else if (status === 'Pending') {
          data.cell.styles.textColor = '#f57c00';
        }
      }
      // Color code payment status
      if (data.column.index === 6 && data.section === 'body') {
        const paymentStatus = data.cell.raw;
        if (paymentStatus === 'Paid') {
          data.cell.styles.textColor = '#388e3c';
        } else if (paymentStatus === 'Failed') {
          data.cell.styles.textColor = '#d32f2f';
        }
      }
    }
  });
  
  // Save the PDF
  doc.save(`Order_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};
