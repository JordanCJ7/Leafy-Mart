import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && (!user || !user.isAdmin)) {
    // If admin route but user is not admin, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
