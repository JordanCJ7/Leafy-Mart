
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Minus, Plus, X, ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import { confirm } from '../utils/swal';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    (async () => {
      const ok = await confirm('Remove item', 'Are you sure you want to remove this item from your cart?');
      if (ok) removeFromCart(productId);
    })();
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { returnTo: '/cart' } });
      return;
    }
    // Build order summary and navigate to the payment simulator
    const orderSummary = {
      items: cartItems,
      subtotal,
      shipping,
      tax,
      total
    };

    // Store a session fallback so /payment can be opened directly
    try {
      sessionStorage.setItem('leafyMartPendingOrder', JSON.stringify(orderSummary));
    } catch (err) {
      console.warn('Could not write sessionStorage pending order:', err);
    }

    navigate('/payment', { state: orderSummary });
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 500; // Free shipping over LKR 5000
  const tax = Math.round(subtotal * 0.02); // 2% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div style={{ 
        background: '#f1faee', 
        minHeight: '100vh', 
        fontFamily: 'Segoe UI, Arial, sans-serif', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            background: '#fff',
            padding: '3rem',
            borderRadius: '1rem',
            boxShadow: '0 2px 16px rgba(56, 142, 60, 0.15)',
            textAlign: 'center',
            maxWidth: '400px'
          }}>
            <ShoppingBag size={64} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Your Cart is Empty</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Looks like you haven't added any plants to your cart yet.
            </p>
            <Link 
              to="/products" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#388e3c',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'background-color 0.2s'
              }}
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#f1faee', 
      minHeight: '100vh', 
      fontFamily: 'Segoe UI, Arial, sans-serif', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Navbar />
      <div style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#388e3c', marginBottom: '0.5rem' }}>Shopping Cart</h1>
          <p style={{ color: '#666' }}>{cartItems.length} items in your cart</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          {/* Cart Items */}
          <div style={{ background: '#fff', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 16px rgba(56, 142, 60, 0.15)' }}>
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid #f0f0f0',
                  gap: '1rem'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#333', marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    {item.category}
                  </p>
                  <p style={{ color: '#388e3c', fontWeight: '600' }}>
                    {item.priceDisplay}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    style={{
                      border: '1px solid #ddd',
                      background: '#f8f9fa',
                      borderRadius: '4px',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Minus size={16} />
                  </button>
                  
                  <span style={{ 
                    minWidth: '40px', 
                    textAlign: 'center', 
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    style={{
                      border: '1px solid #ddd',
                      background: '#f8f9fa',
                      borderRadius: '4px',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <p style={{ color: '#388e3c', fontWeight: '600', fontSize: '1.1rem' }}>
                    LKR {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#dc3545',
                    cursor: 'pointer',
                    padding: '0.5rem'
                  }}
                  title="Remove item"
                >
                  <X size={20} />
                </button>
              </div>
            ))}

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '2px solid #f0f0f0'
            }}>
              <Link 
                to="/products"
                style={{
                  color: '#388e3c',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
              
              <button
                onClick={async () => {
                  const ok = await confirm('Clear cart', 'Are you sure you want to clear your cart?');
                  if (ok) clearCart();
                }}
                style={{
                  border: '1px solid #dc3545',
                  background: 'transparent',
                  color: '#dc3545',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ 
            background: '#fff', 
            borderRadius: '1rem', 
            padding: '1.5rem', 
            boxShadow: '0 2px 16px rgba(56, 142, 60, 0.15)',
            height: 'fit-content',
            position: 'sticky',
            top: '1rem'
          }}>
            <h3 style={{ color: '#388e3c', marginBottom: '1rem' }}>Order Summary</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#666' }}>Subtotal:</span>
                <span style={{ fontWeight: '600' }}>LKR {subtotal.toLocaleString()}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#666' }}>Shipping:</span>
                <span style={{ fontWeight: '600', color: shipping === 0 ? '#28a745' : '#666' }}>
                  {shipping === 0 ? 'FREE' : `LKR ${shipping.toLocaleString()}`}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#666' }}>Tax:</span>
                <span style={{ fontWeight: '600' }}>LKR {tax.toLocaleString()}</span>
              </div>
              
              {shipping === 0 && subtotal < 10000 && (
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: '#28a745', 
                  marginTop: '0.5rem',
                  fontStyle: 'italic' 
                }}>
                  🎉 You get free shipping!
                </p>
              )}
            </div>

            <div style={{ 
              borderTop: '2px solid #f0f0f0', 
              paddingTop: '1rem', 
              marginBottom: '1.5rem' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                <span style={{ fontWeight: '700', color: '#333' }}>Total:</span>
                <span style={{ fontWeight: '700', color: '#388e3c' }}>
                  LKR {total.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              style={{
                width: '100%',
                padding: '1rem',
                background: isCheckingOut ? '#ccc' : '#388e3c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
              <p>Secure checkout powered by SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
