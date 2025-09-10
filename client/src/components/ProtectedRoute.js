import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#f1faee'
      }}>
        <div style={{ 
          color: '#388e3c', 
          fontSize: '1.2rem',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '1rem' }}>🌱</div>
          Loading...
        </div>
      </div>
    );
  }

  // If admin access is required
  if (requireAdmin) {
    if (!isLoggedIn || !isAdmin) {
  return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } 
  // If user access is required (customer or admin)
  else {
    if (!isLoggedIn) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
