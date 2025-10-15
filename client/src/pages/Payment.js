import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { createOrder, getProductById } from '../services/api';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user, token } = useAuth();
  // Read order summary from location.state or sessionStorage fallback
  let summary = location.state || null;
  if (!summary) {
    try {
      const s = sessionStorage.getItem('leafyMartPendingOrder');
      if (s) summary = JSON.parse(s);
    } catch (err) {
      console.warn('Could not read pending order from sessionStorage', err);
    }
  }
  summary = summary || { items: [], subtotal: 0, shipping: 0, tax: 0, total: 0 };

  // Normalize fields for backward compatibility (cart may store shipping or shippingCost)
  summary.shipping = summary.shipping !== undefined ? summary.shipping : (summary.shippingCost || 0);
  summary.shippingCost = summary.shippingCost !== undefined ? summary.shippingCost : (summary.shipping || 0);
  summary.discount = summary.discount || 0;
  summary.discountPercentage = summary.discountPercentage || 0;

  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState(null);

  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [method, setMethod] = useState('card');

  // ✨ SIMPLIFIED CARD VALIDATION ✨
  
  // Simple card brand detection - just for display
  const getCardBrand = (cardNum) => {
    const cleanNum = cardNum.replace(/\s/g, ''); // Remove spaces
    
    if (cleanNum.startsWith('4')) return 'Visa';
    if (cleanNum.startsWith('5')) return 'Mastercard'; 
    if (cleanNum.startsWith('3')) return 'Amex';
    if (cleanNum.startsWith('6')) return 'Discover';
    return 'Card'; // Default
  };

  // Simple validation - easy to understand!
  const validate = () => {
    // Check if name is entered
    if (!cardName.trim()) {
      return 'Please enter your name';
    }
    
    // Check card number (remove spaces, check if 13-19 digits)
    const cleanCardNum = cardNumber.replace(/\s/g, '');
    if (cleanCardNum.length < 13 || cleanCardNum.length > 19) {
      return 'Card number must be 13-19 digits long';
    }
    if (!/^\d+$/.test(cleanCardNum)) {
      return 'Card number can only contain numbers';
    }
    
    // Check expiry (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return 'Expiry must be MM/YY format (example: 12/25)';
    }
    
    // Check CVV (3 or 4 digits)
    if (!/^\d{3,4}$/.test(cvv)) {
      return 'CVV must be 3 or 4 digits';
    }
    
    return null; // All good!
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ type: 'error', message: err });
      return;
    }

    setProcessing(true);
    setStatus(null);
    try {
      // show processing state
      await new Promise(resolve => setTimeout(resolve, 1400));

      // Convert local product IDs to database product ObjectIds
      const orderItems = [];
      for (const item of summary.items) {
        try {
          // Get the database product by its string ID
          const product = await getProductById(item.id);
            if (product && product._id) {
            orderItems.push({
              productId: product._id, // Use MongoDB ObjectId
              quantity: item.quantity,
              price: item.price
            });
          } else {
            throw new Error(`Product not found in database: ${item.id}`);
          }
        } catch (error) {
          throw new Error(`Failed to find product ${item.id}: ${error.message}`);
        }
      }

      // Create order data
      const orderData = {
        items: orderItems,
        subtotal: summary.subtotal,
        tax: summary.tax,
        shippingCost: summary.shippingCost,
        discount: summary.discount,
        discountPercentage: summary.discountPercentage,
        total: summary.total,
        paymentMethod: method === 'card' ? 'Card' : 'Digital Wallet',
        paymentStatus: 'Paid',
        shippingAddress: {
          street: user?.address?.street || '123 Main Street',
          city: user?.address?.city || 'Colombo',
          state: user?.address?.state || 'Western',
          zipCode: user?.address?.zipCode || '00100',
          country: 'Sri Lanka'
        },
        notes: 'Order placed via online payment'
      };

      // Create order in backend
      const orderResponse = await createOrder(orderData, token);
      
      if (orderResponse.error) {
        throw new Error(orderResponse.error);
      }

      // success flow: clear cart, show confirmation then navigate
      clearCart();
      setStatus({ type: 'success', message: 'Payment successful. Order created. Redirecting to order tracking...' });
      
      // Store order ID for tracking
      sessionStorage.setItem('leafyMartLastOrder', JSON.stringify({
        orderId: orderResponse._id,
        orderNumber: orderResponse.orderNumber
      }));
      
      setTimeout(() => navigate('/order-tracking', { 
        state: { 
          message: 'Payment successful', 
          orderId: orderResponse._id,
          orderNumber: orderResponse.orderNumber 
        } 
      }), 1500);
    } catch (err) {
      console.error('Payment/Order creation error:', err);
      setStatus({ type: 'error', message: `Payment failed: ${err.message || 'Please try again.'}` });
    } finally {
      setProcessing(false);
    }
  };

  // Simple card number formatting - adds spaces every 4 digits
  const formatCard = (cardNum) => {
    const cleanNum = cardNum.replace(/\D/g, ''); // Remove non-digits
    return cleanNum.replace(/(.{4})/g, '$1 ').trim(); // Add space every 4 characters
  };

  const cardBrand = getCardBrand(cardNumber);

  return (
    <div style={{ background: '#f1faee', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: 980, margin: '2rem auto', padding: '1rem' }}>
        <h1 style={{ color: '#2e7d32', marginBottom: 6 }}>Payment</h1>
        <p style={{ color: '#666', marginTop: 0 }}>Securely complete your purchase. We use a simulated gateway for development — no real payment is processed.</p>

        <div style={{ display: 'flex', gap: 20, marginTop: '1.5rem', flexWrap: 'wrap' }}>
          {/* Order Summary */}
          <aside style={{ flex: '0 1 320px', background: '#fff', padding: '20px', borderRadius: 12, boxShadow: '0 6px 24px rgba(46,125,50,0.06)' }}>
            <h3 style={{ marginTop: 0, color: '#2e7d32' }}>Order Summary</h3>
            <div style={{ marginTop: 8 }}>
              {summary.items.length === 0 ? (
                <p style={{ color: '#666' }}>No items in order.</p>
              ) : (
                summary.items.map(it => (
                  <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{it.name}</div>
                      <div style={{ color: '#666', fontSize: 12 }}>{it.quantity} × {it.priceDisplay}</div>
                    </div>
                    <div style={{ fontWeight: 700 }}>LKR {(it.price * it.quantity).toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>

            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 12, marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#666' }}>Subtotal</span>
                <strong>LKR {summary.subtotal.toLocaleString()}</strong>
              </div>

              {summary.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#666' }}>Discount ({summary.discountPercentage || 0}%):</span>
                  <strong style={{ color: '#28a745' }}>- LKR {summary.discount.toLocaleString()}</strong>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#666' }}>Shipping</span>
                <strong style={{ color: summary.shippingCost === 0 ? '#28a745' : '#333' }}>{summary.shippingCost === 0 ? 'FREE' : `LKR ${summary.shippingCost.toLocaleString()}`}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#666' }}>Tax</span>
                <strong>LKR {summary.tax.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '1.05rem' }}>
                <span style={{ fontWeight: 800 }}>Total</span>
                <span style={{ fontWeight: 800, color: '#2e7d32' }}>LKR {summary.total.toLocaleString()}</span>
              </div>
            </div>
          </aside>

          {/* Payment Form */}
          <section style={{ flex: '1 1 520px', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 6px 24px rgba(46,125,50,0.06)' }}>
            <h3 style={{ marginTop: 0, color: '#2e7d32' }}>Payment Method</h3>
            <form onSubmit={handlePayNow}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} />
                  <span>Credit / Debit Card</span>
                </label>
                <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="radio" name="method" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} />
                  <span>UPI / Mobile Pay</span>
                </label>
              </div>

              {method === 'card' ? (
                <>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>Name on card</label>
                    <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Full name" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>
                      Card number (13-19 digits)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        value={formatCard(cardNumber)} 
                        onChange={e => setCardNumber(e.target.value)} 
                        placeholder="1234 5678 9012 3456" 
                        maxLength={23} 
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} 
                      />
                      <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#666' }}>{cardBrand}</div>
                    </div>
                    <small style={{ color: '#666', fontSize: 11 }}>
                      💡 We automatically detect Visa, Mastercard, Amex, and Discover
                    </small>
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>
                        Expiry Date
                      </label>
                      <input 
                        value={expiry} 
                        onChange={e => setExpiry(e.target.value)} 
                        placeholder="MM/YY (e.g., 12/25)" 
                        maxLength={5} 
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} 
                      />
                      <small style={{ color: '#666', fontSize: 11 }}>Format: MM/YY</small>
                    </div>
                    <div style={{ width: 120 }}>
                      <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>
                        CVV Code
                      </label>
                      <input 
                        value={cvv} 
                        onChange={e => setCvv(e.target.value)} 
                        placeholder="123" 
                        maxLength={4} 
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} 
                      />
                      <small style={{ color: '#666', fontSize: 11 }}>3-4 digits</small>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 13, color: '#444', marginBottom: 6 }}>UPI ID / Mobile</label>
                  <input placeholder="username@bank or mobile" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e6e6' }} />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 8 }}>
                <button type="submit" disabled={processing} style={{ flex: 1, padding: '12px 16px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, cursor: processing ? 'not-allowed' : 'pointer' }}>
                  {processing ? 'Processing payment…' : `Pay LKR ${summary.total.toLocaleString()}`}
                </button>
                <button type="button" onClick={() => navigate('/cart')} disabled={processing} style={{ padding: '12px 16px', background: '#fff', color: '#333', border: '1px solid #e6e6e6', borderRadius: 8 }}>Back to Cart</button>
              </div>

              {status && (
                <div style={{ marginTop: 12, padding: 10, borderRadius: 8, background: status.type === 'success' ? '#e8f5e9' : '#ffebee', color: status.type === 'success' ? '#2e7d32' : '#c62828' }}>
                  {status.message}
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
