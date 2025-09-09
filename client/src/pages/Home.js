import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const products = [
	{
		name: 'Tulsi (Holy Basil)',
		price: '$8.00',
		desc: 'Sacred and medicinal herb common across South Asia — useful in teas and rituals. Thrives in warm sunny spots and regular watering.',
		img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
	},
	{
		name: 'Money Plant (Pothos)',
		price: '$12.00',
		desc: 'Hardy trailing vine ideal for indoors and balconies. Low light tolerant and very easy to propagate from cuttings.',
		img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
	},
	{
		name: 'Snake Plant (Sansevieria)',
		price: '$20.00',
		desc: 'Very resilient air-purifying plant; tolerates low light and irregular watering — perfect for busy households.',
		img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
	},
	{
		name: 'Areca Palm',
		price: '$45.00',
		desc: 'Popular indoor palm in South Asia — bright indirect light and regular humidity keep it happy; great for living rooms and offices.',
		img: 'https://images.unsplash.com/photo-1501004318641-1d3d7f8a1b6a?auto=format&fit=crop&w=800&q=80',
	},
	{
		name: 'Hibiscus (Gulabo)',
		price: '$15.00',
		desc: 'Flowering shrub commonly grown for its bright blooms; thrives in warm climates with full sun and regular watering.',
		img: 'https://images.unsplash.com/photo-1501004318641-2b8f7a3c3c3e?auto=format&fit=crop&w=800&q=80',
	},
	{
		name: 'Peace Lily',
		price: '$22.00',
		desc: 'Compact, shade-tolerant plant with elegant white blooms; prefers consistent moisture and bright, indirect light.',
		img: 'https://images.unsplash.com/photo-1524594154909-07b6d4b0b6d5?auto=format&fit=crop&w=800&q=80',
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
				<div style={{ 
					display: 'grid', 
					gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
					gap: '2rem',
					maxWidth: '1000px',
					margin: '0 auto'
				}}>
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
