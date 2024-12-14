import React from 'react';
import './product.css';

function WomenProducts({ addToCart, navigateTo }) {
  const products = [
    {
      id: 1,
      name: "Black Short-Sleeve Top",
      price: "$17",
      image: "https://hourscollection.com/cdn/shop/files/CroppedT-shirt-Black_1000x.png?v=1713990555",
    },
    {
      id: 2,
      name: "Black Top",
      price: "$17",
      image: "https://image.spreadshirtmedia.com/image-server/v1/productTypes/876/views/1/appearances/2,width=650,height=800,backgroundColor=f2f2f2.png",
    },
    {
      id: 3,
      name: "Blue Top",
      price: "$25",
      image: "https://image.spreadshirtmedia.com/image-server/v1/productTypes/876/views/1/appearances/823,width=650,height=800,backgroundColor=f2f2f2.png",
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    navigateTo("Cart");
  };

  return (
    <div className="App">
      <header>
        <h1>Women's Products</h1>
      </header>

      <section className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button
              className="add-to-cart"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default WomenProducts;
