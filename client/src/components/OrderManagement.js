import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getAllOrders, 
  getOrderStats, 
  updateOrderStatusAdmin, 
  bulkUpdateOrderStatus 
} from '../services/api';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  X, 
  Search,
  Filter,
  Download,
  Edit3,
  Eye,
  MessageSquare
} from 'lucide-react';
import { toast, alert } from '../utils/swal';
import { generateOrderReport } from '../utils/reportGenerator';

const statusColors = {
  'Pending': '#ffa726',
  'Confirmed': '#66bb6a',
  'Processing': '#42a5f5',
  'Shipped': '#ab47bc',
  'Delivered': '#28a745',
  'Cancelled': '#dc3545'
};

const statusOptions = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const paymentStatusOptions = ['Pending', 'Paid', 'Failed', 'Refunded'];

export default function OrderManagement() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateData, setUpdateData] = useState({
    status: '',
    trackingNumber: '',
    notes: ''
  });

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [pagination.page, filters]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAllOrders(token, {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });
      
      if (response.orders) {
        setOrders(response.orders);
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          pages: response.pagination.pages
        }));
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getOrderStats(token);
      setStats(response);
    } catch (error) {
      console.error('Failed to fetch order stats:', error);
    }
  };

  const handleOrderSelect = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders((orders || []).map(order => order._id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleUpdateOrder = async (orderId, updateData) => {
    try {
      const response = await updateOrderStatusAdmin(orderId, updateData, token);
  if (response._id) {
        // Update the order in the list
        setOrders(orders.map(order => 
          order._id === orderId ? response : order
        ));
        setShowUpdateModal(false);
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Failed to update order:', error);
  alert('Failed to update order', error.message);
    }
  };

  const handleBulkUpdate = async (status, notes = '') => {
    if (selectedOrders.length === 0) {
      alert('Warning', 'Please select orders to update');
      return;
    }

    try {
      const response = await bulkUpdateOrderStatus(selectedOrders, { status, notes }, token);
      if (response.updatedOrders) {
        fetchOrders();
        fetchStats();
        setSelectedOrders([]);
        toast({ title: response.message, icon: 'success' });
      }
    } catch (error) {
      console.error('Failed to bulk update orders:', error);
      alert('Failed to update orders', error.message);
    }
  };

  // feedback request function removed

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock size={16} />;
      case 'Confirmed': return <CheckCircle size={16} />;
      case 'Processing': return <Package size={16} />;
      case 'Shipped': return <Truck size={16} />;
      case 'Delivered': return <CheckCircle size={16} />;
      case 'Cancelled': return <X size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatCurrency = (amount) => {
    // Guard against undefined/null/non-number values
    const n = Number(amount);
    if (!Number.isFinite(n)) return 'LKR 0';
    return `LKR ${n.toLocaleString()}`;
  };

  const handleGenerateReport = async () => {
    try {
      // Fetch all orders for the report
      const allOrdersData = await getAllOrders(token, { ...filters, page: 1, limit: 1000 });
      generateOrderReport(allOrdersData.orders, stats);
      toast({ title: 'Report generated successfully!', icon: 'success' });
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report', error.message);
    }
  };

  if (loading && !orders.length) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div>Loading orders...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#f8f9fa' }}>
      {/* Header with Stats */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ color: '#2e7d32', margin: '0 0 0.5rem 0' }}>Order Management</h2>
            <p style={{ color: '#666', margin: 0, fontSize: '0.95rem' }}>Track and manage customer orders</p>
          </div>
          <button 
            onClick={handleGenerateReport}
            style={{
              background: 'linear-gradient(135deg, #388e3c, #2e7d32)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}
          >
            <Download size={20} />
            Generate Report
          </button>
        </div>
        
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
              <h3 style={{ color: '#2e7d32', margin: 0 }}>Total Orders</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#333' }}>
                {stats.totalOrders}
              </p>
            </div>
            <div style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2e7d32', margin: 0 }}>Total Revenue</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#333' }}>
                {formatCurrency(stats.totalRevenue)}
              </p>
            </div>
            
            {(stats?.statusStats || []).map(stat => (
              <div key={stat._id} style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ color: statusColors[stat._id], margin: 0 }}>{stat._id}</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0.5rem 0', color: '#333' }}>
                  {stat.count}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
                  {formatCurrency(stat.totalValue)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters and Actions */}
      <div style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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
            <option value="">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={filters.paymentStatus}
            onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              minWidth: '120px'
            }}
          >
            <option value="">All Payment Status</option>
            {paymentStatusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
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
            onClick={() => setFilters({ status: '', paymentStatus: '', dateFrom: '', dateTo: '', search: '' })}
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

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ color: '#666' }}>{selectedOrders.length} orders selected</span>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleBulkUpdate(e.target.value);
                  e.target.value = '';
                }
              }}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <option value="">Bulk Update Status</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>Update to {status}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div style={{
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length && orders.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  Select
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Order #</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Customer</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Payment</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Total</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(orders || []).map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '1rem' }}>
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={(e) => handleOrderSelect(order._id, e.target.checked)}
                    />
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{order.orderNumber}</td>
                  <td style={{ padding: '1rem' }}>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{order.customerId?.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>{order.customerId?.email}</div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      color: statusColors[order.status],
                      fontWeight: 'bold'
                    }}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      background: order.paymentStatus === 'Paid' ? '#e8f5e9' : '#fff3e0',
                      color: order.paymentStatus === 'Paid' ? '#2e7d32' : '#f57c00'
                    }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>{formatCurrency(order.total)}</td>
                  <td style={{ padding: '1rem', color: '#666' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setUpdateData({
                            status: order.status,
                            trackingNumber: order.trackingNumber || '',
                            notes: order.notes || ''
                          });
                          setShowUpdateModal(true);
                        }}
                        style={{
                          background: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        title="Edit Order"
                      >
                        <Edit3 size={14} />
                      </button>
                      
                      {/* feedback request button removed */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} orders
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

      {/* Update Order Modal */}
      {showUpdateModal && selectedOrder && (
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
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>
              Update Order {selectedOrder.orderNumber}
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Status:
              </label>
              <select
                value={updateData.status}
                onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Tracking Number:
              </label>
              <input
                type="text"
                value={updateData.trackingNumber}
                onChange={(e) => setUpdateData({ ...updateData, trackingNumber: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                placeholder="Enter tracking number"
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Notes:
              </label>
              <textarea
                value={updateData.notes}
                onChange={(e) => setUpdateData({ ...updateData, notes: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
                placeholder="Add notes about the order update"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowUpdateModal(false)}
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
                onClick={() => handleUpdateOrder(selectedOrder._id, updateData)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
