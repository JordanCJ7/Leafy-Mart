import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, ShoppingCart, Menu, User, LogOut, Settings, Info, Phone, LogIn, UserPlus, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
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
  {/* Logo: for admins force a full reload to /admin/dashboard; for others go to home */}
  <a
    href={isAdmin ? '/admin/dashboard' : '/'}
    className="navbar-logo"
    onClick={(e) => {
      if (isAdmin) {
        // Force full navigation+reload to admin dashboard even if already on an admin tab
        e.preventDefault();
        window.location.href = '/admin/dashboard';
      } else {
        // For normal customers always navigate to landing page (force reload)
        e.preventDefault();
        window.location.href = '/';
      }
    }}
  >
    <Leaf className="navbar-icon" />
    <span>Leafy Mart </span>
  </a>

  <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          
          {isAdmin && (
            <>
              <Link
                to="/admin/dashboard?tab=users"
                className={`navbar-item ${location.pathname.startsWith('/admin') && new URLSearchParams(location.search).get('tab') === 'users' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                User Management
              </Link>
              <Link
                to="/admin/dashboard?tab=products"
                className={`navbar-item ${location.pathname.startsWith('/admin') && new URLSearchParams(location.search).get('tab') === 'products' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Product Management
              </Link>
              <Link
                to="/admin/dashboard?tab=orders"
                className={`navbar-item ${location.pathname.startsWith('/admin') && new URLSearchParams(location.search).get('tab') === 'orders' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Order Management
              </Link>
              <Link
                to="/admin/dashboard?tab=feedback"
                className={`navbar-item ${location.pathname.startsWith('/admin') && new URLSearchParams(location.search).get('tab') === 'feedback' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Feedback Management
              </Link>
            </>
          )}

          {isLoggedIn && !isAdmin && (
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
              {/* Admin link intentionally hidden for admins; logo directs admins to dashboard */}
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
          {isLoggedIn && !isAdmin && (
            <>
              <Link to="/wishlist" className="navbar-action" title="Wishlist">
                <div style={{ position: 'relative' }}>
                  <Heart size={20} />
                  {getWishlistCount() > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#e53e3e',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      minWidth: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1
                    }}>
                      {getWishlistCount()}
                    </span>
                  )}
                </div>
              </Link>
              <Link to="/cart" className="navbar-action" title="Shopping Cart">
                <div style={{ position: 'relative' }}>
                  <ShoppingCart size={20} />
                  {getCartItemsCount() > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      background: '#388e3c',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      minWidth: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1
                    }}>
                      {getCartItemsCount()}
                    </span>
                  )}
                </div>
              </Link>
            </>
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
