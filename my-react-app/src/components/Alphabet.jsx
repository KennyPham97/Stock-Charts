import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { ApiContext } from '../App';



const Alphabet = () => {
  const symbol = 'GOOGL'; 
  const { apiKEY, apiURL } = useContext(ApiContext);
  const [companyInfo, setCompanyInfo] = useState({});
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiURL}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKEY}`)
      .then((response) => {
        console.log('Stock Data', response.data);
        
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
      .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKEY}`)
      .then((response) => {
        console.log('Company Data', response.data);
        
        setCompanyInfo(response.data);
      });
  }, [apiKEY, symbol]);

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
    title: 'Alphabet Stock Daily Price', 
    xaxis: { title: 'Date' },
    yaxis: { title: 'Closing Price' },
    plot_bgcolor: 'FFF5E0',
    margin: {
      l: 50,
      r: 20, 
      t: 50, 
      b: 50  
    }
  };

  return (
    <div>
      <div>
        <ul>
          <h2>{companyInfo.Name} ({companyInfo.Symbol})</h2>
          <p>Industry: {companyInfo.Industry}</p>
          <p>Sector: {companyInfo.Sector}</p>
        </ul>
      </div>
      <Plot data={chartData} layout={chartLayout} />
    </div>
  );
};

export default Alphabet;
