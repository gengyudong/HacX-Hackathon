import React from "react";
import FileInputBar from "../components/FileInputBar";
import LoadingBackdrop from "../components/LoadingBackdrop";
import VideoAnalysisResult from "../video_analysis/VideoAnalysisResult";
import EmptyAnalysis from "../components/EmptyAnalysis";
import AlertDialog from "../components/AlertDialog";
import axios from "axios";

export default function SingleURLAnalysis() {
  const [file, setFile] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(true);
  const [result, setResult] = React.useState({});
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [controller, setController] = React.useState(null);

  const AnalysisTypes = "Video";

  const abortAnalysis = () => {
    if (controller) {
      controller.abort(); // Cancel the POST request
      setController(null); // Reset the controller
    }
  };

  const onAnalyse = async (event) => {
    event.preventDefault(); // Prevent default behavior if using a form
    setLoading(true);

    const newController = new AbortController();
    setController(newController);
    const signal = newController.signal;

    try {
      const response = await axios.post(
        "http://localhost:3001/audio", 
        {
          url: file,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
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

      const data = await response.data;
      console.log("Success:", data);
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
      <FileInputBar onAnalyse={onAnalyse} setFile={setFile} url={file} />
      {loading ? <LoadingBackdrop abortAnalysis={abortAnalysis}/> : null}
      {empty ? (
        <EmptyAnalysis AnalysisTypes={AnalysisTypes} />
      ) : (
        <VideoAnalysisResult result={result} imageURL={file} />
      )}
    </div>
  );
}
