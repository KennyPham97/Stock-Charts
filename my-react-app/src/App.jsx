import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Spy from './components/Spy';
import Apple from './components/Apple';
import Amazon from './components/Amazon';
import Tesla from './components/Tesla';
import Alphabet from './components/Alphabet';
import Netflix from './components/Netflix';
import Facebook from './components/Facebook';
import StockSearch from './components/StockSearch';
import StockSurferPro from './components/StockSurferPro';
import chartIcon from './images/chart-icon.png'; 
import './App.css';

const App = () => {
  const [showStockSurferPro, setShowStockSurferPro] = useState(false);

  const handleGetStockSurferProClick = () => {
    setShowStockSurferPro(true);
  };

  return (
    <div className="app-container">
      <div>
      <img className ='chart-icon'src={chartIcon} alt="Chart Icon"></img>
      <h1 className='header'>StockSurfer</h1>
      
        <h3>Welcome to StockSurfer, where you can get data on your favorite stocks.</h3>
        <h3>Choose from some popular stocks here:</h3>
        <NavBar />
        <Routes>
          <Route path="/" element={<Spy />} />
          <Route path="/spy" element={<Spy />} />
          <Route path="/apple" element={<Apple />} />
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/amazon" element={<Amazon />} />
          <Route path="/netflix" element={<Netflix />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/tesla" element={<Tesla />} />
          <Route path="/search" element={<StockSearch />} />
        </Routes>
        <h3>Get StockSurfer Pro to search any ticker and more advanced features</h3>
        <button onClick={handleGetStockSurferProClick}>Get StockSurfer Pro</button>
        {showStockSurferPro && <StockSurferPro />}
      </div>
    </div>
  );
};

export default App;



