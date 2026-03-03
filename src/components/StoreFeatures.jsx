import React from 'react';
import { Truck, ShieldCheck, RefreshCw, CreditCard } from 'lucide-react';
import './StoreFeatures.css';

const features = [
    {
        icon: <Truck size={24} />,
        title: 'Complimentary Shipping',
        description: 'On all orders over $300'
    },
    {
        icon: <RefreshCw size={24} />,
        title: 'Free Returns',
        description: 'Within 30 days of purchase'
    },
    {
        icon: <ShieldCheck size={24} />,
        title: 'Secure Checkout',
        description: 'Encrypted payment processing'
    },
    {
        icon: <CreditCard size={24} />,
        title: 'Flexible Payments',
        description: 'Pay over time with Klarna'
    }
];

const StoreFeatures = () => {
    return (
        <section className="store-features">
            <div className="container">
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-item">
                            <div className="feature-icon">{feature.icon}</div>
                            <h4 className="feature-title">{feature.title}</h4>
                            <p className="feature-desc">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StoreFeatures;
