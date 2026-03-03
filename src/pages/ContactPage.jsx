import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your message! Our team will get back to you within 24 hours.");
        e.target.reset();
    };

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <div className="container text-center">
                    <h1>Contact Us</h1>
                    <p>We're here to help elevate your experience with LUXEAURA.</p>
                </div>
            </div>

            <div className="container contact-layout">
                {/* Contact Information Cards */}
                <div className="contact-info-section">
                    <h2>Get in Touch</h2>
                    <p className="contact-intro">Whether you have a question about an order, styling advice, or feedback, our dedicated team is at your service.</p>

                    <div className="info-cards">
                        <div className="info-card">
                            <div className="icon-wrapper">
                                <Phone size={24} />
                            </div>
                            <h3>Call Us</h3>
                            <p>+1 (800) 123-4567</p>
                            <span className="sub-text">Mon - Fri: 9am - 8pm EST</span>
                        </div>

                        <div className="info-card">
                            <div className="icon-wrapper">
                                <Mail size={24} />
                            </div>
                            <h3>Email Us</h3>
                            <p>support@luxeaura.com</p>
                            <span className="sub-text">We aim to reply within 24 hours</span>
                        </div>

                        <div className="info-card">
                            <div className="icon-wrapper">
                                <MapPin size={24} />
                            </div>
                            <h3>Visit Us</h3>
                            <p>123 Luxury Avenue<br />New York, NY 10022</p>
                            <span className="sub-text">Flagship Store</span>
                        </div>

                        <div className="info-card">
                            <div className="icon-wrapper">
                                <Clock size={24} />
                            </div>
                            <h3>Store Hours</h3>
                            <p>Mon - Sat: 10am - 7pm</p>
                            <p>Sunday: 11am - 6pm</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-section">
                    <div className="form-container bg-light">
                        <h2>Send a Message</h2>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input type="text" id="firstName" name="firstName" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input type="text" id="lastName" name="lastName" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject *</label>
                                <select id="subject" name="subject" required>
                                    <option value="">Select a topic</option>
                                    <option value="order">Order Inquiry</option>
                                    <option value="returns">Returns & Exchanges</option>
                                    <option value="styling">Styling Advice</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea id="message" name="message" rows="6" required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary submit-btn">Submit Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
