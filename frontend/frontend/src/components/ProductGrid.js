import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/style.css"

const ProductGrid = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductsByCategory();
  }, [category]);

  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product/filterByCategory?category=${category._id}`); // Update the API route as per your backend setup
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products.imageUrl)

  return (
    <div>
         <h1 style={{ color: '#99c2ff', WebkitTextStroke: '1.5px black', paddingBottom: '50px', fontSize: '48px', textAlign: 'center'}} >{category.name}</h1>
           
    <div className="product-grid">
          {products.map((product) => (
        <button key={product._id} className="product-button">
          <img src={product.imageUrl}  />
          <h3>{product.name}</h3>
        </button>
      ))}
    </div>
    </div>
  );
};

export default ProductGrid;
