# Report Generation Feature 📊

## Overview
Beautiful PDF report generation functionality for all admin dashboard sections (User Management, Product Management, and Order Management).

## Features

### 🎨 Beautiful Reports
- **Professional Layout**: Clean, branded design with Leafy Mart branding
- **Color-Coded Data**: Visual indicators for status, stock levels, and more
- **Statistics Summary**: Key metrics displayed at the top of each report
- **Branded Headers/Footers**: Company information and page numbers
- **Auto-formatted Tables**: Clean, striped tables with proper alignment

### 📋 Report Types

#### 1. User Management Report
**Contents:**
- User statistics (Total Users, Customers, Gold Members, Active Users)
- Complete user list with:
  - Name, Email, Role
  - Membership Level
  - Points
  - Status (Active/Deleted)

**File Name:** `User_Report_YYYY-MM-DD.pdf`

#### 2. Product Inventory Report
**Contents:**
- Product statistics (Total Products, Total Stock, Low Stock Items, Categories)
- Total inventory value
- Complete product list with:
  - Product Name, Category
  - Price, Stock Quantity
  - Total Value
  - Stock Status (Low/Medium/Good)

**Color Coding:**
- 🔴 Low Stock (< 10 items) - Red
- 🟠 Medium Stock (10-49 items) - Orange
- 🟢 Good Stock (50+ items) - Green

**File Name:** `Product_Report_YYYY-MM-DD.pdf`

#### 3. Order Management Report
**Contents:**
- Order statistics (Total Orders, Total Revenue, Pending, Delivered)
- Average order value
- Complete order list with:
  - Order ID, Customer Name
  - Date, Item Count
  - Total Amount
  - Payment Status
  - Order Status

**Color Coding:**
- 🟢 Delivered - Green
- 🔴 Cancelled - Red
- 🟠 Pending - Orange
- ✅ Paid - Green
- ❌ Failed - Red

**File Name:** `Order_Report_YYYY-MM-DD.pdf`

## Usage

### For Administrators

1. **Navigate to Admin Dashboard**
   - Go to `/admin-dashboard`
   - Select the section (Users, Products, or Orders)

2. **Generate Report**
   - Click the "Generate Report" button (with download icon)
   - The PDF will automatically download

3. **Report Contents**
   - All reports include current filtered data
   - Reports include company branding
   - Date and time of generation

### Technical Implementation

#### Dependencies
```json
{
  "jspdf": "^2.5.2",
  "jspdf-autotable": "^3.8.4"
}
```

#### File Structure
```
client/src/
├── utils/
│   └── reportGenerator.js       # Main report generation utility
├── components/
│   ├── UserManagement.js        # User report integration
│   ├── ProductManagement.js     # Product report integration
│   └── OrderManagement.js       # Order report integration
```

#### API Integration
- User reports fetch all users (limit: 1000)
- Product reports use filtered product list
- Order reports fetch all orders (limit: 1000)

## Customization

### Branding
Edit `BRAND_INFO` in `reportGenerator.js`:
```javascript
const BRAND_INFO = {
  name: 'Leafy Mart',
  tagline: 'Smart Plant Store Management',
  address: '123 Green Street, Colombo, Sri Lanka',
  phone: '+94 11 234 5678',
  email: 'info@leafymart.lk',
  website: 'www.leafymart.lk'
};
```

### Colors
Edit `COLORS` in `reportGenerator.js`:
```javascript
const COLORS = {
  primary: '#2e7d32',
  secondary: '#66bb6a',
  accent: '#4caf50',
  // ... more colors
};
```

### Report Layout
Modify individual report functions:
- `generateUserReport()`
- `generateProductReport()`
- `generateOrderReport()`

## Examples

### User Report Features
- Pagination-free (all users)
- Membership level display
- Points tracking
- Active/Deleted status

### Product Report Features
- Stock level warnings
- Category grouping
- Price and value calculations
- Low stock alerts

### Order Report Features
- Revenue tracking
- Status progression
- Payment verification
- Customer information

## Best Practices

1. **Report Generation**
   - Always fetch latest data before generating
   - Use success/error notifications
   - Handle large datasets appropriately

2. **Performance**
   - Reports are generated client-side
   - Large datasets may take a few seconds
   - Progress indicators recommended for 1000+ records

3. **Data Privacy**
   - Only admins can generate reports
   - Reports contain sensitive information
   - Store securely if needed

## Troubleshooting

### Report Not Downloading
- Check browser download settings
- Verify popup blocker settings
- Ensure jsPDF libraries are installed

### Missing Data
- Verify API endpoints are working
- Check authentication token
- Confirm data exists in database

### Styling Issues
- Clear browser cache
- Check CSS classes
- Verify jsPDF-autotable version

## Future Enhancements

- [ ] Date range filtering for reports
- [ ] Chart/graph visualizations
- [ ] Excel export option
- [ ] Email report delivery
- [ ] Scheduled automatic reports
- [ ] Custom report templates
- [ ] Multi-language support

## Support
For issues or questions, contact the development team or check the project documentation.
