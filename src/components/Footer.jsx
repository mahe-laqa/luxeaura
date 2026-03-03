import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-newsletter">
                <div className="container text-center">
                    <h2 className="newsletter-title">Join The World of LUXEAURA</h2>
                    <p className="newsletter-subtitle">Subscribe to receive exclusive offers, early access to new arrivals, and style inspiration.</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Enter your email address" required />
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="footer-main">
                <div className="container footer-grid">
                    <div className="footer-col brand-info">
                        <h3 className="footer-logo">LUXE<span style={{ fontWeight: 300 }}>AURA</span></h3>
                        <p>Elevating everyday style with premium quality, international design, and uncompromising luxury.</p>
                        <div className="social-links">
                            <a href="/"><Instagram size={20} /></a>
                            <a href="/"><Facebook size={20} /></a>
                            <a href="/"><Twitter size={20} /></a>
                            <a href="/"><Youtube size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Customer Service</h4>
                        <ul className="footer-links">
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/shipping">Shipping & Delivery</Link></li>
                            <li><Link to="/returns">Returns & Exchanges</Link></li>
                            <li><Link to="/track-order">Track Your Order</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                        </ul>
                    </div>

                    <div className="collapsible-mobile footer-col">
                        <h4 className="footer-heading">About Us</h4>
                        <ul className="footer-links">
                            <li><Link to="/our-story">Our Story</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/sustainability">Sustainability</Link></li>
                            <li><Link to="/stores">Store Locator</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-heading">Legal & Privacy</h4>
                        <ul className="footer-links">
                            <li><Link to="/terms">Terms & Conditions</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/cookie-policy">Cookie Policy</Link></li>
                            <li><Link to="/accessibility">Accessibility</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container bottom-inner">
                    <div className="copyright">
                        &copy; {new Date().getFullYear()} LUXEAURA. All Rights Reserved.
                    </div>
                    <div className="payment-methods">
                        {/* Payment Icons implementation placeholder */}
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>Amex</span>
                        <span>Stripe</span>
                        <span>Apple Pay</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
