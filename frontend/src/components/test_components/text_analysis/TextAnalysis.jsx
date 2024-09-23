import React from "react";
import URLInputBar from "./URLInputBar";
import LoadingBackdrop from "./LoadingBackdrop";
import AnalysisResult from "./AnalysisResult";
import EmptyAnalysis from "./EmptyAnalysis";
import testconstant from "../constants/testconstant";

export default function SingleURLAnalysis() {

    const [url, setUrl] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [empty, setEmpty] = React.useState(false);
    const [result, setResult] = React.useState({});

    const inputUrl = (url) => {
        setUrl(url);
    }

    const onAnalyse = () => {
        console.log("Analyse URL: ", url);
        setLoading(true);
        
        const response = fetch('http://localhost:3001/scrape', { // Change to your backend API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_url : url }), // Send the input value
        }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the response data
        })
        .then(data => {
          console.log(typeof data);
          console.log('Success:', data); // Handle the success response
        })
        .catch(error => {
          console.error('Error:', error); // Handle any errors
        });

        setLoading(false);

        if (response) {
          setResult(JSON.stringify(response));
          console.log("misinfo ", result);
          console.log(typeof testconstant);
          console.log("misinfo ", testconstant);
        } else {
          setEmpty(true);
        }
      }
    
    return (
      <div
        className="Single-Post"
        sx={{
          backgroundColor: "#011627",
        }}
      >
        <URLInputBar onAnalyse={onAnalyse} inputUrl={inputUrl} />
        {loading ? <LoadingBackdrop /> : null}
        {empty ? <EmptyAnalysis /> : <AnalysisResult result={result}/>}
      </div>
    );
}