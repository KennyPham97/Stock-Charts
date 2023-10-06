import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const SP500 = () => {
  const [stockData, setStockData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=TEPTNV3NRFJ3ZKWQ`)
      .then((response) => {
        console.log('Stock Data Response:', response.data);
        setStockData(response.data['Time Series (Daily)']);

        const dates = [];
        const closes = [];

        for (const date in response.data['Time Series (Daily)']) {
          const closeValue = response.data['Time Series (Daily)'][date]['4. close'];
          dates.unshift(date); // Reverse order to show the latest date first
          closes.unshift(parseFloat(closeValue));
        }

        setDateList(dates);
        setCloseList(closes);
      });
    axios
      .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=SPY&apikey=TEPTNV3NRFJ3ZKWQ`)
      .then((response) => {
        console.log('Company Info Response:', response.data);
        setCompanyInfo(response.data);
      });
  }, []);

  const chartData = [
    {
      x: dateList,
      y: closeList,
      type: 'scatter',
      mode: 'lines',
      marker: { color: 'black' },
    },
  ];

  const chartLayout = {
    title: 'S&P 500 Daily Price',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Closing Price' },
  };

  return (
    <div>
      <h2>S&P 500 ETF</h2>
      <div>
        {/* <h3>Company Information</h3>
        <ul>
          <p>Symbol: {companyInfo.Symbol}</p>
          <p>Name: {companyInfo.Name}</p>
          <p>Industry: {companyInfo.Industry}</p>
          <p>Sector: {companyInfo.Sector}</p>
          <p>Market Cap: {companyInfo.MarketCapitalization}</p>
          <p>Description: {companyInfo.Description}</p>
        </ul> */}
      </div>
      <Plot data={chartData} layout={chartLayout} />
    </div>
  );
};

export default SP500;
