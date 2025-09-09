import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import products from '../data/products';
import { ShoppingCart, Heart, Tag, Star, Shield, Truck, Leaf, Users, Award, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import './Home.css';

export default function Home() {
	const navigate = useNavigate();
	const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
	const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'));

	const categories = useMemo(() => {
		const setCats = new Set(products.map(p => p.category));
		return ['All', ...Array.from(setCats)];
	}, []);

	useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
	useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);

	const addToCart = (product) => {
		setCart(prev => {
			const exists = prev.find(p => p.id === product.id);
			if (exists) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
			return [...prev, { ...product, qty: 1 }];
		});
	};

	const toggleWishlist = (id) => {
		setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
	};

	return (
		<div style={{ background: '#f1faee', minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
			<Navbar />
			
			{/* Hero Section */}
			<section style={{ 
				background: 'linear-gradient(135deg, #2e7d32 0%, #43a047 50%, #66bb6a 100%)',
				color: '#fff',
				padding: '4rem 1rem',
				textAlign: 'center',
				position: 'relative',
				overflow: 'hidden'
			}}>
				<div style={{ 
					position: 'absolute', 
					top: 0, 
					left: 0, 
					right: 0, 
					bottom: 0, 
					background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,128C960,139,1056,149,1152,133.3C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>')`,
					backgroundSize: 'cover',
					backgroundPosition: 'bottom'
				}}></div>
				<div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }} className="hero-title">
						<Sparkles size={32} style={{ marginRight: '12px', color: '#a5d6a7' }} />
						<h1 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
							Botanica Hub
						</h1>
						<Sparkles size={32} style={{ marginLeft: '12px', color: '#a5d6a7' }} />
					</div>
					<p style={{ fontSize: '1.4rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem', opacity: 0.95, fontWeight: 300 }} className="hero-subtitle">
						Transform your space into a green paradise with our premium collection of healthy, beautiful plants
					</p>
					<div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="hero-buttons">
						<Link to="/products" style={{ 
							background: '#fff', 
							color: '#2e7d32', 
							padding: '1rem 2rem', 
							borderRadius: '50px', 
							textDecoration: 'none',
							fontWeight: 700,
							fontSize: '1.1rem',
							display: 'inline-flex',
							alignItems: 'center',
							gap: '8px',
							boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
							transition: 'transform 0.3s ease'
						}} className="cta-button-primary">
							Shop Now <ArrowRight size={20} />
						</Link>
						<button style={{ 
							background: 'transparent', 
							color: '#fff', 
							border: '2px solid #fff',
							padding: '1rem 2rem', 
							borderRadius: '50px',
							fontWeight: 700,
							fontSize: '1.1rem',
							cursor: 'pointer',
							display: 'inline-flex',
							alignItems: 'center',
							gap: '8px',
							transition: 'all 0.3s ease'
						}} className="cta-button-secondary">
							Learn More
						</button>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section style={{ padding: '4rem 1rem', background: '#fff' }}>
				<div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
					<h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2e7d32', marginBottom: '1rem' }}>
						Why Choose Botanica Hub?
					</h2>
					<p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
						We're committed to bringing you the finest plants with exceptional service
					</p>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }} className="feature-grid">
						{[
							{ icon: <Shield size={48} />, title: 'Quality Guarantee', desc: 'Every plant comes with our 30-day health guarantee' },
							{ icon: <Truck size={48} />, title: 'Fast Delivery', desc: 'Free delivery within 2-3 days across the island' },
							{ icon: <Award size={48} />, title: 'Expert Care', desc: 'Professional guidance and plant care support' },
							{ icon: <Users size={48} />, title: 'Community', desc: 'Join thousands of happy plant parents' },
							{ icon: <Leaf size={48} />, title: 'Eco-Friendly', desc: 'Sustainable packaging and eco-conscious practices' },
							{ icon: <Sparkles size={48} />, title: 'Fresh Stock', desc: 'Weekly fresh arrivals directly from our nursery' }
						].map((feature, i) => (
							<div key={i} style={{ 
								background: '#f8f9fa', 
								padding: '2.5rem 1.5rem', 
								borderRadius: '16px',
								border: '1px solid #e9ecef',
								transition: 'transform 0.3s ease, box-shadow 0.3s ease'
							}} className="feature-card">
								<div style={{ color: '#43a047', marginBottom: '1rem' }} className="feature-icon">{feature.icon}</div>
								<h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#2e7d32', marginBottom: '0.5rem' }}>
									{feature.title}
								</h3>
								<p style={{ color: '#666', lineHeight: 1.6 }}>{feature.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Statistics Section */}
			<section style={{ 
				background: 'linear-gradient(45deg, #e8f5e9, #f1faee)', 
				padding: '3rem 1rem' 
			}}>
				<div style={{ maxWidth: '1200px', margin: '0 auto' }}>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
						{[
							{ number: '10,000+', label: 'Happy Customers' },
							{ number: '500+', label: 'Plant Varieties' },
							{ number: '99%', label: 'Survival Rate' },
							{ number: '24/7', label: 'Plant Support' }
						].map((stat, i) => (
							<div key={i} style={{ padding: '1rem' }}>
								<div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2e7d32', marginBottom: '0.5rem' }} className="stat-number">
									{stat.number}
								</div>
								<div style={{ color: '#666', fontSize: '1.1rem', fontWeight: 600 }}>
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Product Categories */}
			<section id="categories" style={{ padding: '4rem 1rem', background: '#fff' }}>
				<div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
					<h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2e7d32', marginBottom: '1rem' }}>
						Shop by Category
					</h2>
					<p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '3rem' }}>
						Find the perfect plants for your space and lifestyle
					</p>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }} className="category-grid">
						{categories.slice(1).map(cat => {
							const categoryProducts = products.filter(p => p.category === cat);
							const sampleProduct = categoryProducts[0];
							return (
								<div key={cat} style={{ 
									background: '#f8f9fa', 
									borderRadius: '16px', 
									overflow: 'hidden',
									border: '1px solid #e9ecef',
									transition: 'transform 0.3s ease, box-shadow 0.3s ease',
									cursor: 'pointer'
								}}
								onClick={() => navigate('/products')}
								className="category-card"
								>
									{sampleProduct && (
										<div style={{ height: '200px', overflow: 'hidden' }}>
											<img src={sampleProduct.img} alt={cat} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} />
										</div>
									)}
									<div style={{ padding: '1.5rem' }}>
										<h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#2e7d32', marginBottom: '0.5rem' }}>
											{cat}
										</h3>
										<p style={{ color: '#666', marginBottom: '1rem' }}>
											{categoryProducts.length} varieties available
										</p>
										<div style={{ 
											color: '#43a047', 
											fontWeight: 600,
											display: 'inline-flex',
											alignItems: 'center',
											gap: '4px'
										}}>
											Explore <ArrowRight size={16} />
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section style={{ 
				background: 'linear-gradient(135deg, #2e7d32, #43a047)', 
				color: '#fff', 
				padding: '4rem 1rem' 
			}}>
				<div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
					<h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3rem' }}>
						What Our Customers Say
					</h2>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
						{[
							{ name: 'Priya Sharma', text: 'Amazing quality plants! My snake plant is thriving after 6 months.', rating: 5 },
							{ name: 'Rajesh Kumar', text: 'Fast delivery and excellent packaging. Highly recommended!', rating: 5 },
							{ name: 'Anjali Patel', text: 'The plant care guidance is invaluable. Great customer service!', rating: 5 }
						].map((review, i) => (
							<div key={i} style={{ 
								background: 'rgba(255,255,255,0.1)', 
								padding: '2rem', 
								borderRadius: '16px',
								backdropFilter: 'blur(10px)'
							}} className="testimonial-card">
								<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
									{[...Array(review.rating)].map((_, j) => (
										<Star key={j} size={20} fill="#ffd700" color="#ffd700" />
									))}
								</div>
								<p style={{ fontSize: '1.1rem', marginBottom: '1rem', fontStyle: 'italic' }}>
									"{review.text}"
								</p>
								<p style={{ fontWeight: 600, opacity: 0.9 }}>
									- {review.name}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
