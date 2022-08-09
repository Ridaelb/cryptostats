import React from "react";

import { Box } from "@mui/material";

function Statistic({title, value}) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 100,
      }}
    >
      <Box sx={{ color: "text.secondary" }}>{title}</Box>
      <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "medium" }}>
        {value}
      </Box>
      {/* <Box
        component={TrendingUpOutlined}
        sx={{ color: "success.dark", fontSize: 16, verticalAlign: "sub" }}
      />
      <Box
        sx={{
          color: "success.dark",
          display: "inline",
          fontWeight: "medium",
          mx: 0.5,
        }}
      >
        18.77%
      </Box>
      <Box sx={{ color: "text.secondary", display: "inline", fontSize: 12 }}>
        vs. last week
      </Box> */}
    </Box>
  );
}

export default Statistic;
