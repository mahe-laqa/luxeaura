import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CategoryShowcase.css';

const categories = [
    {
        id: 1,
        name: 'Women',
        image: '/modest_1.png',
        link: '/category/women'
    },
    {
        id: 2,
        name: 'Men',
        image: '/modest_men.png', // Corrected image
        link: '/category/men'
    },
    {
        id: 3,
        name: 'Accessories',
        image: '/modest_accessories.png', // Corrected image
        link: '/category/accessories'
    },
    {
        id: 4,
        name: 'Beauty',
        image: '/modest_4.png',
        link: '/category/beauty'
    }
];

const CategoryShowcase = () => {
    return (
        <section className="section category-showcase">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Shop by Category</h2>
                    <Link to="/shop" className="view-all-link">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="category-grid">
                    {categories.map((category) => (
                        <Link to={category.link} key={category.id} className="category-card">
                            <div className="category-image-wrapper">
                                <img src={category.image} alt={category.name} className="category-image" />
                                <div className="category-overlay"></div>
                            </div>
                            <div className="category-info">
                                <h3 className="category-name">{category.name}</h3>
                                <span className="category-cta">Discover</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
