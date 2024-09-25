import React, { useEffect } from 'react';
import { Typography } from "@mui/material";
// import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function PopularSearch() {
    const [result, setResult] = React.useState("");
    const [loading, setLoading] = React.useState(false);


    const onLoad = async () => {
        setLoading(true);
        console.log("Fetching top searches");
        try {
            const response = await fetch("http://localhost:3001/topsearch", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: null,
            });
            if (!response.ok) {
              setLoading(false);
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Success:", data);
            setResult(data);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        onLoad();
      }, []); 

    return (
      <div>

        <Card sx={{ maxWidth: "90%", margin: "auto", marginTop: "25px" }}>
          <CardActionArea >
            <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                Top Google Searches Today
            </Typography>
            {loading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <CircularProgress />
            </div> : null}
            </CardContent>
            <CardContent>
            {result.map && result.map((item, index) => (
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                {item.query}
                </AccordionSummary>
                <AccordionDetails>
                        <ol>
                        {item.articles.map((article, index) => (
                            <li key={index}>
                                <a href={article.link}>{article.snippet}</a>
                            </li>
                        ))}
                        </ol>
                </AccordionDetails>
            </Accordion>
            ))}
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
}