import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";

import millify from "millify";

import {
  useGetCryptoDetailsQuery
} from "../../services/cryptoApi";
import Loader from "../common/Loader";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import {
  Grid,
  Typography,
} from "@mui/material";

import Statistic from "../common/Statistic";
import { CancelRounded } from "@mui/icons-material";

function CryptoDetails() {
  const { coinId } = useParams();
  const { data, isFetching: fetchDets } = useGetCryptoDetailsQuery(coinId);
  const [coinDetails, setCoinDetails] = useState();

  const stats = [
    { title: "Rank", value: coinDetails?.rank },
    { title: "Current Price", value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`, },
    { title: "24h Volume", value: `$ ${coinDetails && millify(coinDetails["24hVolume"])}`, },
    { title: "Market Cap", value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`, },
    { title: "All-time-high(daily avg.)", value: `$ ${ coinDetails?.allTimeHigh?.price && millify(coinDetails?.allTimeHigh?.price) }`, },
  ];

  const genericStats = [
    { title: "Number Of Markets", value: coinDetails?.numberOfMarkets },
    { title: "Number Of Exchanges", value: coinDetails?.numberOfExchanges },
    { title: "Aprroved Supply", value: coinDetails?.supply?.confirmed ? ( <CheckCircleOutlineRoundedIcon /> ) : ( <CancelRounded /> ), },
    { title: "Total Supply", value: `$ ${ coinDetails?.supply?.total && millify(coinDetails?.supply?.total) }`, },
    { title: "Circulating Supply", value: `$ ${ coinDetails?.supply?.circulating && millify(coinDetails?.supply?.circulating) }`, },
  ];

  useEffect(() => {
    setCoinDetails(data?.data?.coin);
  }, [data]);

  if (fetchDets) return <Loader />;

  return (
    <Grid container>
      <Grid
        container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Statistics on {coinDetails?.name}</h1>
      </Grid>
      <Grid container spacing={2}>
        {stats.map((row) => (
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Statistic
              title={row.title}
              value={row.value}
              change={row.change}
            />
          </Grid>
        ))}
        {genericStats.map((row) => (
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Statistic title={row.title} value={row.value} />
          </Grid>
        ))}
      </Grid>
      <Grid container xs={12}>
        <h1>What is {coinDetails?.name}?</h1>
        {HTMLReactParser(
          coinDetails?.description ? coinDetails?.description : ""
        )}
      </Grid>
      <h1>{coinDetails?.name} Links</h1>
      <Grid container xs={12} spacing={2}>
        {coinDetails?.links.map((row) => (
          <Grid item md={4} sm={6} xs={12}>
            <a href={row.url} target="_blank" rel="noreferrer">
              <Typography variant="h6">{row.type}</Typography> {row.name}{" "}
            </a>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default CryptoDetails;
