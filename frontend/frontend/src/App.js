import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import ProductGrid from './components/ProductGrid'
import ProductDetails from './components/ProductDetails'


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productGrid" element={<ProductGrid />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        
        
        {/* Add more routes as needed */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
