import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Apple from './components/Apple';
import Amazon from './components/Amazon';
import Tesla from './components/Tesla';
import Alphabet from './components/Alphabet';
import Netflix from './components/Netflix';
import Facebook from './components/Facebook';
import StockSearch from './components/StockSearch';
import StockiPro from './components/StockiPro';
import './App.css';

const App = () => {
  const [showStockiPro, setShowStockiPro] = useState(false);

  const handleGetStockiProClick = () => {
    setShowStockiPro(true);
  };

  return (
    <div className="app-container">
      <h1 className='header'>STOCKI</h1>
      <div>
        <h3>Welcome to STOCKI, where you can get daily data on your favorite stocks.</h3>
        <h3>Choose from some popular stocks here:</h3>
        <NavBar />
        <Routes>
          <Route path="/apple" element={<Apple />} />
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/amazon" element={<Amazon />} />
          <Route path="/netflix" element={<Netflix />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/tesla" element={<Tesla />} />
          <Route path="/search" element={<StockSearch />} />
        </Routes>
        <h3>Get Stocki Pro to search any ticker and more advanced features</h3>
        <button onClick={handleGetStockiProClick}>Get Stocki Pro</button>
        {showStockiPro && <StockiPro />}
      </div>
    </div>
  );
};

export default App;



