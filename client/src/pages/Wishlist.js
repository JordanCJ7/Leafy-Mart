
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useWishlist } from '../contexts/WishlistContext';
import { Heart, X, ArrowLeft, Star } from 'lucide-react';
import { toast, confirm } from '../utils/swal';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  const handleRemoveItem = (itemId, itemName) => {
    (async () => {
      const ok = await confirm('Remove from wishlist', `Remove ${itemName} from your wishlist?`);
      if (ok) removeFromWishlist(itemId);
    })();
  };

  if (wishlistItems.length === 0) {
    return (
      <div style={{ 
        background: '#f1faee', 
        minHeight: '100vh', 
        fontFamily: 'Segoe UI, Arial, sans-serif', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <Navbar />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            background: '#fff',
            padding: '3rem',
            borderRadius: '1rem',
            boxShadow: '0 2px 16px rgba(56, 142, 60, 0.15)',
            textAlign: 'center',
            maxWidth: '400px'
          }}>
            <Heart size={64} style={{ color: '#ccc', marginBottom: '1rem' }} />
            <h2 style={{ color: '#388e3c', marginBottom: '1rem' }}>Your Wishlist is Empty</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Save your favorite plants here for later!
            </p>
            <Link 
              to="/products" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#388e3c',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'background-color 0.2s'
              }}
            >
              <ArrowLeft size={16} />
              Browse Plants
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ 
      background: '#f1faee', 
      minHeight: '100vh', 
      fontFamily: 'Segoe UI, Arial, sans-serif', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Navbar />
      <div style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem' 
        }}>
          <div>
            <h1 style={{ color: '#388e3c', marginBottom: '0.5rem' }}>
              <Heart size={32} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              My Wishlist
            </h1>
            <p style={{ color: '#666' }}>{wishlistItems.length} plants saved for later</p>
          </div>
          
          {wishlistItems.length > 0 && (
            <button
              onClick={async () => {
                const ok = await confirm('Clear wishlist', 'Are you sure you want to clear your entire wishlist?');
                if (ok) clearWishlist();
              }}
              style={{
                border: '1px solid #dc3545',
                background: 'transparent',
                color: '#dc3545',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Clear All
            </button>
          )}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {wishlistItems.map((item) => (
            <div 
              key={item.id} 
              style={{
                background: '#fff',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 2px 16px rgba(56, 142, 60, 0.15)',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(56, 142, 60, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(56, 142, 60, 0.15)';
              }}
            >
              <button
                onClick={() => handleRemoveItem(item.id, item.name)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  border: 'none',
                  background: 'rgba(220, 53, 69, 0.1)',
                  color: '#dc3545',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title="Remove from wishlist"
              >
                <X size={16} />
              </button>

              <div style={{ marginBottom: '1rem' }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: '#333', margin: 0, fontSize: '1.2rem' }}>
                    {item.name}
                  </h3>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    background: '#e8f5e8',
                    color: '#388e3c',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {item.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={14} fill="#ffc107" color="#ffc107" />
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>4.5</span>
                  </div>
                </div>

                <p style={{ 
                  color: '#666', 
                  fontSize: '0.9rem', 
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.desc}
                </p>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{ color: '#388e3c', fontWeight: '700', fontSize: '1.2rem' }}>
                    {item.priceDisplay}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {item.stock > 0 ? (
                      <span style={{ color: '#28a745', fontSize: '0.8rem', fontWeight: '600' }}>
                        In Stock ({item.stock})
                      </span>
                    ) : (
                      <span style={{ color: '#dc3545', fontSize: '0.8rem', fontWeight: '600' }}>
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link
                    to={`/product/${item.id}`}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: '1px solid #388e3c',
                      background: 'transparent',
                      color: '#388e3c',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#388e3c';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#388e3c';
                    }}
                  >
                    View Details
                  </Link>
                  
                  {/* Add to Cart removed from wishlist page by design */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '3rem', 
          padding: '2rem',
          background: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 2px 16px rgba(56, 142, 60, 0.15)'
        }}>
          <h3 style={{ color: '#388e3c', marginBottom: '1rem' }}>
            Keep exploring our collection!
          </h3>
          <Link 
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: '#388e3c',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#2e7d32';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#388e3c';
            }}
          >
            Browse More Plants
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
