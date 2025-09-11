
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getUserOrders, createFeedback } from '../services/api';
import { Package, Truck, CheckCircle, Clock, X, MapPin, Calendar, CreditCard, Star, MessageSquare } from 'lucide-react';

const mockOrders = [];

const getStatusIcon = (status) => {
  switch (status) {
    case 'Pending': return <Clock size={20} color="#ffa726" />;
    case 'Confirmed': return <CheckCircle size={20} color="#66bb6a" />;
    case 'Processing': return <Package size={20} color="#42a5f5" />;
    case 'Shipped': return <Truck size={20} color="#ab47bc" />;
    case 'Delivered': return <CheckCircle size={20} color="#28a745" />;
    case 'Cancelled': return <X size={20} color="#dc3545" />;
    default: return <Clock size={20} color="#6c757d" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return '#ffa726';
    case 'Confirmed': return '#66bb6a';
    case 'Processing': return '#42a5f5';
    case 'Shipped': return '#ab47bc';
    case 'Delivered': return '#28a745';
    case 'Cancelled': return '#dc3545';
    default: return '#6c757d';
  }
};

export default function OrderTracking() {
  const { isLoggedIn, user, token } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    rating: 5,
    review: '',
    deliveryRating: 5,
    serviceRating: 5,
    wouldRecommend: true,
    improvements: '',
    productFeedback: []
  });
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchOrders();
    }
    
    // Check if redirected from successful payment
    if (location.state?.message) {
      setTimeout(() => {
        window.history.replaceState({}, document.title);
      }, 3000);
    }
  }, [isLoggedIn, token, location.state]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      console.log('OrderTracking - Token available:', !!token);
      console.log('OrderTracking - Token preview:', token?.substring(0, 20) + '...');
      
      const response = await getUserOrders(token);
      console.log('OrderTracking - API response:', response);
      
      if (response.orders) {
        setOrders(response.orders);
      } else if (Array.isArray(response)) {
        setOrders(response);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      setFeedbackSubmitting(true);
      
      // Initialize product feedback for each product in the order
      const productFeedback = selectedOrder.items.map(item => ({
        productId: item.productId._id,
        productRating: feedbackData.productFeedback.find(pf => pf.productId === item.productId._id)?.productRating || 5,
        productReview: feedbackData.productFeedback.find(pf => pf.productId === item.productId._id)?.productReview || '',
        plantCondition: feedbackData.productFeedback.find(pf => pf.productId === item.productId._id)?.plantCondition || 'Good',
        packagingQuality: feedbackData.productFeedback.find(pf => pf.productId === item.productId._id)?.packagingQuality || 'Good'
      }));

      const feedbackPayload = {
        ...feedbackData,
        productFeedback
      };

      const response = await createFeedback(selectedOrder._id, feedbackPayload, token);
      
      if (response.error) {
        throw new Error(response.error);
      }

      alert('Feedback submitted successfully! Thank you for your review.');
      setShowFeedbackModal(false);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert('Failed to submit feedback: ' + error.message);
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const updateProductFeedback = (productId, field, value) => {
    const existingIndex = feedbackData.productFeedback.findIndex(pf => pf.productId === productId);
    const newProductFeedback = [...feedbackData.productFeedback];
    
    if (existingIndex >= 0) {
      newProductFeedback[existingIndex] = {
        ...newProductFeedback[existingIndex],
        [field]: value
      };
    } else {
      newProductFeedback.push({
        productId,
        [field]: value
      });
    }
    
    setFeedbackData({ ...feedbackData, productFeedback: newProductFeedback });
  };

  const renderStars = (rating, onRatingChange) => {
    return (
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star}
            size={20}
            style={{ 
              cursor: onRatingChange ? 'pointer' : 'default',
              color: star <= rating ? '#ffc107' : '#e9ecef'
            }}
            fill={star <= rating ? '#ffc107' : 'none'}
            onClick={() => onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  if (!isLoggedIn) {
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
            <Package size={64} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Login Required</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Please log in to track your orders.
            </p>
            <Link 
              to="/login" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#388e3c',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
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
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #388e3c',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }} />
            <p style={{ color: '#666' }}>Loading your orders...</p>
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
          <h1 style={{ color: '#388e3c', marginBottom: '0.5rem' }}>
            <Package size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Order Tracking
          </h1>
          <p style={{ color: '#666' }}>
            Track your plant orders and delivery status
          </p>
        </div>

        {orders.length === 0 ? (
          <div style={{
            background: '#fff',
            padding: '3rem',
            borderRadius: '1rem',
            boxShadow: '0 2px 16px rgba(56, 142, 60, 0.15)',
            textAlign: 'center'
          }}>
            <Package size={64} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <h3 style={{ color: '#388e3c', marginBottom: '1rem' }}>No Orders Yet</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              You haven't placed any orders yet. Start shopping for your favorite plants!
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
                fontWeight: '600'
              }}
            >
              Browse Plants
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div 
                key={order._id} 
                style={{
                  background: '#fff',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 2px 16px rgba(56, 142, 60, 0.15)',
                  border: selectedOrder?._id === order._id ? '2px solid #388e3c' : '1px solid transparent'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>
                      Order #{order.orderNumber || order._id}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {getStatusIcon(order.status)}
                      <span style={{ 
                        color: getStatusColor(order.status), 
                        fontWeight: '600' 
                      }}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                      <Calendar size={16} />
                      <span>Ordered: {new Date(order.createdAt || order.orderDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#388e3c', fontWeight: '700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                      LKR {order.total.toLocaleString()}
                    </div>
                    {order.trackingNumber && (
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        Tracking: {order.trackingNumber}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Items:</h4>
                  {order.items.map((item, index) => (
                    <div key={item.productId?._id || index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      padding: '0.25rem 0',
                      fontSize: '0.9rem',
                      color: '#666'
                    }}>
                      <span>{item.productId?.name || item.name || 'Product'} × {item.quantity}</span>
                      <span>LKR {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '1rem', 
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} color="#666" />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>Shipping Address:</div>
                      <div style={{ fontSize: '0.9rem', color: '#333' }}>
                        {order.shippingAddress ? (
                          <div>
                            <div>{order.shippingAddress.street}</div>
                            <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</div>
                            <div>{order.shippingAddress.country}</div>
                          </div>
                        ) : '—'}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Truck size={16} color="#666" />
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>
                        {order.status === 'Delivered' ? 'Delivered:' : 'Expected Delivery:'}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#333' }}>
                        {(order.actualDelivery || order.deliveryDate)
                          ? new Date(order.actualDelivery || order.deliveryDate).toLocaleDateString()
                          : order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : '—'
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  flexWrap: 'wrap' 
                }}>
                  <button
                    onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid #388e3c',
                      background: 'transparent',
                      color: '#388e3c',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}
                  >
                    {selectedOrder?._id === order._id ? 'Hide Details' : 'View Details'}
                  </button>

                  {order.trackingNumber && (
                    <button
                      onClick={() => alert(`Tracking: ${order.trackingNumber}\n\nThis would open external tracking page.`)}
                      style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid #42a5f5',
                        background: 'transparent',
                        color: '#42a5f5',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      Track Package
                    </button>
                  )}

                  {order.status === 'Delivered' && (
                    <button
                      onClick={() => alert('Review feature coming soon!')}
                      style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid #ff9800',
                        background: 'transparent',
                        color: '#ff9800',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      Write Review
                    </button>
                  )}
                </div>

                {selectedOrder?._id === order._id && (
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '1rem',
                    background: '#e8f5e8',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ color: '#388e3c', marginBottom: '1rem' }}>Order Timeline</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {/* Order timeline would go here */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={16} color="#28a745" />
                        <span style={{ fontSize: '0.9rem' }}>Order placed - {new Date(order.orderDate).toLocaleDateString()}</span>
                      </div>
                      {order.status !== 'Pending' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle size={16} color="#28a745" />
                          <span style={{ fontSize: '0.9rem' }}>Order confirmed</span>
                        </div>
                      )}
                      {(order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered') && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle size={16} color="#28a745" />
                          <span style={{ fontSize: '0.9rem' }}>Order processing</span>
                        </div>
                      )}
                      {(order.status === 'Shipped' || order.status === 'Delivered') && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle size={16} color="#28a745" />
                          <span style={{ fontSize: '0.9rem' }}>Order shipped</span>
                        </div>
                      )}
                      {order.status === 'Delivered' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle size={16} color="#28a745" />
                          <span style={{ fontSize: '0.9rem' }}>Order delivered - {new Date(order.deliveryDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
      <Footer />
    </div>
  );
}
