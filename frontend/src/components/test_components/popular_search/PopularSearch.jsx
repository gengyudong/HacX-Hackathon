import React from "react";
import { Typography } from "@mui/material";
// import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";

export default function PopularSearch() {
    const result = "This is a popular search result";
    return (
      <div>
        <Card sx={{ maxWidth: "90%", margin: "auto", marginTop: "25px" }}>
          <CardActionArea >
            <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                Top Google Searches Today
            </Typography>
            </CardContent>
            <CardContent>

              <Typography variant="body1" sx={{ display: "block" }}>
                {result}
              </Typography>

            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
}