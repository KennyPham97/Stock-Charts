import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Link } from 'react-router-dom';

const refreshPageToHome = () => {
  window.location.href = '/'; 
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <button onClick={refreshPageToHome}>HOME</button>
      <App />
      <button onClick={refreshPageToHome}>HOME</button>
    </BrowserRouter>
  </React.StrictMode>,
);


