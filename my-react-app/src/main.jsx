import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";

const refreshPageToHome = () => {
  window.location.reload();
};

function HomeButton() {
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/pro") {
      refreshPageToHome();
    } else {
      window.location.href = "/";
    }
  };

  return <button onClick={handleClick}>HOME</button>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HomeButton />
      <App />
      <HomeButton />
    </BrowserRouter>
  </React.StrictMode>
);

