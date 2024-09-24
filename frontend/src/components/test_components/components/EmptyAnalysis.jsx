import React from "react";
import { Box, Typography } from "@mui/material";

export default function EmptyAnalysis({AnalysisTypes}) {
  return (
    <Box xs={{ display: "flex" }}>
      <Typography
        color="primary"
        align="center"
        variant="h5"
        sx={{ mt: "200px" }}
        noWrap={true}
      >
        Please enter a {AnalysisTypes} URL and click Analyse to start Analysing!
      </Typography>
    </Box>
  );
};

