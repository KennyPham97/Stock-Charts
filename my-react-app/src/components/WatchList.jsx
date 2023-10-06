import React, { useState } from "react";
import "./WatchList.css";

const WatchList = () => {
  const [ticker, setTicker] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  const handleAddTicker = () => {
    if (ticker.trim() !== "") {
      setWatchlist([...watchlist, { symbol: ticker }]);
      setTicker("");
    }
  };

  const handleRemoveTicker = (index) => {
    const newWatchlist = [...watchlist];
    newWatchlist.splice(index, 1);
    setWatchlist(newWatchlist);
  };

  return (
    <div className="everything">
      <div className="add-to-list-button">
      <input
        className="input-field"
        placeholder="Stock Ticker"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />

      </div>
      <div className="add-to-list-button">
        <button onClick={handleAddTicker}>
          Add to Watchlist
        </button>
      </div>

      <ul className="watchlist">
        {watchlist.map((stock, index) => (
          <li key={index} className="list-item">
            <span className="stock-symbol">{stock.symbol}</span>
            <button
              className="remove-button"
              onClick={() => handleRemoveTicker(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
