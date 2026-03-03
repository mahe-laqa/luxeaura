/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage or empty array
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('luxeaura_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('luxeaura_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size = 'One Size') => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id && item.size === size);

            if (existingItem) {
                // If item exists, increase quantity
                return prevItems.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If new item, add to array
                return [...prevItems, { ...product, size, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId, size) => {
        setCartItems(prevItems =>
            prevItems.filter(item => !(item.id === productId && item.size === size))
        );
    };

    const updateQuantity = (productId, size, newQuantity) => {
        if (newQuantity < 1) return; // Prevent going below 1

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId && item.size === size
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
        // Handle price strings if they have '$' or commas, though they should be numbers now
        const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : item.price;
        return sum + (price * item.quantity);
    }, 0);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            subtotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
