import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, ShoppingCart, Menu, User, LogOut, Settings, Info, Phone, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Leaf className="navbar-icon" />
          <span>Green Paradise</span>
        </Link>

  <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          
          {isLoggedIn && (
            <>
              <Link 
                to="/products" 
                className={`navbar-item ${location.pathname === '/products' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Leaf size={16} className="nav-icon" />
                Plants
              </Link>
              <Link 
                to="/about" 
                className={`navbar-item ${location.pathname === '/about' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Info size={16} className="nav-icon" />
                About
              </Link>
              <Link 
                to="/contact" 
                className={`navbar-item ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone size={16} className="nav-icon" />
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
                <LogIn size={16} className="nav-icon" />
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className={`navbar-item ${location.pathname === '/signup' || location.pathname === '/register' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus size={16} className="nav-icon" />
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
                  <User size={16} className="nav-icon" />
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
