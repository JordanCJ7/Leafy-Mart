import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { registerCustomer } from '../services/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',

  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();
  const { loginCustomer: loginUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear field-specific error when user types
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ''
      });
    }
  };

  const validateEmail = (email) => {
    if (!email.includes('@')) {
      return 'Email must contain an @ symbol';
    }
    return '';
  };

  const validatePhone = (phone) => {
    if (phone && !/^\d{10}$/.test(phone)) {
      return 'Phone number must be exactly 10 digits (Sri Lankan format)';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    if (password && confirmPassword && password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Reset field errors
    const errors = {
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    };

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailError = validateEmail(formData.email);
    if (emailError) {
      errors.email = emailError;
    }

    // Phone validation (only if provided)
    if (formData.phone) {
      const phoneError = validatePhone(formData.phone);
      if (phoneError) {
        errors.phone = phoneError;
      }
    }

    // Password validation
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      errors.password = passwordError;
    }

    // Password match validation
    const passwordMatchError = validatePasswordMatch(formData.password, formData.confirmPassword);
    if (passwordMatchError) {
      errors.confirmPassword = passwordMatchError;
    }

    // Check if there are any validation errors
    if (errors.email || errors.phone || errors.password || errors.confirmPassword) {
      setFieldErrors(errors);
      setError('Please fix the validation errors below');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const data = await registerCustomer({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });

      if (data.success) {
        // Registration successful, automatically log them in with the returned token
        loginUser(data.user, data.token);
        // Direct new users to the landing page
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 140px)',
        padding: '40px 20px',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          padding: '40px',
          width: '100%',
          maxWidth: '450px',
          border: '1px solid #e8f5e8'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #4caf50, #45a049)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              boxShadow: '0 8px 20px rgba(76, 175, 80, 0.3)'
            }}>
              <Leaf size={40} color="white" />
            </div>
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '28px',
              background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold'
            }}>Create Account</h2>
            <p style={{
              color: '#666',
              margin: '0',
              fontSize: '16px'
            }}>Join our plant community today!</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Name Input */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2e7d32',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Full Name *
              </label>
              <div style={{ position: 'relative' }}>
                <User 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4caf50'
                  }} 
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 50px',
                    border: '2px solid #e8f5e8',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2e7d32',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Email Address *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4caf50'
                  }} 
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 50px',
                    border: fieldErrors.email ? '2px solid #dc3545' : '2px solid #e8f5e8',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>
              {fieldErrors.email && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px', marginBottom: '0' }}>
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2e7d32',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Password *
              </label>
              <div style={{ position: 'relative' }}>
                <Lock 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4caf50'
                  }} 
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  style={{
                    width: '100%',
                    padding: '15px 50px 15px 50px',
                    border: fieldErrors.password ? '2px solid #dc3545' : '2px solid #e8f5e8',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#4caf50',
                    padding: '2px'
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.password && fieldErrors.password.length > 0 && (
                <p style={{ 
                  color: '#dc3545', 
                  fontSize: '12px', 
                  marginTop: '6px', 
                  marginBottom: '0',
                  padding: '6px 8px',
                  background: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  borderRadius: '4px',
                  display: 'block',
                  visibility: 'visible'
                }}>
                  ⚠️ {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2e7d32',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Confirm Password *
              </label>
              <div style={{ position: 'relative' }}>
                <Lock 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4caf50'
                  }} 
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  style={{
                    width: '100%',
                    padding: '15px 50px 15px 50px',
                    border: fieldErrors.confirmPassword ? '2px solid #dc3545' : '2px solid #e8f5e8',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#4caf50',
                    padding: '2px'
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && fieldErrors.confirmPassword.length > 0 && (
                <p style={{ 
                  color: '#dc3545', 
                  fontSize: '12px', 
                  marginTop: '6px', 
                  marginBottom: '0',
                  padding: '6px 8px',
                  background: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  borderRadius: '4px',
                  display: 'block',
                  visibility: 'visible'
                }}>
                  ⚠️ {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Phone Number - Optional */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2e7d32',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Phone Number (Optional)
              </label>
              <div style={{ position: 'relative' }}>
                <Phone 
                  size={20} 
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4caf50'
                  }} 
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  style={{
                    width: '100%',
                    padding: '15px 15px 15px 50px',
                    border: fieldErrors.phone ? '2px solid #dc3545' : '2px solid #e8f5e8',
                    borderRadius: '12px',
                    fontSize: '16px',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>
              {fieldErrors.phone && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px', marginBottom: '0' }}>
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#c8e6c9' : 'linear-gradient(135deg, #4caf50, #45a049)',
                color: 'white',
                border: 'none',
                padding: '18px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(76, 175, 80, 0.3)',
                marginTop: '10px'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div style={{
            textAlign: 'center',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #e8f5e8'
          }}>
            <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{
                  color: '#4caf50',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;
