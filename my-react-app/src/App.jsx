import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Spy from "./components/Spy";
import Apple from "./components/Apple";
import Amazon from "./components/Amazon";
import Tesla from "./components/Tesla";
import Alphabet from "./components/Alphabet";
import Netflix from "./components/Netflix";
import Facebook from "./components/Facebook";
import StockSearch from "./components/StockSearch";
import StockSurferPro from "./components/StockSurferPro";
import chartIcon from "./assets/chart-icon.png";
import "./App.css";
import Features from "./components/Features";

const App = () => {
  const location = useLocation();
  const [showFeatures, setShowFeatures] = useState(false);

  const handleFeaturesClick = () => {
    setShowFeatures(!showFeatures);
  };

  const handleGetStockSurferProClick = () => {
    window.location.href = "https://buy.stripe.com/test_fZe7tM5h7eR3dd6146";
  };

  const isProRoute = location.pathname === "/pro";

  useEffect(() => {
    if (isProRoute) {
      document.body.classList.add("pro");
    } else {
      
      document.body.classList.remove("pro");
    }
  }, [isProRoute]);

  useEffect(() => {
    if (isProRoute) {
      
      document.querySelector('.app-container').classList.add('pro');
    } else {
      
      document.querySelector('.app-container').classList.remove('pro');
    }
  }, [isProRoute]);

  return (
    <div className="app-container">
      <div>
        <img className="chart-icon" src={chartIcon} alt="Chart Icon" />
        <h1 className="header">StockSurfer</h1>
        <h3>
          Welcome to StockSurfer, where you can get data on your favorite stocks.
        </h3>
        {isProRoute ? null : <NavBar />}
        <Routes>
          <Route path="*" element={<Spy />} />
          <Route path="/" element={<Spy />} />
          <Route path="/spy" element={<Spy />} />
          <Route path="/apple" element={<Apple />} />
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/amazon" element={<Amazon />} />
          <Route path="/netflix" element={<Netflix />} />
          <Route path="/alphabet" element={<Alphabet />} />
          <Route path="/tesla" element={<Tesla />} />
          <Route path="/search" element={<StockSearch />} />
          <Route path="/pro" element={<StockSurferPro />} />
        </Routes>
        {isProRoute ? null : (
          <div>
            <div>
              <h3>
                Interested in additional features? Click the button below to
                learn more about StockSurfer Pro.
              </h3>
              <button className="feature-button" onClick={handleFeaturesClick}>
                Why StockSurfer Pro?
              </button>
              <div className={`feature-columns ${showFeatures ? "visible" : ""}`}>
                {showFeatures && <Features />}
              </div>
            </div>
            <div>
              <button
                className="stock-surfer-pro-button"
                onClick={handleGetStockSurferProClick}
              >
                Get StockSurfer Pro
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
