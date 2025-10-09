// Test script to check cancel order functionality
const API_BASE = 'http://localhost:5000/api';

// Test function to check if cancel order endpoint is working
async function testCancelOrder() {
  try {
    console.log('Testing cancel order endpoint...');
    
    // First, try to get orders to see if any exist
    const ordersResponse = await fetch(`${API_BASE}/orders/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN_HERE' // Replace with actual token
      }
    });
    
    console.log('Orders response status:', ordersResponse.status);
    const orders = await ordersResponse.json();
    console.log('Orders:', orders);
    
    if (orders && orders.length > 0) {
      const pendingOrder = orders.find(order => order.status === 'Pending');
      if (pendingOrder) {
        console.log('Found pending order:', pendingOrder._id);
        
        // Try to cancel the order
        const cancelResponse = await fetch(`${API_BASE}/orders/${pendingOrder._id}/cancel`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_TOKEN_HERE' // Replace with actual token
          }
        });
        
        console.log('Cancel response status:', cancelResponse.status);
        const cancelResult = await cancelResponse.json();
        console.log('Cancel result:', cancelResult);
      } else {
        console.log('No pending orders found to cancel');
      }
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

// Run the test
// testCancelOrder();

console.log('Test script loaded. Replace YOUR_TOKEN_HERE with actual token and uncomment testCancelOrder() to run.');