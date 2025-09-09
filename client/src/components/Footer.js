import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Footer.css';

const Footer = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Botanica Hub 🌿. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">Home</a> |
          <a href="/products">Products</a> |
          {isLoggedIn ? (
            <>
              <a href="/cart">Cart</a> |
              <a href="/wishlist">Wishlist</a> |
              <a href="/profile">Profile</a> |
              <a href="/order-tracking">Order Tracking</a>
              {user && user.isAdmin && (
                <>
                  {" | "}
                  <a href="/admin">Admin</a>
                </>
              )}
            </>
          ) : (
            <>
              <a href="/login">Login</a> |
              <a href="/register">Register</a>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
