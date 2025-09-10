import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const LocalStorageDebug = () => {
  const { cartItems, addToCart, clearCart, getCartItemsCount } = useCart();
  const { wishlistItems, addToWishlist, clearWishlist, getWishlistCount } = useWishlist();

  const testProduct = {
    id: 'test-product',
    name: 'Test Plant',
    priceLKR: 1500,
    priceDisplay: 'LKR 1,500',
    img: '/images/defaultplant.png',
    category: 'Test',
    stock: 10
  };

  const handleTestCart = () => {
    addToCart(testProduct);
  };

  const handleTestWishlist = () => {
    addToWishlist(testProduct);
  };

  const checkLocalStorage = () => {
  const cart = localStorage.getItem('leafyMartCart');
  const wishlist = localStorage.getItem('leafyMartWishlist');
    
    console.log('LocalStorage Cart:', cart ? JSON.parse(cart) : 'empty');
    console.log('LocalStorage Wishlist:', wishlist ? JSON.parse(wishlist) : 'empty');
    
    alert(`
      Cart in localStorage: ${cart ? JSON.parse(cart).length : 0} items
      Wishlist in localStorage: ${wishlist ? JSON.parse(wishlist).length : 0} items
      
      Current Cart State: ${getCartItemsCount()} items
      Current Wishlist State: ${getWishlistCount()} items
    `);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'white', 
      padding: '15px', 
      border: '2px solid #388e3c', 
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      minWidth: '250px'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#388e3c' }}>Debug Panel</h4>
      
      <div style={{ marginBottom: '10px', fontSize: '12px' }}>
        <strong>Cart:</strong> {getCartItemsCount()} items<br />
        <strong>Wishlist:</strong> {getWishlistCount()} items<br />
        <details style={{ fontSize: '11px', marginTop: '5px' }}>
          <summary>Items Details</summary>
          <div>Cart: {cartItems.map(item => item.name).join(', ') || 'Empty'}</div>
          <div>Wishlist: {wishlistItems.map(item => item.name).join(', ') || 'Empty'}</div>
        </details>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <button 
          onClick={handleTestCart}
          style={{ padding: '5px', background: '#388e3c', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Add Test to Cart
        </button>
        
        <button 
          onClick={handleTestWishlist}
          style={{ padding: '5px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Add Test to Wishlist
        </button>
        
        <button 
          onClick={checkLocalStorage}
          style={{ padding: '5px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Check localStorage
        </button>
        
        <div style={{ display: 'flex', gap: '5px' }}>
          <button 
            onClick={clearCart}
            style={{ padding: '5px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', flex: 1 }}
          >
            Clear Cart
          </button>
          
          <button 
            onClick={clearWishlist}
            style={{ padding: '5px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', flex: 1 }}
          >
            Clear Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalStorageDebug;
