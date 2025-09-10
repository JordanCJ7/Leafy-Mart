import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, Plus, Search, Filter } from 'lucide-react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  
  // Sample customer data for demonstration
  const sampleCustomers = [
    {
      _id: '1',
      firstName: 'Chaminda',
      lastName: 'Perera',
      email: 'chaminda@email.com',
      phone: '+94 77 123 4567',
      address: {
        city: 'Colombo',
        state: 'Western Province'
      },
      totalPurchases: 5,
      totalSpent: 12500,
      membershipLevel: 'Silver',
      loyaltyPoints: 125
    },
    {
      _id: '2',
      firstName: 'Nimalka',
      lastName: 'Silva',
      email: 'nimalka@email.com',
      phone: '+94 71 987 6543',
      address: {
        city: 'Kandy',
        state: 'Central Province'
      },
      totalPurchases: 12,
      totalSpent: 28750,
      membershipLevel: 'Gold',
      loyaltyPoints: 287
    }
  ];

  const handleSearch = () => {
    // In a real app, this would filter from API
    const filtered = sampleCustomers.filter(customer => 
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCustomers(filtered);
  };

  React.useEffect(() => {
    setCustomers(sampleCustomers);
  }, []);

  const getMembershipBadgeColor = (level) => {
    switch(level) {
      case 'Platinum': return '#e5e7eb';
      case 'Gold': return '#fbbf24';
      case 'Silver': return '#9ca3af';
      default: return '#cd7f32';
    }
  };

  return (
    <div style={{ 
      background: '#f1faee', 
      minHeight: '100vh', 
      fontFamily: 'Segoe UI, Arial, sans-serif' 
    }}>
      <Navbar />
      
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #2e7d32 0%, #43a047 50%, #66bb6a 100%)',
        color: '#fff',
        padding: '2rem 1rem',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
          Customer Management
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem', opacity: 0.9 }}>
          Manage your plant store customers and their information
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Search and Actions */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#666'
              }} />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  border: '2px solid #e8f5e8',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  width: '250px'
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#388e3c',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Search size={16} /> Search
            </button>
          </div>
          
          <button
            onClick={() => setShowAddCustomer(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#43a047',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '600'
            }}
          >
            <Plus size={16} /> Add Customer
          </button>
        </div>

        {/* Customer Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {customers.map((customer) => (
            <div key={customer._id} style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              border: '1px solid #e8f5e8'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#e8f5e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem'
                }}>
                  <User size={24} color="#388e3c" />
                </div>
                <div>
                  <h3 style={{ 
                    margin: '0 0 0.25rem 0', 
                    color: '#2e7d32',
                    fontSize: '1.25rem' 
                  }}>
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    background: getMembershipBadgeColor(customer.membershipLevel),
                    color: customer.membershipLevel === 'Gold' ? '#000' : '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {customer.membershipLevel}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                  <strong>Email:</strong> {customer.email}
                </p>
                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                  <strong>Phone:</strong> {customer.phone}
                </p>
                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                  <strong>Location:</strong> {customer.address.city}, {customer.address.state}
                </p>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2e7d32' }}>
                    {customer.totalPurchases}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Orders
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2e7d32' }}>
                    LKR {customer.totalSpent.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Total Spent
                  </div>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                background: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <div>
                  <span style={{ fontSize: '0.875rem', color: '#666' }}>
                    Loyalty Points: 
                  </span>
                  <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                    {customer.loyaltyPoints}
                  </span>
                </div>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#388e3c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {customers.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
          }}>
            <User size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No customers found</h3>
            <p>Add your first customer to get started</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerManagement;
