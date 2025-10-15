import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('leafyMartCart', []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Item already exists, update quantity but cap at available stock
        const updatedItems = [...prevItems];
        const newQuantity = Math.min(
          updatedItems[existingItemIndex].quantity + quantity,
          product.stock
        );
        updatedItems[existingItemIndex].quantity = newQuantity;
        updatedItems[existingItemIndex].stock = product.stock; // Update stock info
        return updatedItems;
      } else {
        // New item, add to cart (cap initial quantity at stock)
        const cappedQuantity = Math.min(quantity, product.stock);
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.priceLKR,
          priceDisplay: product.priceDisplay,
          image: product.img,
          category: product.category,
          quantity: cappedQuantity,
          stock: product.stock,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === productId) {
          // Cap quantity at available stock
          const cappedQuantity = Math.min(newQuantity, item.stock);
          return { ...item, quantity: cappedQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
