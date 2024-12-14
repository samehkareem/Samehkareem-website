import React from 'react';
import './homepage.css';

const Home = () => {
  return (
    <div>
      <header className="header">
        <h1>Welcome to PureStitch</h1>
      </header>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="#categories">Shop</a>
      </nav>
      <div className="hero">
        <h1>Style for Every Season</h1>
        <p>Discover the latest trends. Shop now</p>
      </div>
      <section id="categories" className="categories">
        <div className="category">
          <img
            src="https://i.pinimg.com/originals/56/83/3f/56833fc135b72c855df60c78ccbf3644.png"
            alt="Men's Clothing"
          />
          <h3>Men's Clothing</h3>
          
        </div>
        <div className="category">
          <img
            src="https://www.alfabb.com/attachments/giulia-gti-jpg.1123209/"
            alt="Women's Clothing"
          />
          <h3>Women's Clothing</h3>
          
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2024 Clothing Store.</p>
      </footer>
    </div>
  );
};

export default Home;