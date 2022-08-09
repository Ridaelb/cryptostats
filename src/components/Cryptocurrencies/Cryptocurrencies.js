import React, { useEffect, useState } from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Loader } from "../../components";
import "./Cryptocurrencies.css";

function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtredData = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filtredData);
  }, [data, searchTerm]);

  return (
    <>
      {simplified ? null : (
        <Grid
          container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>Cryptocurrencies</h1>
          <TextField
            label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchRounded />
                </InputAdornment>
              ),
            }}
            style={{ width: "300px" }}
          />
        </Grid>
      )}
      <Grid container spacing={5}>
        {isFetching ? (
          <Grid item>
            <Loader />
          </Grid>
        ) : (
          cryptos?.map((currency) => (
            <Grid item md={4} sm={6} xs={12} key={currency.name}>
              <Card>
                <CardActionArea
                  component={Link}
                  to={`/crypto/${currency.uuid}`}
                >
                  <CardContent>
                    <p className="currency-rank">{currency.rank}</p>
                    <div className="currency-card-header">
                      <Typography gutterBottom variant="h6" component="div">
                        {currency.name}
                      </Typography>
                      <img
                        className="currency-card-icon"
                        src={currency.iconUrl}
                        alt={currency.name}
                      />
                    </div>
                    <div className="currency-card-stats">
                      <div>Price</div>
                      <div>{millify(currency.price)}</div>
                    </div>
                    <div className="currency-card-stats">
                      <div>Market Cap</div>
                      <div>{millify(currency.marketCap)}</div>
                    </div>
                    <div className="currency-card-stats">
                      <div>Daily Chnage</div>
                      <div>{millify(currency.change)}%</div>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export default Cryptocurrencies;
