import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp, Search, Leaf, Truck, Shield, CreditCard, MessageCircle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      category: 'Orders & Shipping',
      icon: <Truck size={24} />,
      questions: [
        {
          question: 'How long does delivery take?',
          answer: 'We deliver within 2-3 business days in Colombo and suburbs. For other areas in Sri Lanka, delivery takes 3-5 business days. Express delivery is available for urgent orders.'
        },
        {
          question: 'Do you deliver island-wide?',
          answer: 'Yes! We deliver to all 25 districts in Sri Lanka. Delivery charges vary based on location. Free delivery for orders above Rs. 5,000 within Colombo.'
        },
        {
          question: 'How are plants packaged for shipping?',
          answer: 'Our plants are carefully packed in eco-friendly materials with proper ventilation and moisture control to ensure they arrive in perfect condition.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes, you will receive a tracking number via SMS and email once your order is dispatched. You can track your order in real-time.'
        }
      ]
    },
    {
      category: 'Plant Care',
      icon: <Leaf size={24} />,
      questions: [
        {
          question: 'I\'m a beginner. Which plants should I start with?',
          answer: 'We recommend starting with low-maintenance plants like Snake Plants, Pothos, ZZ Plants, or Peace Lilies. These are perfect for beginners and thrive in Sri Lankan conditions.'
        },
        {
          question: 'How often should I water my plants?',
          answer: 'Watering frequency depends on the plant type, season, and humidity. Generally, most houseplants need watering when the top inch of soil feels dry. We provide specific care instructions with each plant.'
        },
        {
          question: 'My plant leaves are turning yellow. What should I do?',
          answer: 'Yellow leaves can indicate overwatering, underwatering, or nutrient deficiency. Check the soil moisture and adjust watering. Contact our plant care experts for personalized advice.'
        },
        {
          question: 'Do you provide plant care consultation?',
          answer: 'Yes! We offer free plant care consultation via WhatsApp and phone. Our experts can help diagnose plant issues and provide care guidance.'
        }
      ]
    },
    {
      category: 'Payment & Pricing',
      icon: <CreditCard size={24} />,
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept cash on delivery, bank transfers, credit/debit cards (Visa, MasterCard), and mobile payments (eZ Cash, mCash). Online payments are processed securely.'
        },
        {
          question: 'Are there any additional charges?',
          answer: 'The price you see includes the plant and basic care instructions. Delivery charges apply based on location. No hidden fees!'
        },
        {
          question: 'Do you offer discounts for bulk orders?',
          answer: 'Yes, we offer attractive discounts for bulk orders (10+ plants), corporate orders, and landscaping projects. Contact us for a custom quote.'
        },
        {
          question: 'Can I get a refund if my plant arrives damaged?',
          answer: 'Absolutely! We offer a 7-day replacement guarantee. If your plant arrives damaged or dies within 7 days, we\'ll replace it free of charge.'
        }
      ]
    },
    {
      category: 'Products & Availability',
      icon: <Shield size={24} />,
      questions: [
        {
          question: 'Are your plants locally grown?',
          answer: 'Yes, most of our plants are grown in Sri Lanka under controlled conditions. Some rare varieties are imported from certified nurseries and properly acclimatized.'
        },
        {
          question: 'Do you have plants suitable for Sri Lankan climate?',
          answer: 'All our plants are selected and tested for Sri Lankan tropical climate. We provide location-specific care guides for coastal, hill country, and dry zone conditions.'
        },
        {
          question: 'Can I pre-order plants that are out of stock?',
          answer: 'Yes, you can pre-order out-of-stock plants. We\'ll notify you when they\'re available and reserve your plant for 48 hours.'
        },
        {
          question: 'Do you sell plant accessories like pots and fertilizers?',
          answer: 'Yes, we offer a wide range of decorative pots, fertilizers, plant care tools, and accessories. Check our accessories section for the complete range.'
        }
      ]
    },
    {
      category: 'Account & Support',
      icon: <MessageCircle size={24} />,
      questions: [
        {
          question: 'Do I need to create an account to place an order?',
          answer: 'While you can browse without an account, creating one allows you to track orders, save favorites, and get personalized plant recommendations.'
        },
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach us via WhatsApp (+94 77 123 4567), email (info@leafymart.lk), or phone during business hours (8 AM - 6 PM, Mon-Sat).'
        },
        {
          question: 'Can I cancel or modify my order?',
          answer: 'Orders can be cancelled or modified within 2 hours of placement. After that, please contact customer support as some changes may not be possible if the order is being prepared.'
        },
        {
          question: 'Do you have a physical store I can visit?',
          answer: 'Yes, our showroom is located at 123 Galle Road, Colombo 03. Visit us to see plants in person and get expert advice from our team.'
        }
      ]
    }
  ];

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
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
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Find answers to common questions about plants, orders, and our services
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section style={{ padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#666' 
              }} 
            />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                border: '2px solid #e0e0e0',
                borderRadius: '50px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <main style={{ flex: 1, padding: '2rem 1rem 4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {searchTerm && (
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', color: '#666' }}>
                {filteredFAQs.reduce((total, category) => total + category.questions.length, 0)} 
                {' '}results found for "{searchTerm}"
              </p>
            </div>
          )}

          {filteredFAQs.map((category, categoryIndex) => (
            <div key={categoryIndex} style={{ marginBottom: '3rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1rem',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}>
                <div style={{ color: '#43a047', marginRight: '1rem' }}>
                  {category.icon}
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#2e7d32', margin: 0 }}>
                  {category.category}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {category.questions.map((faq, questionIndex) => {
                  const isOpen = openFAQ === `${categoryIndex}-${questionIndex}`;
                  return (
                    <div
                      key={questionIndex}
                      style={{
                        background: '#fff',
                        borderRadius: '12px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        style={{
                          width: '100%',
                          padding: '1.5rem',
                          border: 'none',
                          background: 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: '#2e7d32'
                        }}
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp size={20} style={{ color: '#43a047', flexShrink: 0 }} />
                        ) : (
                          <ChevronDown size={20} style={{ color: '#43a047', flexShrink: 0 }} />
                        )}
                      </button>
                      {isOpen && (
                        <div style={{
                          padding: '0 1.5rem 1.5rem 1.5rem',
                          borderTop: '1px solid #f0f0f0'
                        }}>
                          <p style={{
                            fontSize: '1rem',
                            lineHeight: '1.7',
                            color: '#555',
                            margin: '1rem 0 0 0'
                          }}>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredFAQs.length === 0 && searchTerm && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <Leaf size={60} color="#43a047" style={{ marginBottom: '2rem' }} />
              <h3 style={{ fontSize: '1.5rem', color: '#2e7d32', marginBottom: '1rem' }}>
                No results found
              </h3>
              <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem' }}>
                Try different keywords or browse our categories above
              </p>
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'linear-gradient(135deg, #43a047, #66bb6a)',
                  color: '#fff',
                  padding: '0.8rem 2rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Still Need Help Section */}
          <section style={{
            background: 'linear-gradient(135deg, #2e7d32, #43a047)',
            color: '#fff',
            padding: '3rem',
            borderRadius: '16px',
            marginTop: '4rem',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
              Still Need Help?
            </h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
              Can't find the answer you're looking for? Our plant experts are here to help!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="/contact"
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
                Contact Us
              </a>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'transform 0.2s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <MessageCircle size={18} />
                WhatsApp Chat
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
