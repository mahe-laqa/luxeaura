import React, { useState, useContext } from 'react';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const { cartItems, subtotal, clearCart } = useContext(CartContext);
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [formData, setFormData] = useState({
        email: '', firstName: '', lastName: '', address: '',
        apartment: '', city: '', postalCode: '', country: '', phone: ''
    });

    const shipping = subtotal > 300 ? 0 : (subtotal === 0 ? 0 : 25);
    const total = subtotal + shipping;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNextStep = async (e) => {
        e.preventDefault();

        // If moving to step 3 (Success), clear the cart, save order, send email, and open WhatsApp
        if (step === 2) {

            // 1. Create Order Object for Admin Panel LocalStorage
            const newOrder = {
                id: 'ORD-' + Date.now(),
                date: new Date().toISOString(),
                customer: formData,
                items: cartItems,
                subtotal: subtotal,
                shippingInfo: shipping,
                total: total,
                status: 'Pending',
                paymentMethod: 'Cash on Delivery'
            };

            const existingOrders = JSON.parse(localStorage.getItem('luxeaura_orders') || '[]');
            localStorage.setItem('luxeaura_orders', JSON.stringify([...existingOrders, newOrder]));

            // 2. EmailJS REST API Integration (Fire and Forget)
            const templateParams = {
                customer_name: `${formData.firstName} ${formData.lastName}`,
                customer_email: formData.email,
                customer_phone: formData.phone,
                order_id: newOrder.id,
                order_total: total.toFixed(2),
                shipping_address: `${formData.address}, ${formData.city}`,
                order_details: cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ')
            };

            const emailData = {
                service_id: 'YOUR_SERVICE_ID_HERE',   // Developer: Replace this
                template_id: 'YOUR_TEMPLATE_ID_HERE', // Developer: Replace this
                user_id: 'YOUR_PUBLIC_KEY_HERE',      // Developer: Replace this
                template_params: templateParams
            };

            try {
                // We fire this off asynchronously without blocking the user flow
                fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(emailData)
                }).catch(err => console.log('EmailJS trigger error:', err));
            } catch (error) {
                console.log('EmailJS execution failed, continuing order stream.');
            }

            // 3. Generate WhatsApp Logic
            let orderDetails = `*New Order: LUXEAURA (${newOrder.id})*\n\n`;
            orderDetails += `*Customer Details:*\n`;
            orderDetails += `Name: ${formData.firstName} ${formData.lastName}\n`;
            orderDetails += `Phone: ${formData.phone}\n`;
            orderDetails += `Address: ${formData.address}, ${formData.apartment ? formData.apartment + ', ' : ''}${formData.city}\n\n`;

            orderDetails += `*Order Summary:*\n`;
            cartItems.forEach(item => {
                orderDetails += `- ${item.quantity}x ${item.name} (${item.size}) - $${(item.price * item.quantity).toFixed(2)}\n`;
            });

            orderDetails += `\n*Subtotal:* $${subtotal.toFixed(2)}`;
            orderDetails += `\n*Shipping:* ${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}`;
            orderDetails += `\n*Total:* $${total.toFixed(2)}\n`;
            orderDetails += `*Payment Method:* Cash on Delivery`;

            const encodedMessage = encodeURIComponent(orderDetails);
            window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');

            clearCart();
        }

        setStep(step + 1);
    };
    if (step === 3) {
        return (
            <div className="checkout-page success">
                <div className="container text-center">
                    <div className="success-icon">
                        <CheckCircle size={64} color="var(--color-primary)" />
                    </div>
                    <h1>Order Confirmed</h1>
                    <p className="order-number">Order #LAX-84920</p>
                    <p className="success-message">Thank you for your purchase. We've sent a confirmation email to your inbox.</p>
                    <a href="/" className="btn btn-primary">Return to Homepage</a>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">

                <div className="checkout-layout">
                    {/* Main Checkout Flow */}
                    <div className="checkout-main">
                        <h1 className="checkout-title">Secure Checkout</h1>

                        {/* Progress Steps */}
                        <div className="checkout-steps">
                            <div className={`step-indicator ${step >= 1 ? 'active' : ''}`}>1. Shipping</div>
                            <div className={`step-indicator ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
                        </div>

                        {/* Step 1: Shipping */}
                        {step === 1 && (
                            <form className="checkout-form" onSubmit={handleNextStep}>
                                <div className="form-section">
                                    <h2>Contact Information</h2>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" required />
                                </div>

                                <div className="form-section">
                                    <h2>Shipping Address</h2>
                                    <div className="form-row">
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" required />
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name *" required />
                                    </div>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address *" required />
                                    <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} placeholder="Apartment, suite, etc. (optional)" />
                                    <div className="form-row">
                                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City *" required />
                                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code *" required />
                                    </div>
                                    <select name="country" value={formData.country} onChange={handleChange} required>
                                        <option value="">Country/Region *</option>
                                        <option value="US">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="SA">Saudi Arabia</option>
                                        <option value="AE">United Arab Emirates</option>
                                    </select>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" required />
                                </div>

                                <button type="submit" className="btn btn-primary submit-btn">
                                    Continue to Payment
                                </button>
                            </form>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <form className="checkout-form" onSubmit={handleNextStep}>
                                <div className="form-section">
                                    <div className="payment-header">
                                        <h2>Payment Method</h2>
                                        <Lock size={16} color="var(--color-text-light)" />
                                    </div>
                                    <p className="secure-note">All transactions are secure and encrypted.</p>

                                    <div className="payment-options">
                                        <label className="payment-option selected">
                                            <div className="option-radio">
                                                <input type="radio" name="payment" value="cod" defaultChecked />
                                                <span>Cash on Delivery (COD)</span>
                                            </div>
                                            <Lock size={16} />
                                        </label>

                                        <div className="cod-message" style={{ padding: '15px', backgroundColor: 'var(--color-bg)', marginTop: '10px', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                                            You can pay in cash to our courier when you receive the goods at your doorstep.
                                        </div>
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                                        Back to Shipping
                                    </button>
                                    <button type="submit" className="btn btn-primary submit-btn">
                                        Place Order
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>

                    {/* Checkout Summary Sidebar */}
                    <div className="checkout-sidebar bg-light">
                        <div className="summary-items">
                            {cartItems.map(item => (
                                <div key={`${item.id}-${item.size}`} className="summary-item">
                                    <div className="summary-item-img">
                                        <img src={item.image} alt={item.name} />
                                        <span className="summary-qty">{item.quantity}</span>
                                    </div>
                                    <div className="summary-item-info">
                                        <p className="summary-item-name">{item.name}</p>
                                        <p className="summary-item-var">{(item.color || 'Standard')} / {item.size}</p>
                                    </div>
                                    <p className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <hr className="divider" />

                        <div className="discount-form">
                            <input type="text" placeholder="Gift card or discount code" />
                            <button className="btn btn-outline">Apply</button>
                        </div>

                        <hr className="divider" />

                        <div className="summary-totals">
                            <div className="total-row">
                                <span>Subtotal</span>
                                <span>${subtotal?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div className="total-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="total-row final-total">
                                <span>Total</span>
                                <span>${total?.toFixed(2) || '0.00'}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;
