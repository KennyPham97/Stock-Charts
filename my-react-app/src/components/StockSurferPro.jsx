import React from 'react';
import StockSearch from './StockSearch'; 
import WatchList from './WatchList';
import '../styles/StockSurferPro.css';

const StockSurferPro = () => {
  return (
    <div>
      <h2 className='h2'>StockSurfer Pro</h2>
      <div className='pro-features'>
        <h3>Search for any stock ticker:</h3>
        <h3>Watchlist</h3>
      </div>
      <div className='input-field-container'>
        <div className='left-container'>
          <StockSearch />
        </div>
        <div className='right-container'>
          <WatchList />
        </div>
      </div>
    </div>
  );
};

export default StockSurferPro;

