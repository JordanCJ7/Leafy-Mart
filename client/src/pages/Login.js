import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { loginCustomer } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { loginCustomer: loginUser, loginAdmin } = useAuth();

  const rawFrom = location.state?.from?.pathname;
  // Default landing page for regular users
  const defaultLanding = '/';
  const from = rawFrom || defaultLanding;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const data = await loginCustomer({ email, password });

      if (data.success) {
        // Determine whether the returned user should be treated as admin
        const isAdminUser = data.user && (data.user.role === 'admin' || data.user.isAdmin === true || data.isAdmin === true);

        if (isAdminUser) {
          // store admin token/data and send to admin dashboard
          loginAdmin(data.user, data.token);
          navigate('/admin/dashboard', { replace: true });
        } else {
          // Regular customer
          loginUser(data.user, data.token);

          // Prevent navigating back to login/signup/profile after successful auth
          const forbidden = ['/login', '/signup', '/register', '/profile'];

          // If the saved `from` path points to an admin-only area (starts with '/admin')
          // or to the user's profile page (starts with '/profile'), do not send a non-admin user there —
          // instead send them to the default landing.
          const fromPath = rawFrom || defaultLanding;
          const isFromAdminPath = typeof fromPath === 'string' && fromPath.startsWith('/admin');
          const isFromProfilePath = typeof fromPath === 'string' && fromPath.startsWith('/profile');

          const target = forbidden.includes(fromPath) || isFromAdminPath || isFromProfilePath ? defaultLanding : fromPath;
          navigate(target, { replace: true });
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%)',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    }}>
      <Navbar />
      
      <div style={{
        padding: '3rem 1rem',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(56, 142, 60, 0.1)',
          border: '1px solid #e8f5e8',
          padding: '3rem 2rem',
          textAlign: 'center'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #388e3c, #2e7d32)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Leaf size={28} color="#fff" />
            </div>
            <h1 style={{
              color: '#2e7d32',
              fontSize: '2rem',
              fontWeight: '700',
              margin: '0 0 0.5rem 0'
            }}>
              Welcome Back
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1rem',
              margin: 0
            }}>
              Sign in to your Green Paradise account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            {/* Email Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                color: '#2e7d32',
                fontWeight: '600',
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#666'
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    border: '2px solid #e8f5e8',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#388e3c'}
                  onBlur={(e) => e.target.style.borderColor = '#e8f5e8'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                color: '#2e7d32',
                fontWeight: '600',
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#666'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '0.75rem 3rem 0.75rem 3rem',
                    border: '2px solid #e8f5e8',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#388e3c'}
                  onBlur={(e) => e.target.style.borderColor = '#e8f5e8'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: '#ffebee',
                border: '1px solid #f44336',
                color: '#d32f2f',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: loading ? '#a5d6a7' : 'linear-gradient(135deg, #388e3c, #2e7d32)',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '1.5rem'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(56, 142, 60, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Register Link */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#666', margin: 0 }}>
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  style={{
                    color: '#388e3c',
                    textDecoration: 'none',
                    fontWeight: '600'
                  }}
                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
