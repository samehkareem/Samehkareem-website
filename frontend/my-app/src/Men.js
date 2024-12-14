import React from 'react';
import './product.css';

function MenProducts({ addToCart, navigateTo }) {
  const products = [
    {
      id: 1,
      name: "Black T-Shirt",
      price: "$17",
      image: "https://png.pngtree.com/png-clipart/20230607/ourmid/pngtree-black-t-shirt-mockup-new-model-realistic-png-image_7122610.png",
    },
    {
      id: 2,
      name: "Blue T-Shirt",
      price: "$17",
      image: "https://static.vecteezy.com/system/resources/thumbnails/050/176/712/small_2x/men-s-blue-t-shirt-isolated-on-transparent-background-png.png",
    },
    {
      id: 3,
      name: "Black SweatPants",
      price: "$25",
      image: "https://blanksbythirteen.com/cdn/shop/products/13-black-sweatpants-back-224477.png?v=1709599445&width=1200",
    },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    navigateTo("Cart");
  };

  return (
    <div className="App">
      <header>
        <h1>Men's Products</h1>
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

export default MenProducts;
