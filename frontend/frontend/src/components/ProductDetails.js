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

    const handleAddToCart = async() => {
        // Perform the action to add the product to the cart
        const productId = product._id; // Assuming product._id is the ID of the selected product
        const quantity = selectedQuantity; // Assuming selectedQuantity is the selected quantity from the dropdown
        let token = '';

        // Check if the user is logged in and retrieve the token from localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            token = storedToken;
        }

        try {
            // Make a POST request to the addToCart route with the product ID, quantity, and token
            const response = await axios.post('http://localhost:3000/cart/addProduct', { productId, quantity }, {
                headers: {
                    'token': token
                }
            });

            console.log(response.data);
            alert("Product Added!") // Handle the response as needed

        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert("errr chal nikal you loser")
            // Handle the error
        }



       // console.log('Product added to cart:', product);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/home">دورہ فِروشی سینٹر</Link>
                </div>
                <nav>
                    <ul id="MenuItems">
                        <li>
                            <Link className='navLink' to="/home">Home</Link>
                        </li>
                        <li>
                            <Link className='navLink' to="/cart">Cart</Link>
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