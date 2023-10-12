import React from "react";
import image1 from "../assets/market.jpeg";
import image2 from "../assets/market2.jpeg";
import image3 from "../assets/market3.jpeg";


function Features() {
  return (
    <div>
      <div >
        <h3>Search Function</h3>
        <p>Search over 2400 stocks in the NYSE.</p>
        <img src={image1} style={{ width: "400px" }} alt="Feature 1" />
      </div>
      <div >
        <h3>Advanced Stock Charts</h3>
        <p>Toggle between line and candlestick charts.</p>
        <img src={image2} style={{ width: "400px" }} alt="Feature 2" />
      </div>
      <div>
        <h3>Watchlist</h3>
        <p>Add and remove stocks from your watchlist</p>
        <img src={image3} style={{ width: "400px" }} alt="Feature 3" />
      </div>
      <div>
        <h3>News</h3>
        <p>Get the latest news on stocks with sentiment tracker</p>
        <img src={image3} style={{ width: "400px" }} alt="Feature 4" />
      </div>
    </div>
  );
}

export default Features;
