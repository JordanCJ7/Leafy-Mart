import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const products = [
	{
		name: 'Monstera Deliciosa',
		price: '$35.00',
		desc: 'A classic, easy-to-care-for houseplant with iconic split leaves.',
		img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
	},
	{
		name: 'Fiddle Leaf Fig',
		price: '$55.00',
		desc: 'A stylish and popular plant with large, violin-shaped leaves.',
		img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
	},
	{
		name: 'Snake Plant',
		price: '$25.00',
		desc: 'Extremely resilient and perfect for beginners. Great for air purification.',
		img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80',
	},
	{
		name: 'Pothos',
		price: '$18.00',
		desc: 'A trailing plant that thrives in low light and is easy to propagate.',
		img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
	},
	{
		name: 'ZZ Plant',
		price: '$30.00',
		desc: 'Tolerates neglect and low light. Perfect for busy plant lovers.',
		img: 'https://images.unsplash.com/photo-1465101178521-c1a4c8a0a8b7?auto=format&fit=crop&w=400&q=80',
	},
	{
		name: 'Calathea Orbifolia',
		price: '$40.00',
		desc: 'Striking foliage with silvery stripes. Loves humidity.',
		img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
	},
];

export default function Home() {
	return (
		<div style={{ background: '#f1faee', minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
			<Navbar />
			<main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
				<h2 style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 700, color: '#388e3c', marginBottom: '0.5rem' }}>
					Find Your New Green Friend
				</h2>
				<p style={{ textAlign: 'center', color: '#388e3c', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
					Browse our curated selection of beautiful and healthy houseplants.
				</p>
				<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
					<input type="text" placeholder="Search for plants..." style={{ width: 320, padding: '0.75rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1rem' }} />
				</div>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
					{products.map((p, idx) => (
						<div key={idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(56,142,60,0.08)', overflow: 'hidden', border: '1px solid #e0e0e0', position: 'relative' }}>
							<img src={p.img} alt={p.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
							<button style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, color: '#388e3c', cursor: 'pointer' }} title="Add to wishlist">♡</button>
							<div style={{ padding: '1.25rem' }}>
								<div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#388e3c', marginBottom: 4 }}>{p.name}</div>
								<div style={{ color: '#43a047', fontWeight: 600, marginBottom: 8 }}>{p.price}</div>
								<div style={{ color: '#555', fontSize: '0.98rem', marginBottom: 16 }}>{p.desc}</div>
								<button style={{ width: '100%', padding: '0.75rem', background: '#43a047', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
									<span role="img" aria-label="cart" style={{ marginRight: 8 }}>🛒</span>Add to Cart
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
}
