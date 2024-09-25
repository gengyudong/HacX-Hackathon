import React from "react";
import URLInputBar from "../components/URLInputBar";
import LoadingBackdrop from "../components/LoadingBackdrop";
import PhotoAnalysisResult from "./PhotoAnalysisResult";
import EmptyAnalysis from "../components/EmptyAnalysis";
import AlertDialog from "../components/AlertDialog";
import axios from "axios";

export default function SingleURLAnalysis() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(true);
  const [result, setResult] = React.useState({});
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [controller, setController] = React.useState(null);

  const emptyMessage = "Please enter an image URL and click Analyse to start Analysing!";

  const abortAnalysis = () => {
    if (controller) {
      controller.abort(); // Cancel the POST request
      setController(null); // Reset the controller
    }
  };

  const onAnalyse = async (event) => {
    event.preventDefault(); // Prevent default behavior if using a form
    console.log("Analyse URL: ", url);
    setLoading(true);

    const newController = new AbortController();
    setController(newController);
    const signal = newController.signal;

    try {
      const response = await axios.post(
        "http://localhost:3001/describe-image",
        {
          image_url: url,
        },
        {
          signal: signal,
        }
      );

      console.log("Full Response:", response);

      if (!response.statusText === "OK") {
        setLoading(false);
        setAlertMessage("Invalid URL. Please enter a valid URL.");
        setAlert(true);
        throw new Error("Network response was not ok");
      }

      const data = await response.data.disinformationResult;
      console.log("Success:", data);
      setResult(data);
      setLoading(false);
      setEmpty(false);
    } catch (error) {
      if (error.message === "AbortError") {
        console.log("POST request was cancelled.");
        setAlertMessage("Analysis request was cancelled");
        setAlert(true);
        setLoading(false);
      } else {
        console.error("Error:", error);
        setAlertMessage("Reason: " + error.message);
        setAlert(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="Single-Post">
      <AlertDialog message={alertMessage} open={alert} setOpen={setAlert} />
      <URLInputBar onAnalyse={onAnalyse} inputUrl={setUrl} url={url} />
      {loading ? <LoadingBackdrop abortAnalysis={abortAnalysis} /> : null}
      {empty ? (
        <EmptyAnalysis message={emptyMessage} />
      ) : (
        <PhotoAnalysisResult result={result} imageURL={url} />
      )}
    </div>
  );
}
