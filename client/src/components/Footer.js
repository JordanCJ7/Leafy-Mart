import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Smart Plant Store. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">Home</a> |
          <a href="/cart">Cart</a> |
          <a href="/wishlist">Wishlist</a> |
          <a href="/profile">Profile</a> |
          <a href="/order-tracking">Order Tracking</a> |
          <a href="/admin">Admin</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
