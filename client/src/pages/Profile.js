import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Profile.css';

const Profile = () => {
  const { user, updateUser, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Sri Lanka'
    },
    plantPreferences: [],
    careLevel: 'Beginner',
    plantingExperience: 'None',
    favoriteCategories: [],
    newsletter: true,
    careReminders: true,
    promotionalEmails: true
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const getAuthToken = () => {
    // Check for customer token first, then admin token, then fallback to generic token
    return localStorage.getItem('customerToken') || 
           localStorage.getItem('adminToken') || 
           localStorage.getItem('token');
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchUserProfile = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setProfileData({
          name: data.data.name || '',
          email: data.data.email || '',
          phone: data.data.phone || '',
          address: data.data.address || {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'Sri Lanka'
          },
          plantPreferences: data.data.plantPreferences || [],
          careLevel: data.data.careLevel || 'Beginner',
          plantingExperience: data.data.plantingExperience || 'None',
          favoriteCategories: data.data.favoriteCategories || [],
          newsletter: data.data.newsletter ?? true,
          careReminders: data.data.careReminders ?? true,
          promotionalEmails: data.data.promotionalEmails ?? true
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/users/profile/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setOrders(data.data.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const token = getAuthToken();
      
      const response = await fetch(`${API_BASE}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Profile updated successfully!');
        if (updateUser) {
          updateUser(data.data);
        }
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }
      
      if (passwordData.newPassword.length < 6) {
        setError('New password must be at least 6 characters long');
        return;
      }

      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/users/profile/change-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(data.message || 'Failed to change password');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value, isAddress = false) => {
    if (isAddress) {
      setProfileData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field, value, isChecked) => {
    setProfileData(prev => ({
      ...prev,
      [field]: isChecked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const plantPreferenceOptions = [
    'Indoor', 'Outdoor', 'Flowering', 'Foliage', 
    'Succulents', 'Herbs', 'Trees', 'Shrubs'
  ];

  const categoryOptions = [
    'Air Purifying Plants', 'Low Maintenance', 'Pet-Safe Plants',
    'Medicinal Plants', 'Decorative Plants', 'Edible Plants'
  ];

  const getMembershipColor = (level) => {
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

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#f57c00',
      'processing': '#1976d2',
      'shipped': '#388e3c',
      'delivered': '#2e7d32',
      'cancelled': '#d32f2f'
    };
    return colors[status] || '#666';
  };

  return (
    <div className="profile-page-root">
      <Navbar />
      
      <main className="profile-main">
        <div className="profile-container">
          <div className="profile-header">
            <h1>My Account</h1>
            <p>Manage your profile, preferences, and order history</p>
            
            {user && (
              <div className="user-stats">
                {/* Do not show these stats for admin users */}
                {!isAdmin && (
                  <div className="stat-item">
                    <span className="stat-label">Membership</span>
                    <span 
                      className="stat-value membership"
                      style={{ backgroundColor: getMembershipColor(user.membershipLevel) }}
                    >
                      {user.membershipLevel}
                    </span>
                  </div>
                )}

                {!isAdmin && (
                  <div className="stat-item">
                    <span className="stat-label">Total Spent</span>
                    <span className="stat-value">{formatCurrency(user.totalSpent || 0)}</span>
                  </div>
                )}

                {!isAdmin && (
                  <div className="stat-item">
                    <span className="stat-label">Orders</span>
                    <span className="stat-value">{user.totalPurchases || 0}</span>
                  </div>
                )}
              </div>
            )}
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

          <div className="profile-tabs">
            <button 
              className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile & Preferences
            </button>
            <button 
              className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
            {/* Orders tab is not shown for admin users */}
            {!isAdmin && (
              <button 
                className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Order History
              </button>
            )}
          </div>

          <div className="tab-content">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="profile-form">
                <div className="form-section">
                  <h3>Personal Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Address</h3>
                  
                  <div className="form-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      value={profileData.address.street}
                      onChange={(e) => handleInputChange('street', e.target.value, true)}
                      placeholder="Enter your street address"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        value={profileData.address.city}
                        onChange={(e) => handleInputChange('city', e.target.value, true)}
                        placeholder="Enter your city"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>State/Province</label>
                      <input
                        type="text"
                        value={profileData.address.state}
                        onChange={(e) => handleInputChange('state', e.target.value, true)}
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>ZIP/Postal Code</label>
                      <input
                        type="text"
                        value={profileData.address.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value, true)}
                        placeholder="Enter your ZIP code"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        value={profileData.address.country}
                        onChange={(e) => handleInputChange('country', e.target.value, true)}
                      >
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="India">India</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                {!isAdmin && (
                  <div className="form-section">
                    <h3>Plant Preferences</h3>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>Care Level</label>
                        <select
                          value={profileData.careLevel}
                          onChange={(e) => handleInputChange('careLevel', e.target.value)}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Expert">Expert</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Planting Experience</label>
                        <select
                          value={profileData.plantingExperience}
                          onChange={(e) => handleInputChange('plantingExperience', e.target.value)}
                        >
                          <option value="None">None</option>
                          <option value="Some">Some</option>
                          <option value="Experienced">Experienced</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Plant Types (Select all that apply)</label>
                      <div className="checkbox-grid">
                        {plantPreferenceOptions.map(option => (
                          <label key={option} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={profileData.plantPreferences.includes(option)}
                              onChange={(e) => handleArrayChange('plantPreferences', option, e.target.checked)}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Favorite Categories</label>
                      <div className="checkbox-grid">
                        {categoryOptions.map(option => (
                          <label key={option} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={profileData.favoriteCategories.includes(option)}
                              onChange={(e) => handleArrayChange('favoriteCategories', option, e.target.checked)}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!isAdmin && (
                  <div className="form-section">
                    <h3>Communication Preferences</h3>
                    
                    <div className="checkbox-list">
                      <label className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={profileData.newsletter}
                          onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                        />
                        <span>Newsletter Subscription</span>
                      </label>
                      
                      <label className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={profileData.careReminders}
                          onChange={(e) => handleInputChange('careReminders', e.target.checked)}
                        />
                        <span>Plant Care Reminders</span>
                      </label>
                      
                      <label className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={profileData.promotionalEmails}
                          onChange={(e) => handleInputChange('promotionalEmails', e.target.checked)}
                        />
                        <span>Promotional Emails</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button 
                    className="btn-primary"
                    onClick={updateProfile}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="security-form">
                <div className="form-section">
                  <h3>Change Password</h3>
                  
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      placeholder="Enter current password"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      placeholder="Enter new password (min 6 characters)"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      placeholder="Confirm new password"
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="btn-primary"
                      onClick={changePassword}
                      disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    >
                      {loading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab removed for admins; non-admins still have orders when activeTab === 'orders' */}
            {!isAdmin && activeTab === 'orders' && (
              <div className="orders-section">
                <h3>Order History</h3>
                
                {ordersLoading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="empty-state">
                    <p>No orders found. Start shopping to see your order history!</p>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order._id} className="order-card">
                        <div className="order-header">
                          <div>
                            <h4>Order #{order._id.slice(-6)}</h4>
                            <p>{formatDate(order.createdAt)}</p>
                          </div>
                          <div>
                            <span 
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(order.status) }}
                            >
                              {order.status}
                            </span>
                            <p className="order-total">{formatCurrency(order.total)}</p>
                          </div>
                        </div>
                        
                        <div className="order-items">
                          {order.items.map((item, index) => (
                            <div key={index} className="order-item">
                              <img 
                                src={item.productId?.image || '/images/placeholder.png'} 
                                alt={item.productId?.name || 'Product'} 
                              />
                              <div className="item-details">
                                <h5>{item.productId?.name || 'Product'}</h5>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {formatCurrency(item.price)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
