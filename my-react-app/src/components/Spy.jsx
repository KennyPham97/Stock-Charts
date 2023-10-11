import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const API_KEY = import.meta.env.VITE_SOME_KEY;

const Spy = () => {
  const symbol = "SPY";
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
      )
      .then((response) => {
        console.log("Stock Data", response.data);

        const data = {
          x: [],
          y: [],
          type: "scatter",
          mode: "lines",
          marker: { color: "black" },
        };

        for (const date in response.data["Time Series (Daily)"]) {
          const closeValue = parseFloat(
            response.data["Time Series (Daily)"][date]["4. close"]
          );
          data.x.unshift(date);
          data.y.unshift(closeValue);
        }

        setChartData([data]);
      });
  }, [API_KEY, symbol]);

  const chartLayout = {
    title: "S&P 500 Stock Daily Price",
    xaxis: { title: "Date" },
    yaxis: { title: "Closing Price" },
    plot_bgcolor: "FFF5E0",
  };

  return (
    <div>
      <h2>S&P 500 ETF (SPY)</h2>
      <Plot data={chartData} layout={chartLayout} />
    </div>
  );
};

export default Spy;
