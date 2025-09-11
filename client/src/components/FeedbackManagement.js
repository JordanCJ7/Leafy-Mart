import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getAllFeedbackAdmin, 
  getFeedbackStatsAdmin, 
  updateFeedbackStatus 
} from '../services/api';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Eye, 
  Filter,
  TrendingUp
} from 'lucide-react';
import { alert, toast } from '../utils/swal';

export default function FeedbackManagement() {
  const { token } = useAuth();
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    rating: '',
    dateFrom: '',
    dateTo: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminResponse, setAdminResponse] = useState('');

  useEffect(() => {
    fetchFeedback();
    fetchStats();
  }, [pagination.page, filters]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await getAllFeedbackAdmin(token, {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });
      
      if (response.feedback) {
        setFeedback(response.feedback);
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }));
      }
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getFeedbackStatsAdmin(token);
      setStats(response);
    } catch (error) {
      console.error('Failed to fetch feedback stats:', error);
    }
  };

  const handleUpdateStatus = async (feedbackId, status, response = '') => {
    try {
      const updateResponse = await updateFeedbackStatus(feedbackId, {
        status,
        adminResponse: response
      }, token);
      
  if (updateResponse._id) {
        // Update feedback in the list
        setFeedback(feedback.map(fb => 
          fb._id === feedbackId ? updateResponse : fb
        ));
        setShowModal(false);
        setAdminResponse('');
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Failed to update feedback:', error);
  alert('Failed to update feedback', error.message);
    }
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '0.1rem' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star}
            size={14}
            style={{ color: star <= rating ? '#ffc107' : '#e9ecef' }}
            fill={star <= rating ? '#ffc107' : 'none'}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return '#28a745';
      case 'Rejected': return '#dc3545';
      case 'Pending': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const formatCurrency = (amount) => `LKR ${amount.toLocaleString()}`;

  if (loading && !feedback.length) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Loading feedback...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#f8f9fa' }}>
      {/* Header with Stats */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#2e7d32', marginBottom: '1rem' }}>Feedback Management</h2>
        
        {stats && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2e7d32', margin: 0 }}>Total Feedback</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#333' }}>
                {stats.totalFeedback}
              </p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2e7d32', margin: 0 }}>Average Rating</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>
                  {stats.averageRating.toFixed(1)}
                </span>
                {renderStars(Math.round(stats.averageRating))}
              </div>
            </div>
            
            <div style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2e7d32', margin: 0 }}>Delivery Rating</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#333' }}>
                {stats.averageDeliveryRating.toFixed(1)}
              </p>
            </div>
            
            <div style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2e7d32', margin: 0 }}>Recommendation Rate</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#333' }}>
                {(stats.recommendationRate * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minWidth: '120px'
            }}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minWidth: '120px'
            }}
          >
            <option value="">All Ratings</option>
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>{rating} Stars</option>
            ))}
          </select>

          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />

          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />

          <button
            onClick={() => setFilters({ status: '', rating: '', dateFrom: '', dateTo: '' })}
            style={{
              padding: '0.5rem 1rem',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {feedback.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
            <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No Feedback Found</h3>
            <p>No feedback matches your current filters.</p>
          </div>
        ) : (
          <div>
            {feedback.map(fb => (
              <div key={fb._id} style={{
                padding: '1.5rem',
                borderBottom: '1px solid #dee2e6'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, color: '#333' }}>
                        Order #{fb.orderId?.orderNumber}
                      </h4>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        background: fb.status === 'Approved' ? '#e8f5e9' : 
                                   fb.status === 'Rejected' ? '#ffebee' : '#fff3e0',
                        color: getStatusColor(fb.status)
                      }}>
                        {fb.status}
                      </span>
                    </div>
                    
                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      By: {fb.customerId?.name} ({fb.customerId?.email})
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {renderStars(fb.rating)}
                      <span style={{ color: '#666', fontSize: '0.9rem' }}>
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setSelectedFeedback(fb);
                        setShowModal(true);
                        setAdminResponse(fb.adminResponse?.response || '');
                      }}
                      style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <Eye size={14} />
                      Review
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ margin: '0 0 1rem 0', color: '#333' }}>
                    <strong>Review:</strong> {fb.review}
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>Delivery Rating:</span>
                      <div>{renderStars(fb.deliveryRating)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>Service Rating:</span>
                      <div>{renderStars(fb.serviceRating)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>Would Recommend:</span>
                      <div style={{ color: fb.wouldRecommend ? '#28a745' : '#dc3545' }}>
                        {fb.wouldRecommend ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                  
                  {fb.improvements && (
                    <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                      <strong>Improvements:</strong> {fb.improvements}
                    </p>
                  )}
                </div>

                {/* Product Feedback */}
                {fb.productFeedback && fb.productFeedback.length > 0 && (
                  <div style={{ marginTop: '1rem' }}>
                    <h5 style={{ color: '#666', marginBottom: '0.5rem' }}>Product Feedback:</h5>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      {fb.productFeedback.map((pf, index) => (
                        <div key={index} style={{
                          background: '#f8f9fa',
                          padding: '0.75rem',
                          borderRadius: '4px',
                          fontSize: '0.9rem'
                        }}>
                          <strong>{pf.productId?.name}:</strong> {renderStars(pf.productRating)} 
                          <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                            ({pf.plantCondition} condition)
                          </span>
                          {pf.productReview && (
                            <div style={{ marginTop: '0.5rem', color: '#666' }}>{pf.productReview}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Response */}
                {fb.adminResponse?.response && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#e8f4fd',
                    borderLeft: '4px solid #007bff',
                    borderRadius: '0 4px 4px 0'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                      Admin Response by {fb.adminResponse.respondedBy} on {new Date(fb.adminResponse.respondedAt).toLocaleDateString()}:
                    </div>
                    <div style={{ color: '#333' }}>{fb.adminResponse.response}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div style={{
          padding: '1rem',
          borderTop: '1px solid #dee2e6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: '#666' }}>
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} feedback
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              style={{
                padding: '0.5rem 1rem',
                background: pagination.page === 1 ? '#e9ecef' : '#007bff',
                color: pagination.page === 1 ? '#6c757d' : 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: pagination.page === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            
            <span style={{ padding: '0.5rem 1rem', background: '#e9ecef', borderRadius: '4px' }}>
              Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
            </span>
            
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
              style={{
                padding: '0.5rem 1rem',
                background: pagination.page >= Math.ceil(pagination.total / pagination.limit) ? '#e9ecef' : '#007bff',
                color: pagination.page >= Math.ceil(pagination.total / pagination.limit) ? '#6c757d' : 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: pagination.page >= Math.ceil(pagination.total / pagination.limit) ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showModal && selectedFeedback && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>
              Review Feedback - Order #{selectedFeedback.orderId?.orderNumber}
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Customer:</strong> {selectedFeedback.customerId?.name}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Overall Rating:</strong> {renderStars(selectedFeedback.rating)}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Review:</strong> {selectedFeedback.review}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Admin Response:
              </label>
              <textarea
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
                placeholder="Enter your response to this feedback..."
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={() => handleUpdateStatus(selectedFeedback._id, 'Rejected', adminResponse)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Reject
              </button>
              
              <button
                onClick={() => handleUpdateStatus(selectedFeedback._id, 'Approved', adminResponse)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
