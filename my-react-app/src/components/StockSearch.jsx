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
  const [chartType, setChartType] = useState("line");
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);
  const [openList, setOpenList] = useState([]);
  const [highList, setHighList] = useState([]);
  const [lowList, setLowList] = useState([]);
  const [showFiveMinuteChart, setShowFiveMinuteChart] = useState(false);

  const fetchStockData = (tickerToFetch) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickerToFetch}&apikey=${API_KEY}`
      )
      .then((response) => {
        console.log("Stock Data:", response.data);
        setStockData(response.data["Time Series (Daily)"]);

        const dates = [];
        const closes = [];
        const opens = [];
        const highs = [];
        const lows = [];

        for (const date in response.data["Time Series (Daily)"]) {
          const dailyData = response.data["Time Series (Daily)"][date];
          const closeValue = parseFloat(dailyData["4. close"]);
          const openValue = parseFloat(dailyData["1. open"]);
          const highValue = parseFloat(dailyData["2. high"]);
          const lowValue = parseFloat(dailyData["3. low"]);

          dates.unshift(date);
          closes.unshift(closeValue);
          opens.unshift(openValue);
          highs.unshift(highValue);
          lows.unshift(lowValue);
        }

        setDateList(dates);
        setCloseList(closes);
        setOpenList(opens);
        setHighList(highs);
        setLowList(lows);
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
        console.log("Company Info:", response.data);
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
    setShowFiveMinuteChart(!showFiveMinuteChart);
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
        <button className="submit-button" type="submit">
          Submit
        </button>
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
            <p
              style={{
                maxWidth: "400px",
                wordWrap: "break-word",
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              {companyInfo.Description}
            </p>
          </ul>

          <div>
            <label htmlFor="chartType">Select Chart Type:</label>
            <select
              id="chartType"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="line">Line Chart</option>
              <option value="candlestick">Candlestick Chart</option>
            </select>
          </div>

          {chartType === "line" ? (
            <Plot
              data={[
                {
                  x: dateList,
                  y: closeList,
                  type: "scatter",
                  mode: "lines",
                  marker: { color: "orange" },
                },
              ]}
              layout={{
                title: `${ticker} Daily Stock Price`,
                xaxis: {
                  title: "Date",
                  titlefont: {
                    color: "white",
                    family: "Arial, sans-serif",
                    size: 18,
                  },
                  tickfont: {
                    color: "white",
                    family: "Arial, sans-serif",
                    size: 14,
                  },
                  gridcolor: "grey",
                },
                yaxis: {
                  title: "Closing Price",
                  titlefont: {
                    color: "white",
                    family: "Arial, sans-serif",
                    size: 18,
                  },
                  tickfont: {
                    color: "white",
                    family: "Arial, sans-serif",
                    size: 14,
                  },
                  gridcolor: "grey",
                },
                plot_bgcolor: "black",
                paper_bgcolor: "black",
                font: {
                  color: "white",
                  family: "Arial, sans-serif",
                  size: 14,
                },
                margin: {
                  r: 10,
                  t: 60,
                  b: 40,
                  l: 60,
                },
                hovermode: "x",
              }}
            />
          ) : (
            <Plot
              data={[
                {
                  x: dateList,
                  open: openList,
                  high: highList,
                  low: lowList,
                  close: closeList,
                  type: "candlestick",
                  xaxis: "x2",
                  yaxis: "y2",
                },
              ]}
              layout={{
                title: {
                  text: `${ticker} Daily Candlestick Chart`,
                  font: {
                    color: "white", 
                    family: "Arial, sans-serif", 
                    size: 18, 
                  },
                },
                plot_bgcolor: "black",
                paper_bgcolor: "black",
                dragmode: "zoom",
                margin: {
                  r: 10,
                  t: 60,
                  b: 40,
                  l: 60,
                },
                hovermode: "x",
                showlegend: false,
                xaxis: {
                  autorange: true,
                  domain: [0, 2],
                  type: "date",
                  tickformat: "%Y-%m-%d",
                  range: [dateList[dateList.length - 1], dateList[0]],
                  title: {
                    text: "Date",
                    font: {
                      color: "white", 
                      family: "Arial, sans-serif", 
                      size: 18, 
                    },
                  },
                  tickfont: {
                    color: "white", 
                    family: "Arial, sans-serif", 
                    size: 14, 
                  },
                },
                yaxis: {
                  title: {
                    text: "Price",
                    font: {
                      color: "white", 
                      family: "Arial, sans-serif", 
                      size: 18, 
                    },
                  },
                  tickfont: {
                    color: "white", 
                    family: "Arial, sans-serif", 
                    size: 14, 
                  },
                },
                font: {
                  color: "white",
                  family: "Arial, sans-serif",
                  size: 14, 
                },
              }}
            />
          )}
          <div>
            <button onClick={handleShowFiveMinuteChart}>
              {showFiveMinuteChart
                ? "Hide 5 Minute Chart"
                : "Show 5 Minute Chart"}
            </button>
          </div>

          {showFiveMinuteChart && <FiveMinuteChart ticker={ticker} />}
        </div>
      )}
    </div>
  );
};

export default StockSearch;
