// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Tesla = () => {
//   const [stockData, setStockData] = useState({});
//   const [companyInfo, setCompanyInfo] = useState({});

//   useEffect(() => {
//     axios
//       .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=TEPTNV3NRFJ3ZKWQ`)
//       .then((response) => {
//         console.log('Stock Data Response:', response.data);
//         setStockData(response.data['Time Series (Daily)']);
//       });
//     axios
//       .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=TSLA&apikey=TEPTNV3NRFJ3ZKWQ`)
//       .then((response) => {
//         console.log('Company Info Response:', response.data);
//         setCompanyInfo(response.data);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Tesla Stock Data</h2>
//       <div>
//         <h3>Company Information</h3>
//         <ul>
//           <p>Symbol: {companyInfo.Symbol}</p>
//           <p>Name: {companyInfo.Name}</p>
//           <p>Industry: {companyInfo.Industry}</p>
//           <p>Sector: {companyInfo.Sector}</p>
//           <p>Market Cap: {companyInfo.MarketCapitalization}</p>
//           <p>Description: {companyInfo.Description}</p>
          
//         </ul>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Open</th>
//             <th>High</th>
//             <th>Low</th>
//             <th>Close</th>
//             <th>Volume</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(stockData).map((date) => (
//             <tr key={date}>
//               <td>{date}</td>
//               <td>{stockData[date]['1. open']}</td>
//               <td>{stockData[date]['2. high']}</td>
//               <td>{stockData[date]['3. low']}</td>
//               <td>{stockData[date]['4. close']}</td>
//               <td>{stockData[date]['5. volume']}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Tesla;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const Tesla = () => {
  const [stockData, setStockData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=TSLA&apikey=TEPTNV3NRFJ3ZKWQ`)
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
      .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=TSLA&apikey=TEPTNV3NRFJ3ZKWQ`)
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
    title: 'Tesla Stock Daily Price',
    xaxis: { title: 'Date' },
    yaxis: { title: 'Closing Price' },
  };

  return (
    <div>
      <h2>Tesla Stock Data</h2>
      <div>
        <h3>Company Information</h3>
        <ul>
          <p>Symbol: {companyInfo.Symbol}</p>
          <p>Name: {companyInfo.Name}</p>
          <p>Industry: {companyInfo.Industry}</p>
          <p>Sector: {companyInfo.Sector}</p>
          <p>Market Cap: {companyInfo.MarketCapitalization}</p>
          <p>Description: {companyInfo.Description}</p>
        </ul>
      </div>
      <Plot data={chartData} layout={chartLayout} />
    </div>
  );
};

export default Tesla;
