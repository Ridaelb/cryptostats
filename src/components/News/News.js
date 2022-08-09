import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import moment from "moment";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { Loader } from "../../components";

function News({ simplified }) {
  const [cryptoNews, setCryptoNews] = useState();
  const [newsCategory, setNewsCategory] = useState("Cryptocurrencies");

  const { data, isFetching } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 100,
  });

  const { data: cryptos } = useGetCryptosQuery(100);

  useEffect(() => {
    setCryptoNews(data?.value);
  }, [data]);

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
          <h1>News</h1>
          <Autocomplete
            options={cryptos?.data?.coins}
            autoHighlight
            getOptionLabel={(crypto) => crypto.name}
            onSelect={(e) => setNewsCategory(e.target.value)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                onChange={(e) => setNewsCategory(e.target.value)}
                value={newsCategory}
                {...params}
                variant="filled"
                label="Filter by Crytpo"
              />
            )}
          />
        </Grid>
      )}
      <Grid container spacing={5}>
        {isFetching ? (
          <Grid item>
            <Loader/>
          </Grid>
        ) : (
          cryptoNews?.map((news, index) => (
            <Grid item md={4} sm={6} key={index}>
              <a href={news.url} target="_blank" rel="noreferrer">
                <Card style={{ maxHeigth: 100 }}>
                  <CardActionArea>
                    <CardContent>
                      <h2>{news.name}</h2>
                      <p>
                        {news.description.length > 200
                          ? `${news.description.substring(0, 200)} ...`
                          : news.description}
                      </p>
                    </CardContent>
                  </CardActionArea>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={news.provider[0]?.image?.thumbnail?.contentUrl}
                      >
                        P
                      </Avatar>
                    }
                    title={news.provider[0].name}
                    subheader={moment(news.datePublished)
                      .startOf("ss")
                      .fromNow()}
                  />
                </Card>
              </a>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export default News;
