import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for subscribing! Check your email for your 10% off code.');
        setEmail('');
    };

    return (
        <section className="newsletter-section" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510832198440-a52376950479?q=80&w=1966&auto=format&fit=crop')" }}>
            <div className="newsletter-bg">
                <div className="container">
                    <div className="newsletter-content">
                        <h2>Join the LUXEAURA Insider</h2>
                        <p>Subscribe to receive 10% off your first order, plus exclusive access to new arrivals, sales, and styling tips.</p>

                        <form onSubmit={handleSubmit} className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                Subscribe <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                            </button>
                        </form>

                        <p className="newsletter-disclaimer">
                            By subscribing, you agree to our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
