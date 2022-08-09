import React from "react";
import { Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";
import "./index.css";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route
            path="/cryptocurrencies"
            exact
            element={<Cryptocurrencies />}
          />
          <Route path="/crypto/:coinId" exact element={<CryptoDetails />} />
          <Route path="/news" exact element={<News />} />
        </Routes>
        <div className="footer">
          <Link to="/">
            <Typography variant="h6">CryptoStats</Typography>
          </Link>
          <Typography>All rights reserved</Typography>
          <div style={{ marginTop: 10 }}>
            <b>
              <Link to="/">Home</Link>
              <Link style={{ marginInline: 20 }} to="/cryptocurrencies">
                Cryptocurrencies
              </Link>
              <Link to="/news">News</Link>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
