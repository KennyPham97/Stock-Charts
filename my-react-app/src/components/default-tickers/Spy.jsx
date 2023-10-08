import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const Spy = () => {
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=TEPTNV3NRFJ3ZKWQ`
      )
      .then((response) => {
        console.log("Stock Data Response:", response.data);
        

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
  const chartLayout = {
    title: "S&P 500 Daily Price",
    xaxis: { title: "Date" },
    yaxis: { title: "Closing Price" },
    plot_bgcolor: "FFF5E0",        
    paper_bgcolor: "white",        
    font: { color: "black" },      
    margin: {
      l: 60,                    
      r: 20,                      
      t: 60,                      
      b: 60                       
    },
    hovermode: "x",               
  };

  return (
    <div>
      <h2>S&P 500 ETF</h2>
      <Plot data={chartData} layout={chartLayout} />
      
    </div>
  );
};

export default Spy;
