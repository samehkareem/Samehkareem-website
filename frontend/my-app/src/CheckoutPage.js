import React, { useState } from 'react';
import './CheckoutPage.css';

function CheckoutPage({ cartItems, clearCart }) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCheckout = async () => {
        try {
            const response = await fetch('http://localhost:3000/checkout', {
                method: 'POST',
                credentials: 'include', // Ensures cookies are sent with the request
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems }), // Send cart items to the server
            });

            console.log('Response status:', response.status); // Debugging info
            if (response.ok) {
                setSuccess('Checkout successful! Thank you for your purchase.');
                clearCart(); // Clear cart after successful checkout

                // Redirect to home page after a delay
                setTimeout(() => {
                    window.location.href = '/home';
                }, 2000);
            } else {
                const message = await response.text();
                setError(message || 'An error occurred during checkout.');
            }
        } catch (err) {
            console.error('Network error:', err);
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
                                <li key={index}>
                                    {item.model} - {item.price}
                                </li>
                            ))}
                        </ul>
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
