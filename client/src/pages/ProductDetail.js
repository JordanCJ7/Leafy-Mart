import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingCart, Heart, Tag } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  // Hooks must be called unconditionally. Initialize cart and wishlist
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'));

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <p>The product you are looking for does not exist.</p>
          <Link to="/">Go back home</Link>
        </main>
        <Footer />
      </div>
    );
  }

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

  const inWishlist = product ? wishlist.includes(product.id) : false;

  return (
    <div style={{ background: '#f1faee', minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 50%' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: 12, border: '1px solid #e0e0e0' }} />
          </div>
          <div style={{ flex: '1 1 50%' }}>
            <h1 style={{ color: '#2e7d32' }}>{product.name}</h1>
            <div style={{ color: '#43a047', fontWeight: 700, fontSize: '1.25rem', marginBottom: 12 }}>{product.priceDisplay}</div>
            <div style={{ marginBottom: 12 }}>{product.category} · {product.tags.join(', ')}</div>
            <div style={{ marginBottom: 12 }}>{product.desc}</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 20, background: product.stock>0? '#e8f5e9' : '#fff0f0' }}>
                <Tag size={16} color={product.stock>0? '#2e7d32' : '#d32f2f'} />
                <span style={{ color: product.stock>0? '#2e7d32' : '#d32f2f', fontWeight: 700 }}>{product.stock}</span>
              </div>
              <button onClick={() => toggleWishlist(product.id)} style={{ background: inWishlist? '#ffdcd2' : '#fff', border: '1px solid #e0e0e0', padding: 8, borderRadius: 8, cursor: 'pointer' }} title="Toggle wishlist">
                <Heart size={18} color={inWishlist? '#d32f2f' : '#388e3c'} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => addToCart(product)} disabled={product.stock<=0} style={{ padding: '0.75rem 1rem', background: product.stock>0? '#43a047' : '#bdbdbd', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <Link to="/" style={{ padding: '0.75rem 1rem', background: '#e0e0e0', color: '#2e7d32', borderRadius: 8, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Back</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
