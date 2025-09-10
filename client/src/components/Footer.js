import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
          padding: '2rem 0'
        }}>
          
          {/* Company Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Leaf size={24} color="#43a047" style={{ marginRight: '0.5rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2e7d32', margin: 0 }}>
                    Leafy Mart
                  </h3>
            </div>
            <p style={{ 
              fontSize: '0.95rem', 
              color: '#666', 
              lineHeight: '1.6', 
              marginBottom: '1.5rem',
              maxWidth: '250px'
            }}>
              Sri Lanka's premier plant store, bringing nature closer to your home with premium plants and expert care guidance.
            </p>
            
            {/* Contact Info */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <Phone size={16} color="#43a047" style={{ marginRight: '0.5rem' }} />
                <span style={{ fontSize: '0.9rem', color: '#555' }}>+94 77 123 4567</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <Mail size={16} color="#43a047" style={{ marginRight: '0.5rem' }} />
                    <span style={{ fontSize: '0.9rem', color: '#555' }}>info@leafymart.lk</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MapPin size={16} color="#43a047" style={{ marginRight: '0.5rem' }} />
                <span style={{ fontSize: '0.9rem', color: '#555' }}>123 Galle Road, Colombo 03</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600, 
              color: '#2e7d32', 
              marginBottom: '1rem' 
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                Home
              </Link>
              <Link to="/products" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                Products
              </Link>
              <Link to="/about" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                About Us
              </Link>
              <Link to="/contact" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                Contact Us
              </Link>
              <Link to="/faq" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                FAQ
              </Link>
            </div>
          </div>

          {/* Customer Services */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600, 
              color: '#2e7d32', 
              marginBottom: '1rem' 
            }}>
              Customer Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/cart" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                Shopping Cart
              </Link>
              <Link to="/wishlist" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                Wishlist
              </Link>
              <Link to="/order-tracking" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                Order Tracking
              </Link>
              <Link to="/admin/login" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                Admin Login
              </Link>
            </div>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 style={{ 
              fontSize: '1.2rem', 
              fontWeight: 600, 
              color: '#2e7d32', 
              marginBottom: '1rem' 
            }}>
              Legal & Social
            </h4>
            
            {/* Legal Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Link to="/privacy" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                Privacy Policy
              </Link>
              <Link to="/terms" style={{ 
                color: '#555', 
                textDecoration: 'none', 
                fontSize: '0.95rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#43a047'}
              onMouseOut={(e) => e.target.style.color = '#555'}>
                Terms of Service
              </Link>
            </div>

            {/* Social Media */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a 
                href="#" 
                style={{
                  background: '#1877f2',
                  color: '#fff',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#" 
                style={{
                  background: 'linear-gradient(45deg, #405de6, #833ab4, #c13584, #e1306c)',
                  color: '#fff',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#" 
                style={{
                  background: '#1da1f2',
                  color: '#fff',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #e0e0e0',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ 
            margin: 0, 
            color: '#666', 
            fontSize: '0.9rem' 
          }}>
                &copy; {new Date().getFullYear()} Leafy Mart 🌿. All rights reserved.
          </p>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            fontSize: '0.85rem',
            color: '#777'
          }}>
            <span>Made with 💚 in Sri Lanka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
