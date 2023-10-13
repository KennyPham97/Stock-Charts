import React, { useState } from "react";
import "../styles/WatchList.css";

const WatchList = () => {
  const [ticker, setTicker] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  const handleAddTicker = () => {
    if (ticker.trim() !== "") {
      setWatchlist([...watchlist, { symbol: ticker, priority: "medium" }]);
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
          onChange={(e) => {
            const input = e.target.value;
            const letterInput = input.replace(/[^A-Za-z]/g, "");
            setTicker(letterInput);
          }}
          maxLength={5}
        />
      </div>
      <div className="add-to-list-button">
        <button className="button" onClick={handleAddTicker}>
          Add to Watchlist
        </button>
      </div>

      <ul className="watchlist">
        {watchlist.map((stock, index) => (
          <li key={index} className="list-item">
            <span className="stock-symbol">{stock.symbol}</span>
            <div className="priority-buttons">
              <label>
                <input
                  type="radio"
                  name={`priority-${index}`}
                  value="low"
                  checked={stock.priority === "low"}
                  onChange={() => {
                    const updatedWatchlist = [...watchlist];
                    updatedWatchlist[index].priority = "low";
                    setWatchlist(updatedWatchlist);
                  }}
                />
                Lo
              </label>
              <label>
                <input
                  type="radio"
                  name={`priority-${index}`}
                  value="medium"
                  checked={stock.priority === "medium"}
                  onChange={() => {
                    const updatedWatchlist = [...watchlist];
                    updatedWatchlist[index].priority = "medium";
                    setWatchlist(updatedWatchlist);
                  }}
                />
                Med
              </label>
              <label>
                <input
                  type="radio"
                  name={`priority-${index}`}
                  value="high"
                  checked={stock.priority === "high"}
                  onChange={() => {
                    const updatedWatchlist = [...watchlist];
                    updatedWatchlist[index].priority = "high";
                    setWatchlist(updatedWatchlist);
                  }}
                />
                Hi
              </label>
            </div>
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
