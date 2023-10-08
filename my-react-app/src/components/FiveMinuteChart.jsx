import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const API_KEY = 'TEPTNV3NRFJ3ZKWQ';

const FiveMinuteChart = ({ ticker }) => {
  const [fiveMinuteDateList, setFiveMinuteDateList] = useState([]);
  const [fiveMinuteOpenList, setFiveMinuteOpenList] = useState([]);
  const [fiveMinuteHighList, setFiveMinuteHighList] = useState([]);
  const [fiveMinuteLowList, setFiveMinuteLowList] = useState([]);
  const [fiveMinuteCloseList, setFiveMinuteCloseList] = useState([]);
  const [showFiveMinuteChart, setShowFiveMinuteChart] = useState(false);
  const [chartType, setChartType] = useState('line');

  const fetchFiveMinuteData = (tickerToFetch) => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${tickerToFetch}&interval=5min&apikey=${API_KEY}`
      )
      .then((response) => {
        console.log('5 Minute Chart Data Response:', response.data);

        const dates = [];
        const opens = [];
        const highs = [];
        const lows = [];
        const closes = [];

        for (const date in response.data['Time Series (5min)']) {
          const data = response.data['Time Series (5min)'][date];
          const openValue = parseFloat(data['1. open']);
          const highValue = parseFloat(data['2. high']);
          const lowValue = parseFloat(data['3. low']);
          const closeValue = parseFloat(data['4. close']);

          dates.unshift(date);
          opens.unshift(openValue);
          highs.unshift(highValue);
          lows.unshift(lowValue);
          closes.unshift(closeValue);
        }

        setFiveMinuteDateList(dates);
        setFiveMinuteOpenList(opens);
        setFiveMinuteHighList(highs);
        setFiveMinuteLowList(lows);
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

  const toggleChartType = () => {
    setChartType(chartType === 'line' ? 'candlestick' : 'line');
  };

  return (
    <div>
      {showFiveMinuteChart && (
        <div>
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
          <Plot
            data={[
              {
                x: fiveMinuteDateList,
                y: chartType === 'line' ? fiveMinuteCloseList : undefined,
                open: chartType === 'candlestick' ? fiveMinuteOpenList : undefined,
                high: chartType === 'candlestick' ? fiveMinuteHighList : undefined,
                low: chartType === 'candlestick' ? fiveMinuteLowList : undefined,
                close: chartType === 'candlestick' ? fiveMinuteCloseList : undefined,
                type: chartType === 'line' ? 'scatter' : 'candlestick',
                mode: chartType === 'line' ? 'lines' : '',
                marker:
                  chartType === 'line'
                    ? { color: 'orange' }
                    : {
                        color: 'orange',
                        line: { width: 1 },
                        decreasing: { line: { color: 'red' } },
                      },
              },
            ]}
            layout={{
              title: `${ticker} 5-Minute Stock Price`,
              xaxis: {
                title: '',
                titlefont: {
                  color: 'white',
                  family: 'Arial, sans-serif',
                  size: 18,
                },
                tickfont: {
                  color: 'white',
                  family: 'Arial, sans-serif',
                  size: 14,
                },
                gridcolor: chartType === 'candlestick' ? 'rgba(0,0,0,0)' : 'grey',
              },
              yaxis: {
                title: 'Price',
                titlefont: {
                  color: 'white',
                  family: 'Arial, sans-serif',
                  size: 18,
                },
                tickfont: {
                  color: 'white',
                  family: 'Arial, sans-serif',
                  size: 14,
                },
                gridcolor: chartType === 'candlestick' ? 'rgba(0,0,0,0)' : 'grey',
              },
              plot_bgcolor: 'black',
              paper_bgcolor: 'black',
              font: {
                color: 'white',
                family: 'Arial, sans-serif',
                size: 14,
              },
              margin: {
                r: 10,
                t: 60,
                b: 40,
                l: 60,
              },
              hovermode: 'x',
              showlegend: false,
              xaxis2: {
                autorange: true,
                domain: [0, 1],
                type: 'date',
                tickformat: '%Y-%m-%d',
                title: 'Date',
                titlefont: {
                  color: 'white',
                  family: 'Arial, sans-serif',
                  size: 18,
                },
                tickfont: {
                  color: 'white',
                  family: 'Arial, sans-serif',
                  size: 14,
                },
              },
              yaxis2: {
                autorange: false,
                range: [
                  Math.min(...fiveMinuteCloseList),
                  Math.max(...fiveMinuteCloseList),
                ],
                domain: [0.6, 1],
                type: 'linear',
                title: {
                  text: 'Price',
                  font: {
                    color: 'white',
                    family: 'Arial, sans-serif',
                    size: 18,
                  },
                },
                tickfont: {
                  color: 'white',
                  family: 'Arial, sans-serif',
                  size: 14,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FiveMinuteChart;


