import React, { useEffect, useState, useContext} from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { ApiContext } from "../App";

const Spy = () => {
  const symbol = "SPY";
  const [chartData, setChartData] = useState([]);
  const { apiKEY, apiURL } = useContext(ApiContext);

  useEffect(() => {
    axios
      .get(
        `${apiURL}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKEY}`
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
  }, [apiKEY, symbol]);

  const chartLayout = {
    title: "S&P 500 Daily Price",
    xaxis: { title: "Date" },
    yaxis: { title: "Closing Price" },
    plot_bgcolor: "FFF5E0",
    margin: {
      l: 50,
      r: 20, 
      t: 50, 
      b: 50  
    }
  };

  return (
    <div>
      <h2>S&P 500 ETF (SPY)</h2>
      <Plot data={chartData} layout={chartLayout} />
    </div>
  );
};

export default Spy;
