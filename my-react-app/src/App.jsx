import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import NavBar from './components/NavBar';
import Apple from './components/Apple';
import Amazon from './components/Amazon';
import Tesla from './components/Tesla';
import Alphabet from './components/Alphabet';
import Netflix from './components/Netflix';
import Facebook from './components/Facebook';
import './App.css'

const API_KEY = 'TEPTNV3NRFJ3ZKWQ'; 

const App = () => {
  const [ticker, setTicker] = useState('');
  const [chartData, setChartData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`
      );

      const data = response.data['Time Series (Daily)'];

      // Extract dates and closing prices for chart data
      const chartLabels = Object.keys(data).reverse();
      const chartPrices = chartLabels.map((date) => parseFloat(data[date]['4. close']));

      // Create the chart data object
      const chartData = {
        labels: chartLabels,
        datasets: [
          {
            label: `${ticker} Stock Price`,
            data: chartPrices,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <h1>STOCKS.KP</h1>
      <h3>Welcome to STOCKS.KP, where you can get daily data on your favorite stocks.</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter stock ticker'
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>

      {chartData && (
        <div>
          <h2>{ticker} Stock Chart</h2>
          <Line data={chartData} />
        </div>
      )}

      <h3>or choose from some popular stocks here:</h3>
      <NavBar />
      <Routes>
        <Route path="/apple" element={<Apple />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/amazon" element={<Amazon />} />
        <Route path="/netflix" element={<Netflix />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/tesla" element={<Tesla />} />
      </Routes>
    </div>
  );
};

export default App;
