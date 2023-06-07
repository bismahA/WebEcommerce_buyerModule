import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import ProductGrid from './components/ProductGrid'


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<ProductGrid />} />
        
        {/* Add more routes as needed */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
