import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const API_KEY = 'TEPTNV3NRFJ3ZKWQ';

const FiveMinuteChart = ({ ticker }) => {
  const [fiveMinuteDateList, setFiveMinuteDateList] = useState([]);
  const [fiveMinuteCloseList, setFiveMinuteCloseList] = useState([]);
  const [showFiveMinuteChart, setShowFiveMinuteChart] = useState(false);

  const fetchFiveMinuteData = (tickerToFetch) => {
    axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickerToFetch}&interval=5min&apikey=${API_KEY}`)
      .then((response) => {
        console.log('5 Minute Chart Data Response:', response.data);

        const dates = [];
        const closes = [];

        for (const date in response.data['Time Series (5min)']) {
          const closeValue = response.data['Time Series (5min)'][date]['4. close'];
          dates.unshift(date);
          closes.unshift(parseFloat(closeValue));
        }

        setFiveMinuteDateList(dates);
        setFiveMinuteCloseList(closes);
        setShowFiveMinuteChart(true);
      })
      .catch((error) => {
        console.error('Error fetching 5-minute chart data:', error);
      });
  };

  useEffect(() => {
    if (ticker) {
      fetchFiveMinuteData(ticker);
    }
  }, [ticker]);

  return (
    <div>
      {showFiveMinuteChart && (
        <div>
          <h2>5-Minute Chart</h2>
          <Plot
            data={[
              {
                x: fiveMinuteDateList,
                y: fiveMinuteCloseList,
                type: 'scatter',
                mode: 'lines',
                marker: { color: 'blue' },
              },
            ]}
            layout={{
              title: `${ticker} 5-Minute Stock Price`,
              xaxis: { title: 'Date' },
              yaxis: { title: 'Closing Price' },
              plot_bgcolor: 'FFF5E0',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FiveMinuteChart;
