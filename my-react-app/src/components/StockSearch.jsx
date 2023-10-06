import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "./StockSearch.css";
import FiveMinuteChart from "./FiveMinuteChart";

const API_KEY = "TEPTNV3NRFJ3ZKWQ";

const StockSearch = () => {
  const [ticker, setTicker] = useState("");
  const [stockData, setStockData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [tickerNotFound, setTickerNotFound] = useState(false);
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);
  const [showFiveMinuteChart, setShowFiveMinuteChart] = useState(false);

  const fetchStockData = (tickerToFetch) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickerToFetch}&apikey=${API_KEY}`
      )
      .then((response) => {
        console.log("Stock Data Response:", response.data);
        setStockData(response.data["Time Series (Daily)"]);

        const dates = [];
        const closes = [];

        for (const date in response.data["Time Series (Daily)"]) {
          const closeValue =
            response.data["Time Series (Daily)"][date]["4. close"];
          dates.unshift(date);
          closes.unshift(parseFloat(closeValue));
        }

        setDateList(dates);
        setCloseList(closes);
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
        setTickerNotFound(true);
        setStockData({});
        setCompanyInfo({});
      });

    axios
      .get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${tickerToFetch}&apikey=${API_KEY}`
      )
      .then((response) => {
        console.log("Company Info Response:", response.data);
        setCompanyInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching company info:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!ticker) {
      setTickerNotFound(true);
    } else {
      setTickerNotFound(false);
      fetchStockData(ticker);
    }
  };
  const handleShowFiveMinuteChart = () => {
    setShowFiveMinuteChart(true); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Stock Ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className="input-field"
        />
        <button type="submit">Submit</button>
      </form>

      {submitted && tickerNotFound && <p>Ticker not found</p>}

      {submitted && !tickerNotFound && dateList.length > 0 && (
        <div>
          <ul>
            <p>
              {companyInfo.Name}({companyInfo.Symbol})
            </p>
            <p>Industry: {companyInfo.Industry}</p>
            <p>Sector: {companyInfo.Sector}</p>
            <p>{companyInfo.Description}</p>
          </ul>

          <Plot
            data={[
              {
                x: dateList,
                y: closeList,
                type: "scatter",
                mode: "lines",
                marker: { color: "black" },
              },
            ]}
            layout={{
              title: `${ticker} Daily Stock Price`,
              xaxis: { title: "Date" },
              yaxis: { title: "Closing Price" },
              plot_bgcolor: "FFF5E0",
            }}
          />

          <div>
            <button onClick={handleShowFiveMinuteChart}>
              Show 5 Minute Chart
            </button>
          </div>

          {showFiveMinuteChart && <FiveMinuteChart ticker={ticker} />}
        </div>
      )}
    </div>
  );
};

export default StockSearch;
