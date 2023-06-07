import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useLocation,useNavigate} from "react-router-dom"
import "../css/style.css"

const ProductGrid = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const category=location.state?.category1;
  const [products, setProducts] = useState([]);
  const id=category? category._id:''
  

  useEffect(() => {
    fetchProductsByCategory();
  }, [category]);

  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product/filterByCategory?category=${id}`); // Update the API route as per your backend setup
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products.imageUrl)

  const handleProductClick = (product) => {
       
    // setSelectedCategory(category1);
     navigate("/productDetails",{state:{product:product}})
     
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
                        <Link className='navLink' to="/">Cart</Link>
                        </li>
                    </ul>
                </nav>
            </nav>

        
         <h1 style={{ color: '#99c2ff', WebkitTextStroke: '1.5px black', paddingBottom: '50px', fontSize: '48px', textAlign: 'center'}} >{category ? category.name : ''}</h1>
           
    <div className="product-grid">
          {products.map((product) => (
        <button key={product._id} className="product-button" onClick={()=>handleProductClick(product)}>
          <img src={product.imageUrl}  />
          <h3>{product.name}</h3>
        </button>
      ))}
    </div>
    </div>
  );
};

export default ProductGrid;
