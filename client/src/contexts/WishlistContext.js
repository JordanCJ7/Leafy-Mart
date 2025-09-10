import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useLocalStorage('plantStoreWishlist', []);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (!existingItem) {
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.priceLKR,
          priceDisplay: product.priceDisplay,
          image: product.img,
          category: product.category,
          stock: product.stock,
          tags: product.tags,
          desc: product.desc,
          addedAt: new Date().toISOString()
        }];
      }
      
      return prevItems; // Item already exists, don't add duplicate
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const toggleWishlistItem = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  // Move item from wishlist to cart
  const moveToCart = (productId, addToCartFunction) => {
    const item = wishlistItems.find(item => item.id === productId);
    if (item) {
      addToCartFunction(item);
      removeFromWishlist(productId);
    }
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlistItem,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    moveToCart
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
