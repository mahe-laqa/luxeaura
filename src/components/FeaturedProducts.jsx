import React, { useContext } from 'react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import './FeaturedProducts.css';

import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import { FavoritesContext } from '../context/FavoritesContext';

const FeaturedProducts = () => {
    const { addToCart } = useContext(CartContext);
    const { products } = useContext(ProductContext);
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
    // Select the first 4 featured products to display
    const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

    return (
        <section className="section featured-products">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Trending Now</h2>
                    <Link to="/shop" className="btn btn-outline">Shop All</Link>
                </div>

                <div className="product-grid">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                {product.isNew && <span className="product-badge">New</span>}
                                <img src={product.image} alt={product.name} className="product-image main" loading="lazy" />
                                <img src={product.imageHover || product.image} alt={`${product.name} closeup`} className="product-image hover" loading="lazy" />

                                <div className="product-actions">
                                    <button
                                        className="icon-btn action-btn bg-white"
                                        title="Add to Wishlist"
                                        onClick={(e) => toggleFavorite(product, e)}
                                    >
                                        <Heart size={18} fill={isFavorite(product.id) ? "black" : "none"} />
                                    </button>
                                    <button className="icon-btn action-btn bg-white" title="Quick View">
                                        <Eye size={18} />
                                    </button>
                                </div>

                                <button className="btn btn-primary add-to-cart-btn" onClick={() => addToCart(product)}>
                                    <ShoppingBag size={16} /> Add to Cart
                                </button>
                            </div>

                            <div className="product-details">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-name">
                                    <a href={`/product/${product.id}`}>{product.name}</a>
                                </h3>
                                <span className="product-price">${product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
