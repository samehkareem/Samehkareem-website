import React, { useState } from 'react';
import './CheckoutPage.css';

function CheckoutPage({ cartItems, clearCart }) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Function to calculate the total price
    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => total + parseFloat(item.price.replace(/[^0-9.]/g, '') || 0), 0)
            .toFixed(2); // Ensure the total is formatted to two decimal places
    };

    const handleCheckout = async () => {
        try {
            const response = await fetch('http://localhost:555/checkout', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems }),
            });

            if (response.ok) {
                setSuccess('Checkout successful! Thank you for your purchase.');
                clearCart();
                setTimeout(() => {
                    window.location.href = '/home';
                }, 2000);
            } else {
                const message = await response.text();
                setError(message || 'An error occurred during checkout.');
            }
        } catch (err) {
            setError('An error occurred during checkout.');
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-summary">
                        <h3>Your Items</h3>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <strong className="cart-item-name">{item.name}</strong> - {item.price}
                                        <p className="cart-item-description">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <h4 className="cart-total">Total: ${calculateTotal()}</h4>
                    </div>
                    <div className="payment-section">
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <button onClick={handleCheckout} className="checkout-btn">
                            Complete Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CheckoutPage;
