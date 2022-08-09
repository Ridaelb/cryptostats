import React from "react";
import { Grid } from "@mui/material";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { News, Cryptocurrencies, Loader, Statistic } from "../../components";
import "./Homepage.css";

function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  return (
    <>
      <h1>Crypto Global Stats</h1>
      <Grid spacing={2} container>
        {isFetching ? (
          <Grid item><Loader /></Grid>
        ) : (
          <>
            <Grid item md={4} sm={6} xs={12}>
              <Statistic
                title="Total Cryptocurrencies"
                value={millify(globalStats.total)}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Statistic
                title="Total Exchanges"
                value={millify(globalStats.totalExchanges)}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Statistic
                title="Total Market Cap"
                value={millify(globalStats.totalMarketCap)}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Statistic
                title="Total 24h Volume"
                value={millify(globalStats.total24hVolume)}
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Statistic
                title="Total markets"
                value={millify(globalStats.totalMarkets)}
              />
            </Grid>
          </>
        )}
      </Grid>
      <div className="home-heading-container">
        <h1>Top 10 Cryptocurrencies in the world</h1>
        <h4 className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </h4>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <h1>Latest Crypto News</h1>
        <h4 className="show-more">
          <Link to="/news">Show more</Link>
        </h4>
      </div>
      <News simplified />
    </>
  );
}

export default Homepage;
