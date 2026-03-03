import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';
import { FavoritesContext } from '../context/FavoritesContext';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import './FavoritesPage.css';

const FavoritesPage = () => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const { products } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);

    // Map the string/number IDs in favorites to the actual full product objects
    const favoriteItems = products.filter(p => favorites.includes(p.id));

    return (
        <div className="favorites-page section">
            <div className="container">
                <div className="section-header text-center">
                    <h1 className="section-title">Your Wishlist</h1>
                    <p style={{ color: 'var(--color-text-light)' }}>
                        {favoriteItems.length} {favoriteItems.length === 1 ? 'item' : 'items'} saved
                    </p>
                </div>

                {favoriteItems.length === 0 ? (
                    <div className="empty-favorites text-center">
                        <HeartEmptyIcon />
                        <h2>Your wishlist is empty</h2>
                        <p>Save items you love by clicking the heart icon on any product.</p>
                        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {favoriteItems.map(product => (
                            <div key={product.id} className="favorite-card">
                                <Link to={`/product/${product.id}`} className="favorite-image-link">
                                    <img src={product.image} alt={product.name} />
                                </Link>

                                <div className="favorite-details">
                                    <span className="favorite-category">{product.category}</span>
                                    <h3 className="favorite-name">
                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                    </h3>
                                    <span className="favorite-price">${product.price.toFixed(2)}</span>
                                </div>

                                <div className="favorite-actions">
                                    <button
                                        className="btn btn-outline btn-full add-to-cart-btn"
                                        onClick={() => addToCart(product)}
                                    >
                                        <ShoppingBag size={16} /> Add to Cart
                                    </button>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFavorite(product.id)}
                                        title="Remove from Wishlist"
                                    >
                                        <X size={20} /> Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Simple UI SVG component to use when the list is completely empty
const HeartEmptyIcon = () => (
    <svg
        width="64" height="64" viewBox="0 0 24 24"
        fill="none" stroke="var(--color-border)"
        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
        style={{ margin: '0 auto 2rem auto', display: 'block' }}
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
);

export default FavoritesPage;
