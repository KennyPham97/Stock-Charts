import React from 'react';
import StockSearch from './StockSearch'; // Import your StockSearch component

const StockSurferPro = () => {
  return (
    <div>
      <h2>StockSurfer Pro</h2>
      <h3>Search for any stock ticker:</h3>
      <StockSearch /> {/* Include your StockSearch component here */}
      {/* You can also add other advanced features for Stocki Pro users */}
    </div>
  );
};

export default StockSurferPro;
