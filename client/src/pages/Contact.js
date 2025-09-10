import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  Facebook,
  Instagram,
  Twitter,
  Leaf
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div style={{ 
      background: '#f1faee', 
      minHeight: '100vh', 
      fontFamily: 'Segoe UI, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #2e7d32 0%, #43a047 50%, #66bb6a 100%)',
        color: '#fff',
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Have questions about plants? Need help with your order? We're here to help!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Contact Information */}
          <section style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={{
                background: '#fff',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <Phone size={40} color="#43a047" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                  Call Us
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}>
                  +94 77 123 4567
                </p>
                <p style={{ fontSize: '1rem', color: '#666' }}>
                  Mon-Sat: 8:00 AM - 6:00 PM
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <Mail size={40} color="#43a047" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                  Email Us
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}>
                  info@leafymart.lk
                </p>
                <p style={{ fontSize: '1rem', color: '#666' }}>
                  We respond within 24 hours
                </p>
              </div>

              <div style={{
                background: '#fff',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <MapPin size={40} color="#43a047" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                  Visit Us
                </h3>
                <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}>
                  123 Galle Road, Colombo 03
                </p>
                <p style={{ fontSize: '1rem', color: '#666' }}>
                  Sri Lanka
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form and Map */}
          <section>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              
              {/* Contact Form */}
              <div style={{
                background: '#fff',
                padding: '3rem',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        padding: '1rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontFamily: 'inherit'
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        padding: '1rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        padding: '1rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontFamily: 'inherit'
                      }}
                    />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{
                        padding: '1rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      marginBottom: '1.5rem',
                      resize: 'vertical'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #43a047, #66bb6a)',
                      color: '#fff',
                      padding: '1rem 2rem',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Business Hours and Social Media */}
              <div>
                {/* Business Hours */}
                <div style={{
                  background: '#fff',
                  padding: '2.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  marginBottom: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <Clock size={30} color="#43a047" style={{ marginRight: '1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                      Business Hours
                    </h3>
                  </div>
                  <div style={{ fontSize: '1rem', color: '#333' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <span>Monday - Friday:</span>
                      <span style={{ fontWeight: 600 }}>8:00 AM - 6:00 PM</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <span>Saturday:</span>
                      <span style={{ fontWeight: 600 }}>9:00 AM - 4:00 PM</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                      <span>Sunday:</span>
                      <span style={{ fontWeight: 600, color: '#e53e3e' }}>Closed</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Public Holidays:</span>
                      <span style={{ fontWeight: 600, color: '#e53e3e' }}>Closed</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div style={{
                  background: '#fff',
                  padding: '2.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
                    Follow Us
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a 
                      href="#" 
                      style={{
                        background: '#1877f2',
                        color: '#fff',
                        padding: '1rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="#" 
                      style={{
                        background: 'linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)',
                        color: '#fff',
                        padding: '1rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      href="#" 
                      style={{
                        background: '#1da1f2',
                        color: '#fff',
                        padding: '1rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
                      onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      <Twitter size={20} />
                    </a>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '1rem', lineHeight: '1.6' }}>
                    Stay updated with plant care tips, new arrivals, and special offers!
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* FAQ Quick Links */}
          <section style={{ 
            background: 'linear-gradient(135deg, #2e7d32, #43a047)',
            color: '#fff',
            padding: '3rem',
            borderRadius: '16px',
            marginTop: '4rem',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
              Need Quick Answers?
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
              Check out our frequently asked questions for instant help
            </p>
            <a 
              href="/faq"
              style={{
                background: '#fff',
                color: '#2e7d32',
                padding: '1rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <MessageCircle size={18} />
              Visit FAQ
            </a>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
