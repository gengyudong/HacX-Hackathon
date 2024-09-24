import React from "react";
import URLInputBar from "../components/URLInputBar";
import LoadingBackdrop from "../components/LoadingBackdrop";
import TextAnalysisResult from "./TextAnalysisResult";
import EmptyAnalysis from "../components/EmptyAnalysis";
import AlertDialog from "../components/AlertDialog";

export default function SingleURLAnalysis() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(true);
  const [result, setResult] = React.useState({});
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [controller, setController] = React.useState(null);

  const analysisTypes = "Online Article";

  const abordAnalysis = () => {
    if (controller) {
      controller.abort(); // Cancel the POST request
      setController(null); // Reset the controller
    }
  }

  const onAnalyse = async (event) => {
    event.preventDefault(); // Prevent default behavior if using a form
    setLoading(true);

    const abortController = new AbortController(); // Create a new AbortController
    setController(abortController); 

    try {
      const response = await fetch("http://localhost:3001/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_url: url }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        setLoading(false);
        setAlertMessage("Invalid URL. Please enter a valid URL.");
        setAlert(true);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResult(data);
      setLoading(false);
      setEmpty(false);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("POST request was cancelled.");
        setAlertMessage("Analysis request was cancelled");
        setAlert(true);
        setLoading(false);
      } else {
        console.error("Error:", error);
        setAlertMessage(error.message);
        setAlert(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="Single-Post">
      <AlertDialog message={alertMessage} open={alert} setOpen={setAlert} />
      <URLInputBar onAnalyse={onAnalyse} inputUrl={setUrl} url={url} />
      {loading ? <LoadingBackdrop abordAnalysis={abordAnalysis} /> : null}
      {empty ? (
        <EmptyAnalysis AnalysisTypes={analysisTypes} />
      ) : (
        <TextAnalysisResult result={result} />
      )}
    </div>
  );
}
