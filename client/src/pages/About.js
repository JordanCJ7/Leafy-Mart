import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Leaf, Users, Award, Heart, Shield, Truck, Star, Globe } from 'lucide-react';

const About = () => {
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
            About Leafy Mart
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Bringing nature closer to Sri Lankan homes with premium plants and expert care guidance
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Our Story Section */}
          <section style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#2e7d32', marginBottom: '1.5rem' }}>
                  Our Story
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '1.5rem' }}>
                  Founded in 2020 in the heart of Colombo, Leafy Mart began as a small passion project to make 
                  premium plants accessible to every Sri Lankan home. What started as a local plant nursery has 
                  grown into Sri Lanka's leading online plant store.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
                  We believe that every space deserves the beauty and benefits of plants. From busy apartments in 
                  Colombo to family homes in Kandy, we've made it our mission to bring nature closer to you with 
                  carefully selected plants and expert guidance.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #43a047, #66bb6a)',
                  borderRadius: '20px',
                  padding: '3rem',
                  color: '#fff'
                }}>
                  <Leaf size={60} style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontSize: '2rem', fontWeight: 600 }}>10,000+</h3>
                  <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Happy Plant Parents</p>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div style={{
                background: '#fff',
                padding: '3rem',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <Heart size={40} color="#e91e63" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                  Our Mission
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#555' }}>
                  To make plant parenting accessible, enjoyable, and successful for everyone in Sri Lanka, 
                  while promoting sustainable living and environmental consciousness.
                </p>
              </div>
              <div style={{
                background: '#fff',
                padding: '3rem',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <Globe size={40} color="#2196f3" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#2e7d32', marginBottom: '1rem' }}>
                  Our Vision
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#555' }}>
                  To be Sri Lanka's most trusted plant destination, creating greener homes and healthier 
                  communities while preserving our island's natural heritage.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 700, 
              color: '#2e7d32', 
              textAlign: 'center', 
              marginBottom: '3rem' 
            }}>
              Our Values
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
              {[
                {
                  icon: <Leaf size={30} />,
                  title: 'Quality First',
                  description: 'Every plant is carefully selected and nurtured before reaching your doorstep'
                },
                {
                  icon: <Users size={30} />,
                  title: 'Community Focus',
                  description: 'Building a community of plant lovers across Sri Lanka with shared knowledge'
                },
                {
                  icon: <Shield size={30} />,
                  title: 'Trust & Reliability',
                  description: 'Transparent pricing, genuine products, and dependable service you can count on'
                },
                {
                  icon: <Award size={30} />,
                  title: 'Expert Guidance',
                  description: 'Professional plant care advice tailored to Sri Lankan climate and conditions'
                }
              ].map((value, index) => (
                <div key={index} style={{
                  background: '#fff',
                  padding: '2rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ color: '#43a047', marginBottom: '1rem' }}>
                    {value.icon}
                  </div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2e7d32', marginBottom: '0.8rem' }}>
                    {value.title}
                  </h4>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#666' }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 700, 
              color: '#2e7d32', 
              textAlign: 'center', 
              marginBottom: '3rem' 
            }}>
              Our Team
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {[
                {
                  name: 'Sandun Wickramasinghe',
                  role: 'Founder & CEO',
                  description: 'Horticulturist with 15+ years experience in tropical plants'
                },
                {
                  name: 'Nimal Rodrigo',
                  role: 'Head of Plant Care',
                  description: 'Expert in Sri Lankan native plants and sustainable gardening'
                },
                {
                  name: 'Chamari Silva',
                  role: 'Customer Experience Manager',
                  description: 'Ensuring every customer receives the best plant parenting support'
                }
              ].map((member, index) => (
                <div key={index} style={{
                  background: '#fff',
                  padding: '2.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #43a047, #66bb6a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto'
                  }}>
                    <Users size={30} color="#fff" />
                  </div>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2e7d32', marginBottom: '0.5rem' }}>
                    {member.name}
                  </h4>
                  <p style={{ fontSize: '1rem', color: '#43a047', fontWeight: 500, marginBottom: '1rem' }}>
                    {member.role}
                  </p>
                  <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#666' }}>
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section style={{
            background: 'linear-gradient(135deg, #2e7d32, #43a047)',
            color: '#fff',
            padding: '3rem',
            borderRadius: '20px',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
              {[
                { number: '10,000+', label: 'Happy Customers' },
                { number: '500+', label: 'Plant Varieties' },
                { number: '25+', label: 'Districts Served' },
                { number: '98%', label: 'Customer Satisfaction' }
              ].map((stat, index) => (
                <div key={index}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
