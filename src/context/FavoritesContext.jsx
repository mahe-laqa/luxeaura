/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    // Initialize favorites from localStorage. We store an array of user-favorited Product IDs.
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('luxeaura_favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Save favorites to localStorage whenever the array changes
    useEffect(() => {
        localStorage.setItem('luxeaura_favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Check if a specific product ID is in the user's favorites
    const isFavorite = (productId) => {
        return favorites.includes(productId);
    };

    // Toggle a product in or out of the favorites list
    const toggleFavorite = (product, e) => {
        // Prevent click events (like adding to cart or navigating) from triggering if the heart icon sits on top of a link
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        setFavorites(prevFavorites => {
            if (prevFavorites.includes(product.id)) {
                // If it's already favorited, remove it (filter out the ID)
                return prevFavorites.filter(id => id !== product.id);
            } else {
                // If it's not favorited, add it to the array
                return [...prevFavorites, product.id];
            }
        });
    };

    // Explicitly remove an item (useful for the Favorites Page "Remove" button)
    const removeFavorite = (productId) => {
        setFavorites(prevFavorites => prevFavorites.filter(id => id !== productId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
