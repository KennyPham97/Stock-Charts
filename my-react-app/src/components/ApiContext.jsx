// ApiContext.js
import React, { createContext, useContext } from 'react';

// Create a context for the API configuration
const ApiContext = createContext();

// Create a provider component to wrap your app with the API configuration
export function ApiProvider({ children }) {
  // Define your API base URL and API key here
  const apiUrl = 'https://www.alphavantage.co';
  const apiKey = 'TEPTNV3NRFJ3ZKWQ'; // Replace with your actual Alpha Vantage API key

  return (
    <ApiContext.Provider value={{ apiUrl, apiKey }}>
      {children}
    </ApiContext.Provider>
  );
}

// Create a custom hook to use the API configuration
export function useApiConfig() {
  return useContext(ApiContext);
}
