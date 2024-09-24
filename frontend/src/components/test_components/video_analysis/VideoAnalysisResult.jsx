import React from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

export default function AnalysisResult({result, imageURL}) {

  const query = result;
    
    console.log("Query: ", query);
    
    return (
      <div>
        <Card sx={{ maxWidth: "90%", margin: "auto", marginTop: "25px" }}>
          <CardActionArea >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Video Details
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                pb={"5px"}
              >
                Analysis Result:
              </Typography>
              {query.jsonDisinformation.map((output, index) => (
              <Typography gutterBottom variant="h6" component="div">
                {output.assertion}
              <Typography variant="body1" sx={{ display: "block" }}>
                {output.factCheck}
              <Typography variant="body1" sx={{ display: "block" }}>
                <br></br>
                Sources:
                <ol>
                    {output.source.map((url, index) => (
                    <li key={index}>
                      <Link href={url.sourceURL}>{url.sourceName}</Link>
                    </li>
                  ))}              
                </ol>
              </Typography>
              </Typography>
              </Typography>
              ))}
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
}