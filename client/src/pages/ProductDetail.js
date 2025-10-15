import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import { getProductById } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { ShoppingCart, Heart, Tag, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use contexts for cart and wishlist functionality
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  
  // Local state for feedback messages
  const [addedToCart, setAddedToCart] = useState(false);
  const [toggledWishlist, setToggledWishlist] = useState(false);

  // Effect for feedback messages
  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  useEffect(() => {
    if (toggledWishlist) {
      const timer = setTimeout(() => setToggledWishlist(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [toggledWishlist]);

  useEffect(() => {
    let mounted = true;

    const local = products.find(p => p.id === id);
    if (local) {
      setProduct(local);
      setLoading(false);
      return () => { mounted = false; };
    }

    // If not in local catalogue, try fetching from API
    (async () => {
      try {
        setLoading(true);
        const res = await getProductById(id);
        if (!mounted) return;
        if (res && !res.error) {
          setProduct(res);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        if (mounted) setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h2>Loading product…</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <main style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <p>The product you are looking for does not exist.</p>
          <Link to="/products" style={{ color: '#43a047', textDecoration: 'none' }}>
            ← Back to Products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
  };

  const handleToggleWishlist = () => {
    toggleWishlistItem(product);
    setToggledWishlist(true);
  };

  const inWishlist = isInWishlist(product.id);
  const itemQuantity = getItemQuantity(product.id);

  return (
    <div style={{ background: '#f1faee', minHeight: '100vh', fontFamily: 'Segoe UI, Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      {/* Feedback Messages */}
      {addedToCart && (
        <div style={{
          position: 'fixed', 
          top: '80px', 
          right: '20px', 
          background: '#4caf50', 
          color: 'white', 
          padding: '12px 20px', 
          borderRadius: '8px', 
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          ✓ Added to cart!
        </div>
      )}
      {toggledWishlist && (
        <div style={{
          position: 'fixed', 
          top: '80px', 
          right: '20px', 
          background: inWishlist ? '#e91e63' : '#ff9800', 
          color: 'white', 
          padding: '12px 20px', 
          borderRadius: '8px', 
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {inWishlist ? '♥ Added to wishlist!' : '♡ Removed from wishlist!'}
        </div>
      )}
      <main style={{ maxWidth: 1000, margin: '2rem auto', padding: '1rem' }}>
        {/* Back navigation */}
        <Link 
          to="/products" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#2e7d32',
            textDecoration: 'none',
            marginBottom: '2rem',
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'white',
            border: '1px solid #e0e0e0',
            transition: 'all 0.2s'
          }}
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>
        
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
            <img 
              src={product.img || product.image || product.imageUrl || '/images/defaultplant.png'} 
              alt={product.name} 
              style={{ 
                width: '100%', 
                maxWidth: '500px',
                borderRadius: 16, 
                border: '1px solid #e0e0e0',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }} 
            />
          </div>
          <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
            <h1 style={{ color: '#2e7d32', marginBottom: '1rem', fontSize: '2rem' }}>{product.name}</h1>
            
            <div style={{ 
              color: '#43a047', 
              fontWeight: 'bold', 
              fontSize: '1.5rem', 
              marginBottom: '1rem',
              padding: '8px 12px',
              background: '#e8f5e9',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              {product.priceDisplay}
            </div>
            
            <div style={{ 
              marginBottom: '1rem', 
              color: '#666',
              fontSize: '1rem'
            }}>
              <strong>Category:</strong> {product.category}
            </div>
            
            <div style={{ 
              marginBottom: '1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {(product.tags || product.tags === undefined) && (product.tags || []).map((tag) => {
                // Stable color selection based on tag string
                const palette = [
                  '#e8f5e9', // green
                  '#f3e5f5', // purple
                  '#e3f2fd', // blue
                  '#fff3e0', // orange
                  '#fff8e1', // yellow
                  '#fbe9e7', // pink
                  '#e0f2f1', // teal
                  '#ede7f6'  // lavender
                ];
                const hash = String(tag).split('').reduce((s, ch) => s + ch.charCodeAt(0), 0);
                const bg = palette[hash % palette.length];
                const textColor = '#263238';

                return (
                  <span key={tag} style={{
                    background: bg,
                    color: textColor,
                    padding: '6px 10px',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.03)'
                  }}>
                    {String(tag)}
                  </span>
                );
              })}
            </div>
            
            <div style={{ 
              marginBottom: '1.5rem',
              padding: '16px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <p style={{ margin: 0, lineHeight: '1.6', color: '#444' }}>{product.desc}</p>
            </div>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: 8, 
                padding: '8px 12px', 
                borderRadius: 20, 
                background: product.stock > 0 ? '#e8f5e9' : '#fff0f0',
                border: `1px solid ${product.stock > 0 ? '#c8e6c9' : '#ffcdd2'}`
              }}>
                <Tag size={16} color={product.stock > 0 ? '#2e7d32' : '#d32f2f'} />
                <span style={{ 
                  color: product.stock > 0 ? '#2e7d32' : '#d32f2f', 
                  fontWeight: 'bold' 
                }}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
              
              {itemQuantity > 0 && (
                <div style={{
                  background: '#e3f2fd',
                  color: '#1976d2',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  {itemQuantity} in cart
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                style={{ 
                  padding: '12px 24px',
                  background: product.stock > 0 ? '#43a047' : '#bdbdbd',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                  if (product.stock > 0) {
                    e.target.style.background = '#388e3c';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }
                }}
                onMouseOut={(e) => {
                  if (product.stock > 0) {
                    e.target.style.background = '#43a047';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }
                }}
              >
                <ShoppingCart size={18} />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button 
                onClick={handleToggleWishlist}
                style={{ 
                  padding: '12px',
                  background: inWishlist ? '#ffebee' : 'white',
                  border: `2px solid ${inWishlist ? '#e91e63' : '#e0e0e0'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }} 
                title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <Heart 
                  size={20} 
                  color={inWishlist ? '#e91e63' : '#888'}
                  fill={inWishlist ? '#e91e63' : 'none'}
                />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
