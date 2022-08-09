import React from "react";
import { MenuList, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import {
  CurrencyBitcoinRounded,
  HomeRounded,
  NewspaperRounded,
} from "@mui/icons-material";

import "./Navbar.css";

function Navbar() {
  return (
    <div className="nav-container" theme="light">
      <div className="logo-container">
        <Link to="/">
          <CurrencyBitcoinRounded fontSize={"large"} />
          <h2>CryptoStats</h2>
        </Link>
      </div>
      <MenuList>
        <Link to="/">
          <MenuItem>
            <ListItemIcon>
              <HomeRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/cryptocurrencies">
          <MenuItem>
            <ListItemIcon>
              <CurrencyBitcoinRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cryptocurrencies</ListItemText>
          </MenuItem>
        </Link>
        <Link to="/news">
          <MenuItem>
            <ListItemIcon>
              <NewspaperRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText>News</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </div>
  );
}

export default Navbar;
