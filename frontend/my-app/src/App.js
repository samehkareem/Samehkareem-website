import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './LoginPage';
import SignUpPage from './SignUpPage';
import Homepage from './homepage';
import MenPage from './Men';
import WomenPage from './women';
import Cart from './Cart';
import CheckoutPage from './CheckoutPage'; // Import the CheckoutPage component

function App() {
  const [currentPage, setCurrentPage] = useState('LoginPage');  // Default to LoginPage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]); // State for cart items

  useEffect(() => {
    const userID = document.cookie.split('; ').find(row => row.startsWith('userID='));
    if (userID) {
      setIsAuthenticated(true);
      setCurrentPage('homepage'); // Redirect to homepage if already logged in
    }
  }, []);  // Empty array ensures this runs only once when the component mounts

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('homepage'); // Redirect to homepage after successful login
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="App">
      {currentPage === 'LoginPage' && (
        <Login navigateTo={navigateTo} onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'SignUpPage' && <SignUpPage navigateTo={navigateTo} />}
      {currentPage === 'homepage' && isAuthenticated && <Homepage navigateTo={navigateTo} />}
      {currentPage === 'MenPage' && (
        <MenPage addToCart={addToCart} navigateTo={navigateTo} />
      )}
      {currentPage === 'WomenPage' && (
        <WomenPage addToCart={addToCart} navigateTo={navigateTo} />
      )}
      {currentPage === 'Cart' && (
        <Cart items={cartItems} removeFromCart={removeFromCart} />
      )}
      {currentPage === 'CheckoutPage' && (
        <CheckoutPage cartItems={cartItems} clearCart={clearCart} />
      )}
      {currentPage !== 'LoginPage' && currentPage !== 'SignUpPage' && (
        <nav className="nav">
          <button onClick={() => navigateTo('homepage')}>Home</button>
          <button onClick={() => navigateTo('LoginPage')}>Login</button>
          <button onClick={() => navigateTo('SignUpPage')}>Register</button>
          <button onClick={() => navigateTo('MenPage')}>Men's Clothing</button>
          <button onClick={() => navigateTo('WomenPage')}>Women's Clothing</button>
          <button onClick={() => navigateTo('Cart')}>Cart</button>
          <button onClick={() => navigateTo('CheckoutPage')}>Checkout</button>
        </nav>
      )}
    </div>
  );
}

export default App;
