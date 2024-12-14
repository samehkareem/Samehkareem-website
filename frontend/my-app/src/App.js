import React, { useState } from 'react';
import './App.css';
import Login from './LoginPage';
import SignUpPage from './SignUpPage';
import Homepage from './homepage';
import MenPage from './Men';
import WomenPage from './women';
import Cart from './Cart';
import CheckoutPage from './CheckoutPage';
import NavBar from './NavBar'; // Import the NavBar component

function App() {
  const [currentPage, setCurrentPage] = useState('LoginPage');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('homepage');
  };

  const addToCart = (item) => {
    // Add full product details to the cart
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="app-wrapper">
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

      {/* Render NavBar for all pages except Login and Register */}
      {currentPage !== 'LoginPage' && currentPage !== 'SignUpPage' && (
        <NavBar navigateTo={navigateTo} />
      )}
    </div>
  );
}

export default App;
