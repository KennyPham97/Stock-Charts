import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const Tesla = () => {
  const [companyInfo, setCompanyInfo] = useState({});
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=TEPTNV3NRFJ3ZKWQ`)
      .then((response) => {
        console.log('Stock Data:', response.data);

        const dates = [];
        const closes = [];

        for (const date in response.data['Time Series (Daily)']) {
          const closeValue = response.data['Time Series (Daily)'][date]['4. close'];
          dates.unshift(date); 
          closes.unshift(parseFloat(closeValue));
        }

        setDateList(dates);
        setCloseList(closes);
      });
    axios
      .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=TSLA&apikey=TEPTNV3NRFJ3ZKWQ`)
      .then((response) => {
        console.log('Company Info:', response.data);
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
    title: 'Tesla Stock Daily Price',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Closing Price' },
    plot_bgcolor: 'FFF5E0',
  };

  return (
    <div>
      <h2>Tesla Stock Data</h2>
      <div>
        <ul>
          <p>{companyInfo.Name}({companyInfo.Symbol})</p>
          <p>Industry: {companyInfo.Industry}</p>
          <p>Sector: {companyInfo.Sector}</p>
          <p style={{ maxWidth: '400px', wordWrap: 'break-word', textAlign: 'center', margin: '0 auto' }}>
            {companyInfo.Description}
          </p>
        </ul>
      </div>
      <Plot data={chartData} layout={chartLayout} />
    </div>
  );
};

export default Tesla;
