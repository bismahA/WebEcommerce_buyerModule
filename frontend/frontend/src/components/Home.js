import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import ProductGrid from "./ProductGrid"
import "../css/style.css"

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);


    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/category/viewCat'); // Update the API route as per your backend setup
            setCategories(response.data);

        } catch (error) {
            console.log(error);
        }
    };
    console.log(categories)
    const handleCategoryClick = (category1) => {
        // Pass the category ID and name as props to the ProductGrid component
        // You can navigate to a different route or perform any other action as per your requirement
        setSelectedCategory(category1);
        console.log('Category ID:', category1._id);
        console.log('Category Name:', category1.name);
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

            <h1 style={{ color: '#99c2ff', WebkitTextStroke: '1.5px black', paddingBottom: '50px', fontSize: '48px', textAlign: 'center'}} >Categories of Product</h1>
            <div className="category-grid">
                {categories.map((category) => (
                    <button key={category._id} onClick={() => handleCategoryClick(category)}>{category.name}</button>
                    
                ))}
            </div>
            {selectedCategory && <ProductGrid category={selectedCategory} />}
        </div>
    );
};

export default Home;
