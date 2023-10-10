// import React, { useState } from 'react';
// import axios from 'axios';

// const API_KEY = "TEPTNV3NRFJ3ZKWQ";

// const News = () => {
//   const [newsData, setNewsData] = useState([]);

//   const getNews = () => {
//     axios
//       .get(
//         `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=${API_KEY}`
//       )
//       .then((response) => {
//         console.log("News Data:", response.data);
//         setNewsData(response.data.feed);
//       });
//   };

//   return (
//     <div>
//       <button onClick={getNews}>Get News</button>
//       <div>
//         <ul>
//           {newsData.map((feed, index) => (
//             <li key={index}>
//               <h2>
//                 <a href={feed.url} target="_blank">
//                   {feed.title} ({feed.source})
//                 </a>
//               </h2>
//               <h3>{feed.summary}</h3>
//               <h3>Overall Sentiment: {feed.overall_sentiment_label}</h3>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default News;

import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = "TEPTNV3NRFJ3ZKWQ";

const News = ({ tickerToFetch }) => { // Accept tickerToFetch as a prop
  const [newsData, setNewsData] = useState([]);

  const getNews = () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${tickerToFetch}&apikey=${API_KEY}`
      )
      .then((response) => {
        console.log("News Data:", response.data);
        setNewsData(response.data.feed);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  };

  return (
    <div>
      <button onClick={getNews}>Get News</button>
      <div>
        {newsData.length > 0 ? (
          <ul>
            {newsData.map((feed, index) => (
              <li key={index}>
                <h2>
                  <a href={feed.url} target="_blank">
                    {feed.title} ({feed.source})
                  </a>
                </h2>
                <h3>{feed.summary}</h3>
                <h3>Overall Sentiment: {feed.overall_sentiment_label}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news data available.</p>
        )}
      </div>
    </div>
  );
};

export default News;
