import React from 'react';
import './Cart.css';

function Cart({ items, removeFromCart }) {
  return (
    <div>
      <header>
        <nav>
          <div className="logo">PureStitch</div>
        </nav>
      </header>

      <section className="cart-section">
        <h2>Your Cart</h2>
        {items.length > 0 ? (
          <ul className="cart-list">
            {items.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </section>
    </div>
  );
}

export default Cart;
