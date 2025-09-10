import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, AlertTriangle, Scale, CreditCard, Truck, RefreshCw } from 'lucide-react';

const Terms = () => {
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
          <Scale size={60} style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Please read these terms carefully before using our services
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '1rem' }}>
            Last updated: September 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Agreement to Terms */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              1. Agreement to Terms
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              By accessing and using the Leafy Mart website and services, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, please do 
              not use this service.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
              These terms apply to all visitors, users, and others who access or use our service.
            </p>
          </section>

          {/* Use License */}
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
                2. Use License
              </h2>
            </div>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              Permission is granted to temporarily download one copy of the materials on Leafy Mart's website 
              for personal, non-commercial transitory viewing only.
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                This license shall automatically terminate if you violate any of these restrictions:
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on our website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
          </section>

          {/* Account Terms */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              3. Account Terms
            </h2>
            
            <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>You must be 18 years or older to use this service</li>
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account and password</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
              <li>We reserve the right to terminate accounts that violate these terms</li>
            </ul>
          </section>

          {/* Orders and Payments */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <CreditCard size={30} color="#43a047" style={{ marginRight: '1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                4. Orders and Payments
              </h2>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                Order Processing
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>All orders are subject to availability and confirmation</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Prices are subject to change without notice</li>
                <li>All prices are in Sri Lankan Rupees (LKR) unless stated otherwise</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                Payment Terms
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>Payment must be made at the time of order placement or upon delivery</li>
                <li>We accept cash on delivery, bank transfers, and credit/debit cards</li>
                <li>All payments are processed securely through certified payment gateways</li>
                <li>You authorize us to charge your chosen payment method for all orders</li>
              </ul>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Truck size={30} color="#43a047" style={{ marginRight: '1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                5. Shipping and Delivery
              </h2>
            </div>
            
            <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li>Delivery timeframes are estimates and not guaranteed</li>
              <li>Risk of loss and title for items pass to you upon delivery</li>
              <li>We are not liable for delays caused by shipping partners or circumstances beyond our control</li>
              <li>Delivery charges apply based on location and order value</li>
              <li>You must provide accurate delivery information</li>
              <li>Someone must be present to receive the delivery</li>
            </ul>

            <div style={{ 
              background: '#fff3cd', 
              padding: '1.5rem', 
              borderRadius: '8px',
              border: '2px solid #ffeaa7',
              marginTop: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <AlertTriangle size={20} color="#856404" style={{ marginRight: '0.5rem' }} />
                <strong style={{ color: '#856404' }}>Important Note:</strong>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#856404', margin: 0 }}>
                Plants are living organisms. We cannot guarantee their survival after delivery as it depends on 
                care, environmental conditions, and other factors beyond our control.
              </p>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <RefreshCw size={30} color="#43a047" style={{ marginRight: '1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                6. Returns and Refunds
              </h2>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                Return Policy
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>Plants can be returned within 7 days if they arrive damaged or diseased</li>
                <li>Returns must be reported within 24 hours of delivery</li>
                <li>Photos must be provided as evidence of damage or disease</li>
                <li>Plants that die due to customer care issues are not eligible for return</li>
                <li>Accessories and pots can be returned within 14 days if unopened</li>
              </ul>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                Refund Policy
              </h3>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>Refunds are processed within 7-14 business days</li>
                <li>Refunds are issued to the original payment method</li>
                <li>Shipping charges are non-refundable unless the error was ours</li>
                <li>We reserve the right to inspect returned items before processing refunds</li>
              </ul>
            </div>
          </section>

          {/* Plant Care Disclaimer */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              7. Plant Care and Disclaimers
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                Plant Care Responsibility
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1rem' }}>
                By purchasing plants from Leafy Mart, you acknowledge that:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
                <li>Plants are living organisms that require proper care</li>
                <li>Survival depends on appropriate watering, lighting, and environmental conditions</li>
                <li>We provide care instructions but cannot guarantee plant survival</li>
                <li>Some plants may experience shock or leaf drop during transport (this is normal)</li>
                <li>Results may vary based on local climate and care conditions</li>
              </ul>
            </div>

            <div style={{ 
              background: '#d1ecf1', 
              padding: '1.5rem', 
              borderRadius: '8px',
              border: '2px solid #bee5eb'
            }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0c5460', marginBottom: '0.5rem' }}>
                Free Plant Care Support
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#0c5460', margin: 0 }}>
                We offer free plant care consultation via phone and WhatsApp to help you succeed with your plants!
              </p>
            </div>
          </section>

          {/* Prohibited Uses */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <AlertTriangle size={30} color="#dc3545" style={{ marginRight: '1rem' }} />
              <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                8. Prohibited Uses
              </h2>
            </div>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              You may not use our service:
            </p>
            
            <ul style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', paddingLeft: '1.5rem' }}>
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations or laws</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              9. Limitation of Liability
            </h2>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              In no event shall Leafy Mart, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use 
              of the service.
            </p>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333' }}>
              Our maximum liability for any claim is limited to the amount you paid for the specific product or service.
            </p>
          </section>

          {/* Governing Law */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              10. Governing Law
            </h2>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              These terms and conditions are governed by and construed in accordance with the laws of Sri Lanka. 
              You irrevocably submit to the exclusive jurisdiction of the courts in Colombo, Sri Lanka.
            </p>
          </section>

          {/* Changes to Terms */}
          <section style={{ 
            background: '#fff', 
            padding: '3rem', 
            borderRadius: '16px', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1.5rem' }}>
              11. Changes to Terms
            </h2>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            
            <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333' }}>
              Your continued use of the service after the effective date of the revised Terms constitutes 
              acceptance of the changes.
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
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              Questions About These Terms?
            </h2>
            
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem' }}>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            
            <div style={{ fontSize: '1rem', marginBottom: '2rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Email:</strong> legal@leafymart.lk
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Phone:</strong> +94 77 123 4567
              </p>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Address:</strong> 123 Galle Road, Colombo 03, Sri Lanka
              </p>
            </div>

            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
              Business Hours: Monday-Saturday, 8:00 AM - 6:00 PM
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
