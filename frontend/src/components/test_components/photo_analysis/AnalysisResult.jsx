import React from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function AnalysisResult({result, imageURL}) {

  const query = result;
  const sourceURL = imageURL;

    
    console.log("Query: ", query);
    console.log("Source URL: ", sourceURL);
    
    return (
      <div>
        <Card sx={{ maxWidth: "90%", margin: "auto", marginTop: "25px" }}>
          <CardActionArea >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Photo Details
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="auto"
              image={sourceURL}
              alt="source image"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                align="justified"
                pb={"5px"}
              >
                Source URL: 
                <Link>{sourceURL}</Link>
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Analysis Result
              </Typography>
              <Typography variant="body1" sx={{ display: "block" }}>
                {result}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
}