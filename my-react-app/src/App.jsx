import React, { useState, useEffect, createContext } from "react";
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
import Features from "./components/Features";
import "./App.css";

export const ApiContext = createContext();

const App = () => {
  const [apiURL, setApiURL] = useState(
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}"
  );
  const apiKEY = import.meta.env.VITE_SOME_KEY;

  const location = useLocation();
  const [showFeatures, setShowFeatures] = useState(false);

  const handleFeaturesClick = () => {
    setShowFeatures(!showFeatures);
  };

  const handleGetStockSurferProClick = () => {
    window.location.href = "https://buy.stripe.com/test_cN26pIcJz5gtc92fZ1";
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
      document.querySelector(".app-container").classList.add("pro");
    } else {
      document.querySelector(".app-container").classList.remove("pro");
    }
  }, [isProRoute]);

  return (
    <div className="app-container">
      <div>
        <img className="chart-icon" src={chartIcon} alt="Chart Icon" />
        <h1 className="header">StockSurfer</h1>
        <h3>
          Welcome to StockSurfer, where you can get data on your favorite
          stocks.
        </h3>
        {isProRoute ? null : <NavBar />}
        <ApiContext.Provider value={{ apiKEY, apiURL }}>
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
        </ApiContext.Provider>
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
              <div
                className={`feature-columns ${showFeatures ? "visible" : ""}`}
              >
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
        
        <footer style={{marginTop:"100px"}}>
          <p>Created by Kenny Pham &copy; 2023</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
