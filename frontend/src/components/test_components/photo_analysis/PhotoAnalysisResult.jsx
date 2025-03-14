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
              sx={{
                width: '300px', // Full width of the card
                height: '300px', // Set fixed height to maintain aspect ratio
                objectFit: 'contain',
                margin: 'auto',
                display: 'block' // Cover the area without stretching
              }}
              image={sourceURL}
              alt="source image"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
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

              {/* HARD CODED PART BECAUSE WE HAVE NO MONEY FOR THE API */}
              <Typography gutterBottom variant="h5" component="div">
                <br></br>
                AI Generated?
              </Typography>
              <Typography variant="body1" sx={{ display: "block" }}>
                Score: 0.98. The image is generated by AI.
              </Typography>
              {/* HARD CODED PART BECAUSE WE HAVE NO MONEY FOR THE API */}

            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
}