import React from "react";
import { Typography } from "@mui/material";
// import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import LoadingBackdrop from "../components/LoadingBackdrop";


export default function PopularSearch() {
    const result = "This is a popular search result";
    const [loading, setLoading] = React.useState(false);

    const onLoad = async () => {
        setLoading(true);
        try {
            // const response = await fetch("http://localhost:3001/scrape", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ post_url: url }),
            // });
            // if (!response.ok) {
            //   setLoading(false);
            //   setAlertMessage("Invalid URL. Please enter a valid URL.");
            //   setAlert(true);
            //   throw new Error("Network response was not ok");
            // }
            // const data = await response.json();
            // console.log("Success:", data);
            // setResult(data);
            // setLoading(false);
            // setEmpty(false);
        } catch (error) {
            console.error("Error:", error);
            // setAlertMessage(error.message);
            // setAlert(true);
            setLoading(false);
        }
    }
    return (
      <div>
        {loading ? <LoadingBackdrop /> : null}

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