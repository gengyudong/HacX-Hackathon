import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PopularSearch from "./popular_search/PopularSearch";

export default function LandingPage() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Typography variant="h3" color="primary" padding={"25px"}>
          Welcome Information Crimewatch
        </Typography>
        <Box>
          <Typography variant="h4" color="primary" textAlign={"center"}>
            Click Side Bar to select the type of analysis
          </Typography>
          <br></br>
          <Typography variant="h6" color="secondary" textAlign={"center"}>
            or click on the popular searches below
          </Typography>
          <PopularSearch />
        </Box>
      </Box>
    );
}