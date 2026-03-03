import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        role: 'Verified Buyer',
        quote: "The quality of the silk dress I ordered is absolutely unmatched. It drapes beautifully and feels like a dream. LUXEAURA is my new go-to for elegant evening wear.",
        rating: 5
    },
    {
        id: 2,
        name: 'Emily Chen',
        role: 'Verified Buyer',
        quote: "Impeccable customer service and incredibly fast shipping. The packaging itself was a luxury experience, let alone the cashmere sweater inside. Worth every penny.",
        rating: 5
    },
    {
        id: 3,
        name: 'Michael T.',
        role: 'Verified Buyer',
        quote: "Bought a gift for my wife and the sizing guide was spot on. She loves the structure of the leather tote. A truly premium shopping experience from start to finish.",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="section testimonials">
            <div className="container">
                <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>Words from our Clients</h2>

                <div className="testimonials-grid">
                    {testimonials.map(testimonial => (
                        <div key={testimonial.id} className="testimonial-card">
                            <div className="stars">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            <p className="quote">"{testimonial.quote}"</p>
                            <div className="author">
                                <strong>{testimonial.name}</strong>
                                <span>{testimonial.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
