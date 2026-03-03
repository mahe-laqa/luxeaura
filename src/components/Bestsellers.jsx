import React, { useContext } from 'react';
import './Bestsellers.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';

const Bestsellers = () => {
    const { addToCart } = useContext(CartContext);
    const { products } = useContext(ProductContext);
    const bestsellers = products.filter(p => p.isBestseller).slice(0, 5);

    // Ensure there are enough bestsellers to display, especially for the featured one
    if (bestsellers.length === 0) {
        return null; // Or a message indicating no bestsellers
    }

    return (
        <section className="section bestsellers">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Bestsellers</h2>
                    <Link to="/shop" className="btn btn-outline">View All Bestsellers</Link>
                </div>

                <div className="bestsellers-grid">
                    {/* Featured Bestseller (Large) */}
                    {bestsellers[0] && (
                        <div className="bestseller-featured" style={{ backgroundImage: `url(${bestsellers[0].image})` }}>
                            <div className="bs-content">
                                <h3>{bestsellers[0].name}</h3>
                                <p>${bestsellers[0].price}</p>
                                <Link to={`/product/${bestsellers[0].id}`} className="btn btn-primary">Shop Now</Link>
                            </div>
                        </div>
                    )}

                    {/* Smaller Bestsellers */}
                    <div className="bestseller-items">
                        {bestsellers.slice(1).map(product => (
                            <div key={product.id} className="bs-item">
                                <img src={product.image} alt={product.name} />
                                <div className="bs-item-info">
                                    <h4>{product.name}</h4>
                                    <span className="product-price">${product.price}</span>
                                    <button className="btn-text" onClick={() => addToCart(product)}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Bestsellers;
