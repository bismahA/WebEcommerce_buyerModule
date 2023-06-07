import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom"
import "../css/style.css"

const ProductDetails = () => {
    const location = useLocation();
    const product = location.state?.product;
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const quantityOptions = Array.from({ length: product.quantity }, (_, index) => index + 1);

    const handleQuantityChange = (event) => {
        setSelectedQuantity(parseInt(event.target.value));
    };

    const handleAddToCart = () => {
        // Perform the action to add the product to the cart
        console.log('Product added to cart:', product);
    };

    return (
        <div>
          <nav className="navbar">
                <div className="logo">
                    <Link to="/">دورہ فِروشی سینٹر</Link>
                </div>
                <nav>
                    <ul id="MenuItems">
                        <li>
                            <Link className='navLink' to="/">Home</Link>
                        </li>
                        <li>
                        <Link className='navLink' to="/">Cart</Link>
                        </li>
                    </ul>
                </nav>
            </nav>
        
        <div className="product-detail">
          <div className="product-container">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Brand: {product.brand}</p>
              <p>Price: ${product.price}</p>
              <select value={selectedQuantity} onChange={handleQuantityChange}>
                {quantityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button >Write Review</button>
            </div>
          </div>
        </div>
        </div>
      );
}

export default ProductDetails;