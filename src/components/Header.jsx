import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X, Globe } from 'lucide-react';
import './Header.css';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';

const Header = () => {
    const { cartCount } = useContext(CartContext);
    const { favorites } = useContext(FavoritesContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Determine if we are on the homepage.
    // If we are NOT on the homepage, the header should always look 'scrolled' (dark text)
    // because sub-pages have light backgrounds at the top.
    const isHomePage = location.pathname === '/';
    const headerClass = `header ${(isScrolled || !isHomePage) ? 'scrolled' : ''}`;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={headerClass}>
            {/* Top utility bar */}
            <div className="top-bar v-hidden-mobile">
                <div className="container top-bar-inner">
                    <div className="language-selector">
                        <Globe size={14} />
                        <span>EN | AR</span>
                    </div>
                    <div className="promo-text">
                        <span>FREE INTERNATIONAL SHIPPING ON ORDERS OVER $500</span>
                    </div>
                    <div className="utility-links">
                        <Link to="/store-locator">Store Locator</Link>
                        <Link to="/contact">Help & Contact</Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="main-nav">
                <div className="container main-nav-inner">

                    <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Link to="/" className="brand-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span className="logo-text">LUXE<span className="logo-accent">AURA</span></span>
                        {location.pathname.includes('/category/') && (
                            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8, marginTop: '4px' }}>
                                {location.pathname.split('/').pop()}'s Collection
                            </span>
                        )}
                        {location.pathname === '/shop' && (
                            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8, marginTop: '4px' }}>
                                The Collection
                            </span>
                        )}
                        {location.pathname === '/sale' && (
                            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8, marginTop: '4px', color: '#d13239' }}>
                                Sale
                            </span>
                        )}
                    </Link>

                    <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/shop" className="nav-link" style={{ fontWeight: 'bold' }}>Shop All</Link>
                        <Link to="/category/women" className="nav-link">Women</Link>
                        <Link to="/category/men" className="nav-link">Men</Link>
                        <Link to="/category/beauty" className="nav-link">Beauty</Link>
                        <Link to="/category/accessories" className="nav-link">Accessories</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                        <Link to="/sale" className="nav-link sale-link">Sale</Link>
                    </nav>

                    <div className="nav-icons">
                        <button className="icon-btn search-btn"><Search size={20} /></button>
                        <Link to="/account" className="icon-btn v-hidden-mobile"><User size={20} /></Link>
                        <Link to="/favorites" className="icon-btn v-hidden-mobile" style={{ position: 'relative' }}>
                            <Heart size={20} fill={favorites.length > 0 ? "black" : "none"} />
                            {favorites.length > 0 && <span className="cart-count" style={{ right: '-5px', top: '-5px' }}>{favorites.length}</span>}
                        </Link>
                        <Link to="/cart" className="icon-btn cart-btn">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
