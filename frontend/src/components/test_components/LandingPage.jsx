import { Typography } from "@mui/material";
import Box from "@mui/material/Box";


export default function LandingPage() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "20%",
        }}
      >
        <Typography variant="h3" color="primary" padding={"25px"}>
          Welcome Information Crimewatch
        </Typography>
        <Box>
          <Typography variant="h4" color="primary">
            Click Side Bar to select the type of analysis
          </Typography>
        </Box>
      </Box>
    );
}