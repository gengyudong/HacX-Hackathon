import React from "react";
import { Box, Typography } from "@mui/material";

const EmptyAnalysis = () => {
  return (
    <Box xs={{ display: "flex"}}>
      <Typography color="primary" align='center' variant="h5" sx={{mt: "200px"}} noWrap={true}>
        Please Enter a URL and click Analyse to start Analysing!
        </Typography>
    </Box>
  );
};

export default EmptyAnalysis;
