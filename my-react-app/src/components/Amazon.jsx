// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';

// const Amazon = () => {
//   const [companyInfo, setCompanyInfo] = useState({});
//   const [dateList, setDateList] = useState([]);
//   const [closeList, setCloseList] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AMZN&apikey=TEPTNV3NRFJ3ZKWQ`)
//       .then((response) => {
//         console.log('Stock Data:', response.data);

//         const dates = [];
//         const closes = [];

//         for (const date in response.data['Time Series (Daily)']) {
//           const closeValue = response.data['Time Series (Daily)'][date]['4. close'];
//           dates.unshift(date); 
//           closes.unshift(parseFloat(closeValue));
//         }

//         setDateList(dates);
//         setCloseList(closes);
//       });
//     axios
//       .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=AMZN&apikey=TEPTNV3NRFJ3ZKWQ`)
//       .then((response) => {
//         console.log('Company Info:', response.data);
//         setCompanyInfo(response.data);
//       });
//   }, []);

//   const chartData = [
//     {
//       x: dateList,
//       y: closeList,
//       type: 'scatter',
//       mode: 'lines',
//       marker: { color: 'black' },
//     },
//   ];

//   const chartLayout = {
//     title: 'Amazon Stock Daily Price',
//     xaxis: { title: 'Date' },
//     yaxis: { title: 'Closing Price' },
//     plot_bgcolor: 'FFF5E0',
//   };

//   return (
//     <div>
//       <h2>Amazon Stock Data</h2>
//       <div>
//         <ul>
//           <p>{companyInfo.Name}({companyInfo.Symbol})</p>
//           <p>Industry: {companyInfo.Industry}</p>
//           <p>Sector: {companyInfo.Sector}</p>
//           <p style={{ maxWidth: '400px', wordWrap: 'break-word', textAlign: 'center', margin: '0 auto' }}>
//             {companyInfo.Description}
//           </p>
//         </ul>
//       </div>
//       <Plot data={chartData} layout={chartLayout} />
//     </div>
//   );
// };

// export default Amazon;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { useApiConfig } from './ApiContext';

const Amazon = () => {
  const { apiUrl, apiKey } = useApiConfig(); 
  const symbol = 'AMZN'; 

  const [companyInfo, setCompanyInfo] = useState({});
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);

  useEffect(() => {
    
    axios
      .get(`${apiUrl}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`)
      .then((response) => {
        console.log('Stock Data',response.data)
        
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
      .get(`${apiUrl}/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`)
      .then((response) => {
        console.log('Company Data',response.data)
        
        setCompanyInfo(response.data);
      });
  }, [apiUrl, apiKey, symbol]);

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
    title: 'Amazon Stock Daily Price',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Closing Price' },
    plot_bgcolor: 'FFF5E0',
  };

  return (
    <div>
      <h2>Amazon Stock Data</h2>
      <div>
        <ul>
          <p>{companyInfo.Name} ({companyInfo.Symbol})</p>
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

export default Amazon;
