import React from "react";
import image1 from "../assets/SearchFunction.png";
import image2 from "../assets/market3.jpeg";
import image3 from "../assets/WatchList.png";
import image4 from "../assets/NewsFeed.png";

function Features() {
  return (
    <div>
      <div>
        <h2 style={{ marginBottom: "2px" }}>Pro Search</h2>
        <h3 style={{ marginTop: "2px" }}>
          Search for over 2400 stocks in the NYSE.
        </h3>
        <img src={image1} style={{ width: "500px", borderRadius: "10px" }} alt="Feature 1" />
      </div>
      <div>
        <h2 style={{ marginBottom: "2px" }}>Advanced Stock Charts</h2>
        <h3 style={{ marginTop: "2px" }}>
          Toggle between line and candlestick charts.
        </h3>
        <img src={image2} style={{ width: "500px", borderRadius: "10px" }} alt="Feature 2" />
      </div>
      <div>
        <h2 style={{ marginBottom: "2px" }}>Watchlist</h2>
        <h3 style={{ marginTop: "2px" }}>
          Add and remove stocks from your watchlist.
        </h3>
        <img src={image3} style={{ width: "500px", borderRadius: "10px" }} alt="Feature 3" />
      </div>
      <div>
        <h2 style={{ marginBottom: "2px" }}>News</h2>
        <h3 style={{ marginTop: "2px" }}>
          Get the latest news on stocks with sentiment tracker.
        </h3>
        <img src={image4} style={{ width: "500px", borderRadius: "10px" }} alt="Feature 4" />
      </div>
    </div>
  );
}

export default Features;
