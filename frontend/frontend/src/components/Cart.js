import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';
import "../css/style.css"

const Cart = () => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:3000/cart/viewCart', {
                headers: {
                    'token': token
                }
            });

            setCart(response.data.cart);

        } catch (error) {
            console.error('Error retrieving cart:', error);
        }
    };

    const handleEditProduct = (productId) => {
        // Implement your edit logic here
    };

    const handleDeleteProduct = (productId) => {
        // Implement your delete logic here
    };

    const handleCheckout = () => {
        // Implement your checkout logic here
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


            <div className="cart">
                <h2>Cart</h2>

                {cart ? (
                    <div>
                        {/* {cart.products.map((product) => (
                            <div key={product._id}>
                                <p>Product Name: {product.product.name}</p>
                                <p>Quantity: {product.quantity}</p>
                                <p>Individual Price: ${product.price}</p>
                                <button onClick={() => handleEditProduct(product.product._id)}>Edit</button>
                                <button onClick={() => handleDeleteProduct(product.product._id)}>Delete</button>
                            </div> */}
                            {cart.products.map((product) => (
    <div key={product._id} className="product-container">
      <div className="product-image">
        <img src={product.product.image} alt={product.product.name} />
      </div>
      <div className="product-details">
        <p>Product Name: {product.product.name}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Individual Price: ${product.price}</p>
        <button onClick={() => handleEditProduct(product.product._id)}>Edit</button>
        <button onClick={() => handleDeleteProduct(product.product._id)}>Delete</button>
      </div>
    </div>
                        ))}

                        <p>Total Price: ${cart.totalPrice}</p>
                        <button onClick={handleCheckout}>Checkout</button>
                    </div>
                ) : (
                    <p>Loading cart...</p>
                )}
            </div>

        </div>
    );

}

export default Cart;