import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyAdminToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check for customer token
      const customerToken = localStorage.getItem('customerToken');
      const customerData = localStorage.getItem('customerData');
      
      // Check for admin token
      const adminToken = localStorage.getItem('adminToken');
      
      if (customerToken && customerData) {
        setUser(JSON.parse(customerData));
        setIsLoggedIn(true);
        setIsAdmin(false);
      } else if (adminToken) {
        const response = await verifyAdminToken(adminToken);
        if (response.valid) {
          setUser(response.admin);
          setIsLoggedIn(true);
          setIsAdmin(true);
        } else {
          logout();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const loginCustomer = (customerData, token) => {
    localStorage.setItem('customerToken', token);
    localStorage.setItem('customerData', JSON.stringify(customerData));
    setUser(customerData);
    setIsLoggedIn(true);
    setIsAdmin(false);
  };

  const loginAdmin = (adminData, token) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminData', JSON.stringify(adminData));
    setUser(adminData);
    setIsLoggedIn(true);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerData');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const value = {
    user,
    isLoggedIn,
    isAdmin,
    loading,
    loginCustomer,
    loginAdmin,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
