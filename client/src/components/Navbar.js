import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, ShoppingCart, Menu, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Leaf className="navbar-icon" />
          <span>Green Paradise</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          
          {isLoggedIn && (
            <>
              <Link 
                to="/products" 
                className={`navbar-item ${location.pathname === '/products' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Plants
              </Link>
              <Link 
                to="/about" 
                className={`navbar-item ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`navbar-item ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </>
          )}

          {!isLoggedIn ? (
            <>
              <Link 
                to="/login" 
                className={`navbar-item ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className={`navbar-item ${location.pathname === '/signup' || location.pathname === '/register' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <Link 
                  to="/admin/dashboard" 
                  className={`navbar-item ${location.pathname.includes('/admin') ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <div className="navbar-user-dropdown">
                <button 
                  className="navbar-user"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User size={18} />
                  <span>{user?.name || user?.username}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown-menu">
                    <Link 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      <Settings size={16} />
                      Profile
                    </Link>
                    <button 
                      className="dropdown-item logout-item"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="navbar-actions">
          {isLoggedIn && (
            <Link to="/cart" className="navbar-action">
              <ShoppingCart size={20} />
            </Link>
          )}
          <button 
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
