
import React, { useState, useContext } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Heart, Search, Filter, ChevronDown, Check, X, Eye, ShoppingBag } from 'lucide-react';
import './ShopPage.css';

import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import { FavoritesContext } from '../context/FavoritesContext';

const ShopPage = () => {
    const { categoryId } = useParams();
    const location = useLocation();

    const { products: allDatabaseProducts } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

    const [sortBy, setSortBy] = useState('newest');
    const [filterSubCategory, setFilterSubCategory] = useState('All');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // Determine what products to show based on routing
    let pageProducts = allDatabaseProducts;
    let pageTitle = "The Collection";
    let pageDesc = "Discover our meticulously curated selection of timeless pieces.";

    const isSale = location.pathname.includes('/sale');

    if (isSale) {
        pageProducts = allDatabaseProducts.filter(p => p.originalPrice); // Items with originalPrice are on sale
        pageTitle = "Sale";
        pageDesc = "Exclusive discounts on our luxury items.";
    } else if (categoryId) {
        pageProducts = allDatabaseProducts.filter(p => p.category === categoryId);
        pageTitle = categoryId.toUpperCase();
        pageDesc = ""; // Remove the generic text for category pages
    }

    // Secondary sub-category filtering
    const displayedProducts = filterSubCategory === 'All'
        ? pageProducts
        : pageProducts.filter(p => p.subcategory === filterSubCategory.toLowerCase());

    const availableCategories = ['All', ...new Set(pageProducts.map(p => p.subcategory ? p.subcategory.charAt(0).toUpperCase() + p.subcategory.slice(1) : ''))].filter(Boolean);

    // Calculate Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

    // Reset page to 1 if filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filterSubCategory, sortBy, categoryId, location.pathname]);

    return (
        <div className="shop-page">
            {/* Page Header */}
            <div className="shop-header">
                <div className="container text-center">
                    <h1>{pageTitle}</h1>
                    {pageDesc && <p>{pageDesc}</p>}
                </div>
            </div>

            <div className="container shop-layout">
                {/* Sidebar Filters */}
                <aside className="shop-sidebar">
                    <div className="filter-section">
                        <h3>Categories</h3>
                        <ul className="filter-list">
                            {availableCategories.map(cat => (
                                <li key={cat}>
                                    <button
                                        className={`filter-btn ${filterSubCategory === cat ? 'active' : ''}`}
                                        onClick={() => setFilterSubCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-section">
                        <h3>Color</h3>
                        <div className="color-filters">
                            {['#000000', '#ffffff', '#f5f5dc', '#000080', '#800000'].map(color => (
                                <button key={color} className="color-swatch" style={{ backgroundColor: color }} aria-label="Color filter" />
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Price</h3>
                        <div className="price-range">
                            <input type="range" min="0" max="1000" className="range-slider" />
                            <div className="range-labels">
                                <span>$0</span>
                                <span>$1000+</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="shop-main">
                    {/* Toolbar */}
                    <div className="shop-toolbar">
                        <div className="results-count">
                            Showing {displayedProducts.length} results
                        </div>
                        <div className="sort-dropdown">
                            <span className="sort-label">Sort by:</span>
                            <div className="select-wrapper">
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="newest">New Arrivals</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {currentProducts.length > 0 ? (
                        <div className="shop-product-grid">
                            {currentProducts.map(product => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-container">
                                        <img src={product.image} alt={product.name} className="product-image" />

                                        <div className="product-actions">
                                            <button
                                                className="icon-btn action-btn bg-white"
                                                title="Add to Wishlist"
                                                onClick={(e) => toggleFavorite(product, e)}
                                            >
                                                <Heart size={18} fill={isFavorite(product.id) ? "black" : "none"} />
                                            </button>
                                            <Link to={`/product/${product.id}`} className="icon-btn action-btn bg-white" title="Quick View">
                                                <Eye size={18} />
                                            </Link>
                                        </div>
                                        <button className="btn btn-primary add-to-cart-btn btn-full" onClick={() => addToCart(product)}>
                                            <ShoppingBag size={16} /> Add to Cart
                                        </button>
                                    </div>
                                    <div className="product-details">
                                        <span className="product-category">{product.subcategory ? product.subcategory.charAt(0).toUpperCase() + product.subcategory.slice(1) : ''}</span>
                                        <h3 className="product-name">
                                            <Link to={`/product/${product.id}`}>{product.name}</Link>
                                        </h3>
                                        {product.originalPrice ? (
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <span className="product-price" style={{ color: 'red' }}>${product.price}</span>
                                                <span className="product-price" style={{ textDecoration: 'line-through', fontSize: '0.85em', color: '#999' }}>${product.originalPrice}</span>
                                            </div>
                                        ) : (
                                            <span className="product-price">${product.price}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-products-found" style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <h3>No products found in this category.</h3>
                            <p>Try clearing your filters or exploring our other collections.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                <button
                                    key={pageNumber}
                                    className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                                    onClick={() => {
                                        setCurrentPage(pageNumber);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShopPage;
