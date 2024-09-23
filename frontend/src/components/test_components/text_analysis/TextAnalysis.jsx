import React from "react";
import URLInputBar from "./URLInputBar";
import LoadingBackdrop from "./LoadingBackdrop";
import AnalysisResult from "./AnalysisResult";
import EmptyAnalysis from "./EmptyAnalysis";
import AlertDialog from "./AlertDialog";

export default function SingleURLAnalysis() {

    const [url, setUrl] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [empty, setEmpty] = React.useState(true);
    const [result, setResult] = React.useState({});
    const [alert, setAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

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
            setLoading(false);
            setAlertMessage("Invalid URL. Please enter a valid URL.");
            setAlert(true);
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the response data
        })
        .then(data => {
          console.log('Success:', data);
          const jsonString = JSON.stringify(data);
          setResult(JSON.parse(jsonString));
          setLoading(false);
          setEmpty(false);
        })
        .catch(error => {
          console.error('Error:', error); // Handle any errors
        });
      }
    
    return (
      <div
        className="Single-Post"
        sx={{
          backgroundColor: "#011627",
        }}
      >
        <AlertDialog message={alertMessage} open={alert} setOpen={setAlert} />
        <URLInputBar onAnalyse={onAnalyse} inputUrl={inputUrl} />
        {loading ? <LoadingBackdrop /> : null}
        {empty ? <EmptyAnalysis /> : <AnalysisResult result={result}/>}
      </div>
    );
}