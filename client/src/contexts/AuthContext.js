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
  const [token, setToken] = useState(null);

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
        setToken(customerToken);
        setIsLoggedIn(true);
        setIsAdmin(false);
      } else if (adminToken) {
        const response = await verifyAdminToken(adminToken);
        if (response.valid) {
          setUser(response.admin);
          setToken(adminToken);
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

  const loginCustomer = (customerData, tokenValue) => {
    localStorage.setItem('customerToken', tokenValue);
    localStorage.setItem('customerData', JSON.stringify(customerData));
    setUser(customerData);
    setToken(tokenValue);
    setIsLoggedIn(true);
    setIsAdmin(false);
  };

  const loginAdmin = (adminData, tokenValue) => {
    localStorage.setItem('adminToken', tokenValue);
    localStorage.setItem('adminData', JSON.stringify(adminData));
    setUser(adminData);
    setToken(tokenValue);
    setIsLoggedIn(true);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerData');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
    if (!isAdmin) {
      localStorage.setItem('customerData', JSON.stringify(userData));
    } else {
      localStorage.setItem('adminData', JSON.stringify(userData));
    }
  };

  const value = {
    user,
    token,
    isLoggedIn,
    isAdmin,
    loading,
    loginCustomer,
    loginAdmin,
    logout,
    updateUser,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
