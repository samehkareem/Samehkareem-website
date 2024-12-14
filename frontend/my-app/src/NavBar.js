
import React from 'react';
import './NavBar.css'; 

function NavBar({ navigateTo }) {
  return (
    <nav className="nav">
      <button onClick={() => navigateTo('homepage')}>Home</button>
      <button onClick={() => navigateTo('LoginPage')}>Login</button>
      <button onClick={() => navigateTo('SignUpPage')}>Register</button>
      <button onClick={() => navigateTo('MenPage')}>Men's Clothing</button>
      <button onClick={() => navigateTo('WomenPage')}>Women's Clothing</button>
      <button onClick={() => navigateTo('Cart')}>Cart</button>
      <button onClick={() => navigateTo('CheckoutPage')}>Checkout</button>
    </nav>
  );
}

export default NavBar;
