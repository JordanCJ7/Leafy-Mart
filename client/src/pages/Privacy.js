import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, FileText, AlertCircle, Phone } from 'lucide-react';

const Privacy = () => {
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
          <Shield size={60} style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '1rem' }}>
            Last updated: December 2024
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Introduction */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              Introduction
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              At Leafy Mart, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
              By using our website and services, you consent to the data practices described in this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Eye size={30} color="#43a047" style={{ marginRight: '1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                Information We Collect
              </h2>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                Personal Information
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>Name and contact information (email, phone number, address)</li>
                <li>Account credentials (username, password)</li>
                <li>Payment information (billing address, payment method details)</li>
                <li>Order history and preferences</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                Automatically Collected Information
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Website usage data (pages visited, time spent, clicks)</li>
                <li>Location information (general geographic location)</li>
                <li>Cookies and tracking technologies data</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <FileText size={30} color="#43a047" style={{ marginRight: '1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                How We Use Your Information
              </h2>
            </div>
            
            <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
              <li>Process and fulfill your orders</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send order confirmations, shipping updates, and delivery notifications</li>
              <li>Personalize your shopping experience and product recommendations</li>
              <li>Send promotional emails and marketing communications (with your consent)</li>
              <li>Improve our website, products, and services</li>
              <li>Comply with legal obligations and resolve disputes</li>
              <li>Prevent fraudulent activities and enhance security</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Lock size={30} color="#43a047" style={{ marginRight: '1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                Information Sharing and Disclosure
              </h2>
            </div>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            
            <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
              <li><strong>Service Providers:</strong> Trusted third-party companies that help us operate our business (payment processors, shipping companies, email service providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of business assets</li>
              <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of Leafy Mart, our users, or others</li>
            </ul>
          </section>

          {/* Data Security */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Shield size={30} color="#43a047" style={{ marginRight: '1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                Data Security
              </h2>
            </div>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              We implement appropriate technical and organizational security measures to protect your personal information:
            </p>
            
            <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing through certified providers</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and employee training</li>
              <li>Data backup and recovery procedures</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              Your Rights and Choices
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                You have the right to:
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>Access and review your personal information</li>
                <li>Update or correct inaccurate information</li>
                <li>Delete your account and personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Lodge a complaint with relevant authorities</li>
              </ul>
            </div>

            <div style={{ 
              background: '#f8f9fa', 
              padding: '1.5rem', 
              borderRadius: '8px',
              border: '2px solid #e9ecef'
            }}>
              <p style={{ fontSize: '1rem', color: '#333', margin: 0 }}>
                <strong>To exercise these rights, contact us at:</strong> privacy@leafymart.lk or +94 77 123 4567
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              Cookies and Tracking Technologies
            </h2>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, 
              and personalize content. You can control cookies through your browser settings.
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '0.5rem' }}>
                Types of cookies we use:
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li><strong>Essential cookies:</strong> Required for website functionality</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              Third-Party Services
            </h2>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              Our website may contain links to third-party websites or integrate with third-party services. 
              We are not responsible for the privacy practices of these external sites.
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '0.5rem' }}>
                Third-party services we use:
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>Payment processors (PayHere, Visa, MasterCard)</li>
                <li>Shipping and logistics partners</li>
                <li>Email marketing platforms</li>
                <li>Analytics services (Google Analytics)</li>
                <li>Social media platforms</li>
              </ul>
            </div>
          </section>

          {/* Data Retention */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              Data Retention
            </h2>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              We retain your personal information only as long as necessary to:
            </p>
            
            <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Provide our services and support</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Improve our services and user experience</li>
            </ul>

            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333' }}>
              Account information is typically retained for 3 years after account closure. 
              Transaction records may be kept longer as required by Sri Lankan law.
            </p>
          </section>

          {/* Policy Updates */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <AlertCircle size={30} color="#ff9800" style={{ marginRight: '1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                Policy Updates
              </h2>
            </div>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              We may update this privacy policy from time to time to reflect changes in our practices, 
              technology, legal requirements, or other factors.
            </p>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333' }}>
              We will notify you of significant changes by email or through a prominent notice on our website. 
              Your continued use of our services after such modifications constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section style={{ 
            background: 'linear-gradient(135deg, #2e7d32, #43a047)',
            color: '#fff',
            padding: '3rem', 
            borderRadius: '16px', 
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justify: 'center', marginBottom: '1.5rem' }}>
              <Phone size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Questions About This Policy?
            </h2>
            
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
              If you have questions about this privacy policy or how we handle your personal information, 
              please contact us:
            </p>
            
            <div style={{ fontSize: '1rem', marginBottom: '2rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Email:</strong> privacy@leafymart.lk
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Phone:</strong> +94 77 123 4567
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Address:</strong> 123 Galle Road, Colombo 03, Sri Lanka
              </p>
            </div>

            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              We will respond to your inquiry within 30 days
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
