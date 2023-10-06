// import React, { useState } from 'react';
// import axios from 'axios';
// import "./StockSearch.css";


// const API_KEY = 'TEPTNV3NRFJ3ZKWQ';

// const StockSearch = () => {
//   const [ticker, setTicker] = useState('');
//   const [stockData, setStockData] = useState({});
//   const [companyInfo, setCompanyInfo] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [tickerNotFound, setTickerNotFound] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitted(true);

//     if (!ticker) {
//       setTickerNotFound(true);
//       return;
//     }

//     try {
//       const [stockResponse, companyResponse] = await Promise.all([
//         axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`),
//         axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`)
//       ]);

//       const stockData = stockResponse.data['Time Series (Daily)'];
//       const companyInfo = companyResponse.data;

//       setStockData(stockData);
//       setCompanyInfo(companyInfo);
//       setTickerNotFound(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setTickerNotFound(true);
//       setStockData({});
//       setCompanyInfo({});
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type='text'
//           placeholder='Stock Ticker'
//           value={ticker}
//           onChange={(e) => setTicker(e.target.value)}
//           className='input-field'
//         />
//         <button type='submit'>Submit</button>
//       </form>

//       {submitted && tickerNotFound && (
//         <p>Ticker not found</p>
//       )}

//       {submitted && !tickerNotFound && stockData && Object.keys(stockData).length > 0 && (
//         <div>
//           <h3>Company Information</h3>
//           <ul>
//             <p>Symbol: {companyInfo.Symbol}</p>
//             <p>Name: {companyInfo.Name}</p>
//             <p>Industry: {companyInfo.Industry}</p>
//             <p>Sector: {companyInfo.Sector}</p>
//             <p>Market Cap: {companyInfo.MarketCapitapzation}</p>
//             <p>Description: {companyInfo.Description}</p>
//           </ul>

//           <table>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Open</th>
//                 <th>High</th>
//                 <th>Low</th>
//                 <th>Close</th>
//                 <th>Volume</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(stockData).map((date) => (
//                 <tr key={date}>
//                   <td>{date}</td>
//                   <td>{stockData[date]['1. open']}</td>
//                   <td>{stockData[date]['2. high']}</td>
//                   <td>{stockData[date]['3. low']}</td>
//                   <td>{stockData[date]['4. close']}</td>
//                   <td>{stockData[date]['5. volume']}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockSearch;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './StockSearch.css';

const API_KEY = 'TEPTNV3NRFJ3ZKWQ';

const StockSearch = () => {
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState({});
  const [companyInfo, setCompanyInfo] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [tickerNotFound, setTickerNotFound] = useState(false);
  const [dateList, setDateList] = useState([]);
  const [closeList, setCloseList] = useState([]);

  useEffect(() => {
    if (!ticker) return;

    axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`)
      .then((response) => {
        console.log('Stock Data Response:', response.data);
        setStockData(response.data['Time Series (Daily)']);

        const dates = [];
        const closes = [];

        for (const date in response.data['Time Series (Daily)']) {
          const closeValue = response.data['Time Series (Daily)'][date]['4. close'];
          dates.unshift(date); 
          closes.unshift(parseFloat(closeValue));
        }

        setDateList(dates);
        setCloseList(closes);
      })
      .catch((error) => {
        console.error('Error fetching stock data:', error);
        setTickerNotFound(true);
        setStockData({});
        setCompanyInfo({});
      });

    axios
      .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`)
      .then((response) => {
        console.log('Company Info Response:', response.data);
        setCompanyInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching company info:', error);
      });
  }, [ticker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!ticker) {
      setTickerNotFound(true);
    } else {
      setTickerNotFound(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Stock Ticker'
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          className='input-field'
        />
        <button type='submit'>Submit</button>
      </form>

      {submitted && tickerNotFound && (
        <p>Ticker not found</p>
      )}

      {submitted && !tickerNotFound && dateList.length > 0 && (
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

          <Plot
            data={[
              {
                x: dateList,
                y: closeList,
                type: 'scatter',
                mode: 'lines',
                marker: { color: 'black' },
              },
            ]}
            layout={{
              title: `${ticker} Stock Price`,
              xaxis: { title: 'Date' },
              yaxis: { title: 'Closing Price' },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StockSearch;
