import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'TEPTNV3NRFJ3ZKWQ';

const StockSearch = () => {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [tickerNotFound, setTickerNotFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!ticker) {
      setTickerNotFound(true);
      return;
    }

    try {
      const [stockResponse, companyResponse] = await Promise.all([
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`),
        axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`)
      ]);

      const stockData = stockResponse.data['Time Series (Daily)'];
      const companyInfo = companyResponse.data;

      setStockData(stockData);
      setCompanyInfo(companyInfo);
      setTickerNotFound(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTickerNotFound(true);
      setStockData({});
      setCompanyInfo({});
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter stock ticker'
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>

      {submitted && tickerNotFound && (
        <p>Ticker not found</p>
      )}

      {submitted && !tickerNotFound && stockData && Object.keys(stockData).length > 0 && (
        <div>
          <h3>Company Information</h3>
          <ul>
            <li>Symbol: {companyInfo.Symbol}</li>
            <li>Name: {companyInfo.Name}</li>
            <li>Industry: {companyInfo.Industry}</li>
            <li>Market Cap: {companyInfo.MarketCapitalization}</li>
          </ul>

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
      )}
    </div>
  );
};

export default StockSearch;

