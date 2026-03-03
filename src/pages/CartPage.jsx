import React, { useContext } from 'react';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, subtotal } = useContext(CartContext);
    const navigate = useNavigate();

    const shipping = subtotal > 300 ? 0 : (subtotal === 0 ? 0 : 25);
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <div className="cart-page empty">
                <div className="container text-center" style={{ padding: '6rem 0' }}>
                    <h1 style={{ marginBottom: '1.5rem' }}>Your Shopping Bag is Empty</h1>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text-light)' }}>Discover our latest collections and find something you love.</p>
                    <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="page-title text-center">Your Shopping Bag</h1>

                <div className="cart-layout">
                    {/* Cart Items List */}
                    <div className="cart-items-section">
                        <div className="cart-header grid-header">
                            <span>Product</span>
                            <span>Quantity</span>
                            <span>Total</span>
                        </div>

                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={`${item.id}-${item.size}`} className="cart-item">
                                    <div className="item-product">
                                        <img src={item.image} alt={item.name} className="item-image" />
                                        <div className="item-details">
                                            <h3 className="item-name"><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                                            <p className="item-variants">Color: {item.color} | Size: {item.size}</p>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id, item.size)}><X size={14} /> Remove</button>
                                        </div>
                                    </div>

                                    <div className="item-quantity">
                                        <div className="quantity-selector">
                                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}><Minus size={14} /></button>
                                            <input type="number" value={item.quantity} readOnly />
                                            <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}><Plus size={14} /></button>
                                        </div>
                                    </div>

                                    <div className="item-total">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-actions">
                            <Link to="/" className="btn btn-outline">Continue Shopping</Link>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="cart-summary-section">
                        <div className="order-summary-box">
                            <h2 className="summary-title">Order Summary</h2>

                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>

                            <hr className="divider" />

                            <div className="summary-row total-row">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <p className="tax-note">Tax included and shipping calculated at checkout</p>

                            <button className="btn btn-primary checkout-btn" onClick={() => navigate('/checkout')}>
                                Proceed to Checkout <ArrowRight size={16} />
                            </button>

                            <div className="accepted-payments">
                                <p>We Accept</p>
                                <div className="payment-icons-sm">
                                    {/* SVGs would go here in a real app */}
                                    <span className="pi">Visa</span>
                                    <span className="pi">MC</span>
                                    <span className="pi">Amex</span>
                                    <span className="pi">Apple Pay</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
