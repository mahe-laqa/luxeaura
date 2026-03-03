import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import './FeaturedCollection.css';

const FeaturedCollection = () => {
    const { products } = useContext(ProductContext);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    // Get 4 premium products for the showcase
    const premiumProducts = products.filter(p => p.price >= 100).slice(0, 4);
    const displayProducts = premiumProducts.length >= 3 ? premiumProducts.slice(0, 4) : products.slice(0, 4);

    return (
        <section
            className="premium-collection-section"
            ref={sectionRef}
        >
            <div className="container">
                <div className={`premium-collection-header ${isVisible ? 'animate-in' : ''}`}>
                    <h2 className="premium-collection-title">The Signature Edit</h2>
                    <p className="premium-collection-subtitle">
                        Discover the pieces that define modern luxury. Handpicked for the discerning.
                    </p>
                </div>

                <div className={`premium-grid ${isVisible ? 'animate-in' : ''}`}>
                    {displayProducts.map((product) => (
                        <div key={product.id} className="premium-card">
                            <div className="premium-image-wrapper">
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="premium-image"
                                        loading="lazy"
                                    />
                                </Link>
                            </div>
                            <div className="premium-info">
                                <span className="premium-category">{product.category}</span>
                                <Link to={`/product/${product.id}`} className="premium-name">
                                    {product.name}
                                </Link>
                                <div className="premium-price">${Number(product.price).toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
