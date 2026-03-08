import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import StoreFeatures from '../components/StoreFeatures';
import CategoryShowcase from '../components/CategoryShowcase';
import NewArrivals from '../components/NewArrivals';
import Lookbook from '../components/Lookbook';
import Bestsellers from '../components/Bestsellers';
import FeaturedProducts from '../components/FeaturedProducts';
import TrendingCollections from '../components/TrendingCollections';
import Testimonials from '../components/Testimonials';
import SocialFeed from '../components/SocialFeed';
import Newsletter from '../components/Newsletter';
import ProductAdmin from '../components/ProductAdmin';
import BrandLogos from '../components/BrandLogos';

const HomePage = () => {
    return (
        <div className="home-page">
            <HeroCarousel />
            <BrandLogos />
            <StoreFeatures />
            <CategoryShowcase />
            <NewArrivals />
            <Lookbook />

            {/* Promotional Banner */}
            <section className="promo-banner" style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                padding: '2rem 1rem',
                textAlign: 'center'
            }}>
                <div className="container">
                    <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.25rem',
                        letterSpacing: '0.05em',
                        margin: 0
                    }}>
                        COMPLIMENTARY GIFT WITH EVERY ORDER OVER $300
                    </p>
                </div>
            </section>

            <Bestsellers />
            <FeaturedProducts />

            <TrendingCollections />
            <Testimonials />

            {/* Brand Story Section */}
            <section className="section bg-light">
                <div className="container" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <div>
                        <img
                            src="/yellow_modest_dress.png"
                            alt="Brand Story"
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                    </div>
                    <div>
                        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>The LUXEAURA Philosophy</h2>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem', lineHeight: 1.8 }}>
                            We believe that true luxury lies in the details. From ethically sourced materials to master craftsmanship, every piece in our collection tells a story of passion and precision. Explore clothing that transcends seasons and defines modern elegance.
                        </p>
                        <Link to="/about" className="btn btn-outline">Read Our Story</Link>
                    </div>
                </div>
            </section>

            <SocialFeed />
            <Newsletter />
            <ProductAdmin />
        </div>
    );
};

export default HomePage;
