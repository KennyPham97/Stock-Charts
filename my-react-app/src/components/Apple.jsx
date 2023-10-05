import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const SYMBOL = 'AAPL';
const Apple = () => {
  const [stockData, setStockData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=TEPTNV3NRFJ3ZKWQ`)
      .then((response) => {
        console.log('Stock Data Response:', response.data);
        setStockData(response.data['Time Series (Daily)']);
      });
    axios
      .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${SYMBOL}&apikey=TEPTNV3NRFJ3ZKWQ`)
      .then((response) => {
        console.log('Company Info Response:', response.data);
        setCompanyInfo(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Apple Stock Data</h2>
      <div>
        <h3>Company Information</h3>
        <ul>
          <li>Symbol: {companyInfo.Symbol}</li>
          <li>Name: {companyInfo.Name}</li>
          <li>Industry: {companyInfo.Industry}</li>
          <li>Market Cap: {companyInfo.MarketCapitalization}</li>
          
        </ul>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stockData).map((date) => (
            <tr key={date}>
              <td>{date}</td>
              <td>{stockData[date]['1. open']}</td>
              <td>{stockData[date]['2. high']}</td>
              <td>{stockData[date]['3. low']}</td>
              <td>{stockData[date]['4. close']}</td>
              <td>{stockData[date]['5. volume']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Apple;

