import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Filter and pagination state
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [membershipFilter, setMembershipFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  
  // Statistics
  const [userStats, setUserStats] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const getAuthToken = () => {
    return localStorage.getItem('adminToken') || localStorage.getItem('token');
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 10,
        search,
        ...(roleFilter && { role: roleFilter }),
        ...(membershipFilter && { membershipLevel: membershipFilter })
      });

      const response = await fetch(`${API_BASE}/users/admin/users?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data.users);
        setTotalPages(data.data.pagination.totalPages);
        setTotalUsers(data.data.pagination.totalUsers);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/users/admin/users/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setUserStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchUserStats();
  }, [currentPage, search, roleFilter, membershipFilter]);

  const handleEditUser = (user) => {
    setSelectedUser({ ...user });
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setShowResetPasswordModal(true);
    setNewPassword('');
  };

  const updateUser = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/users/admin/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedUser)
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('User updated successfully');
        setShowEditModal(false);
        fetchUsers();
      } else {
        setError(data.message || 'Failed to update user');
      }
    } catch (error) {
      setError('Network error occurred');
    }
  };

  const deleteUser = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/users/admin/users/${selectedUser._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('User deactivated successfully');
        setShowDeleteModal(false);
        fetchUsers();
      } else {
        setError(data.message || 'Failed to deactivate user');
      }
    } catch (error) {
      setError('Network error occurred');
    }
  };

  const reactivateUser = async (userId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/users/admin/users/${userId}/reactivate`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('User reactivated successfully');
        fetchUsers();
      } else {
        setError(data.message || 'Failed to reactivate user');
      }
    } catch (error) {
      setError('Network error occurred');
    }
  };

  const resetPassword = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/users/admin/users/${selectedUser._id}/reset-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Password reset successfully');
        setShowResetPasswordModal(false);
        setNewPassword('');
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      setError('Network error occurred');
    }
  };

  const getMembershipBadgeColor = (level) => {
    const colors = {
      'Bronze': '#CD7F32',
      'Silver': '#C0C0C0',
      'Gold': '#FFD700',
      'Platinum': '#E5E4E2'
    };
    return colors[level] || '#666';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return `LKR ${amount.toLocaleString()}`;
  };

  if (loading && users.length === 0) {
    return (
      <div className="user-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h1>User Management</h1>
        <p>Manage customer accounts, view statistics, and handle user operations</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>{success}</span>
          <button onClick={() => setSuccess('')}>×</button>
        </div>
      )}

      {/* User Statistics */}
      {userStats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{userStats.overview.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p className="stat-number">{userStats.overview.activeUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Customers</h3>
            <p className="stat-number">{userStats.overview.customerCount}</p>
          </div>
          <div className="stat-card">
            <h3>New This Week</h3>
            <p className="stat-number">{userStats.overview.recentRegistrations}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          
          <select
            value={membershipFilter}
            onChange={(e) => setMembershipFilter(e.target.value)}
          >
            <option value="">All Memberships</option>
            <option value="Bronze">Bronze</option>
            <option value="Silver">Silver</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Membership</th>
              <th>Total Spent</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                </td>
                <td>{user.phone || 'N/A'}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span 
                    className="membership-badge" 
                    style={{ backgroundColor: getMembershipBadgeColor(user.membershipLevel) }}
                  >
                    {user.membershipLevel}
                  </span>
                </td>
                <td>{formatCurrency(user.totalSpent || 0)}</td>
                <td>{formatDate(user.registrationDate)}</td>
                <td>
                  <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-reset"
                      onClick={() => handleResetPassword(user)}
                    >
                      Reset PWD
                    </button>
                    {user.isActive ? (
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteUser(user)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button 
                        className="btn-reactivate"
                        onClick={() => reactivateUser(user._id)}
                      >
                        Reactivate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        
        <span>
          Page {currentPage} of {totalPages} ({totalUsers} total users)
        </span>
        
        <button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit User</h3>
              <button onClick={() => setShowEditModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  value={selectedUser.phone || ''}
                  onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                />
              </div>
              
              <div className="form-group">
                <label>Role</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="btn-save" onClick={updateUser}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Deactivate User</h3>
              <button onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <p>Are you sure you want to deactivate <strong>{selectedUser.name}</strong>?</p>
              <p>This action will prevent the user from logging in, but their data will be preserved.</p>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn-delete" onClick={deleteUser}>
                Deactivate User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetPasswordModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowResetPasswordModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reset Password</h3>
              <button onClick={() => setShowResetPasswordModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              <p>Reset password for <strong>{selectedUser.name}</strong></p>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowResetPasswordModal(false)}>
                Cancel
              </button>
              <button 
                className="btn-save" 
                onClick={resetPassword}
                disabled={newPassword.length < 6}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
