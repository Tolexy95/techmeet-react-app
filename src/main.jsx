import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import UserTokenProvider from "./context/UserTokenProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserTokenProvider>
        <App/>
      </UserTokenProvider>
    </Router>
  </React.StrictMode>
);