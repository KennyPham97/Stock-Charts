import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Spy from "./components/default-tickers/Spy";
import Apple from "./components/default-tickers/Apple";
import Amazon from "./components/default-tickers/Amazon";
import Tesla from "./components/default-tickers/Tesla";
import Alphabet from "./components/default-tickers/Alphabet";
import Netflix from "./components/default-tickers/Netflix";
import Facebook from "./components/default-tickers/Facebook";
import StockSearch from "./components/StockSearch";
import StockSurferPro from "./components/StockSurferPro";
import chartIcon from "./assets/chart-icon.png";
import "./App.css";

const App = () => {
  const [showStockSurferPro, setShowStockSurferPro] = useState(false);

  const handleGetStockSurferProClick = () => {
    setShowStockSurferPro(true);
  };

  return (
    <div className="app-container">
      <div>
        <img className="chart-icon" src={chartIcon} alt="Chart Icon"></img>
        <h1 className="header">StockSurfer</h1>
        <h3>
          Welcome to StockSurfer, where you can get data on your favorite
          stocks.
        </h3>
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
        <h3>
          Interested in additional features? Click here to learn more about
          StockSurfer Pro
        </h3>
        <button
          className="stock-surfer-pro-button"
          onClick={handleGetStockSurferProClick}
        >
          Get StockSurfer Pro
        </button>
        {showStockSurferPro && <StockSurferPro />}
      </div>
    </div>
  );
};

export default App;
