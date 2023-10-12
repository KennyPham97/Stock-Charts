import React, { useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "../styles/StockSearch.css";
import FiveMinuteChart from "./FiveMinuteChart";
import News from "./News";

const API_KEY = import.meta.env.VITE_SOME_KEY;

const StockSearch = () => {
  const [ticker, setTicker] = useState("");
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
        if (response.data["Time Series (Daily)"]) {
          console.log("Stock Data:", response.data);
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
          setTickerNotFound(false);
        } else {
          setTickerNotFound(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
        setTickerNotFound(true);
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

    if (!ticker || ticker.length < 1 || ticker.length > 5) {
      setTickerNotFound(true);
    } else {
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
          onChange={(e) => {
            const input = e.target.value;
            const letterInput = input.replace(/[^A-Za-z]/g, "");
            setTicker(letterInput);
          }}
          className="input-field"
          maxLength={5}
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>

      {submitted && tickerNotFound && <p>Please enter a valid stock ticker</p>}

      {submitted && !tickerNotFound && dateList.length > 0 && (
        <div>
          <div className="company-info">
            <h2>{companyInfo.Name} ({companyInfo.Symbol})</h2>
            <p>Industry: {companyInfo.Industry}</p>
            <p>Sector: {companyInfo.Sector}</p>
            <p style={{ maxWidth: '400px', wordWrap: 'break-word', textAlign: 'center', margin: '0 auto' }}>
              {companyInfo.Description}
            </p>
          </div>

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

          <div className="fiveMinuteButton">
            <button className="submit-button"onClick={handleShowFiveMinuteChart}>
              {showFiveMinuteChart
                ? "Hide 5 Min Chart"
                : "Show 5 Min Chart"}
            </button>
          </div>

          {showFiveMinuteChart && <FiveMinuteChart ticker={ticker} />}

          <News tickerToFetch={ticker} API_KEY={API_KEY} />
        </div>
      )}
    </div>
  );
};

export default StockSearch;
