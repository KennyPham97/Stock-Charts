import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const SP500 = () => {
  const [stockData, setStockData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=TEPTNV3NRFJ3ZKWQ`
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
      });
    axios
      .get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=SPY&apikey=TEPTNV3NRFJ3ZKWQ`
      )
      .then((response) => {
        console.log("Company Info Response:", response.data);
        setCompanyInfo(response.data);
      });
  }, []);

  const chartData = [
    {
      x: dateList,
      y: closeList,
      type: "scatter",
      mode: "lines",
      marker: { color: "black" },
    },
  ];

  // const chartLayout = {
  //   title: "S&P 500 Daily Price",
  //   xaxis: { title: "Date" },
  //   yaxis: { title: "Closing Price" },
  //   plot_bgcolor: "FFF5E0",
  //   paper_bgcolor: 'white'
  // };
  const chartLayout = {
    title: "S&P 500 Daily Price",
    xaxis: { title: "Date" },
    yaxis: { title: "Closing Price" },
    plot_bgcolor: "FFF5E0",        // Background color of the plot area
    paper_bgcolor: "white",        // Background color of the entire chart
    font: { color: "black" },      // Font color
    margin: {
      l: 60,                      // Left margin
      r: 20,                      // Right margin
      t: 60,                      // Top margin
      b: 60                       // Bottom margin
    },
    hovermode: "x",               // Display hover info on x-axis
  };

  return (
    <div>
      <h2>S&P 500 ETF</h2>
      <Plot data={chartData} layout={chartLayout} />
    </div>
  );
};

export default SP500;
