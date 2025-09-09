import React, { useState, useEffect, useMemo } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import products from '../data/products';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Tag } from 'lucide-react';

export default function Home() {
	const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
	const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'));

	// Search and category filter
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('All');

	const categories = useMemo(() => {
		const setCats = new Set(products.map(p => p.category));
		return ['All', ...Array.from(setCats)];
	}, []);

	const filteredProducts = useMemo(() => {
		const q = search.trim().toLowerCase();
		return products.filter(p => {
			if (category !== 'All' && p.category !== category) return false;
			if (!q) return true;
			if (p.name.toLowerCase().includes(q)) return true;
			if (p.tags.join(' ').toLowerCase().includes(q)) return true;
			if ((p.desc || '').toLowerCase().includes(q)) return true;
			return false;
		});
	}, [search, category]);

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
			<main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
				<h2 style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 700, color: '#388e3c', marginBottom: '0.5rem' }}>
					Find Your New Green Friend
				</h2>
				<p style={{ textAlign: 'center', color: '#388e3c', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
					Browse our curated selection of beautiful and healthy houseplants.
				</p>
				<div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: '2rem', flexWrap: 'wrap' }}>
					<input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search for plants..." style={{ width: 320, padding: '0.75rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1rem' }} />
					<select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '0.75rem', borderRadius: 8, border: '1px solid #a5d6a7', fontSize: '1rem', background: '#fff' }}>
						{categories.map(c => <option key={c} value={c}>{c}</option>)}
					</select>
				</div>
				<div style={{ 
					display: 'grid', 
					/* show 4 items per row on wide screens; wrap naturally on smaller screens */
					gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))', 
					gap: '2rem',
					alignItems: 'start',
					justifyContent: 'center',
					maxWidth: '1200px',
					margin: '0 auto'
				}}>
				{filteredProducts.length === 0 ? (
						<div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666' }}>No products found.</div>
					) : filteredProducts.map((p) => {
						const inWishlist = wishlist.includes(p.id);
					return (
					<div key={p.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(56,142,60,0.08)', overflow: 'hidden', border: '1px solid #e0e0e0', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
						<Link to={`/product/${p.id}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
							<div style={{ height: 200, overflow: 'hidden' }}>
								<img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
							</div>
						</Link>
						<button onClick={() => toggleWishlist(p.id)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', border: 'none', fontSize: 18, color: inWishlist? '#d32f2f' : '#388e3c', cursor: 'pointer', padding: 6, borderRadius: 6 }} title="Toggle wishlist">
							<Heart size={18} />
						</button>
						<div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
							<div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#388e3c', marginBottom: 4 }}>{p.name}</div>
							<div style={{ color: '#43a047', fontWeight: 600, marginBottom: 8 }}>{p.priceDisplay}</div>
							<div style={{ color: '#555', fontSize: '0.98rem', marginBottom: 16 }}>{p.desc}</div>
							<div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
								<div style={{ color: '#777', fontSize: '0.95rem' }}>{p.category} · {p.tags.slice(0,2).join(', ')}</div>
								<div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 8px', borderRadius: 20, background: p.stock>0? '#e8f5e9' : '#fff0f0' }}>
									<Tag size={14} color={p.stock>0? '#2e7d32' : '#d32f2f'} />
									<span style={{ color: p.stock>0? '#2e7d32' : '#d32f2f', fontWeight: 700 }}>{p.stock}</span>
								</div>
							</div>
							<button onClick={() => addToCart(p)} disabled={p.stock<=0} style={{ width: '100%', marginTop: 'auto', padding: '0.75rem', background: p.stock>0? '#43a047' : '#bdbdbd', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: p.stock>0? 'pointer' : 'not-allowed', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
								<ShoppingCart size={16} /> Add to Cart
							</button>
						</div>
					</div>
					)
					})}
				</div>
			</main>
			<Footer />
		</div>
	);
}
