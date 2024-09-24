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

  const AnalysisTypes = "Video";

  const onAnalyse = async (event) => {
    event.preventDefault(); // Prevent default behavior if using a form
    setLoading(true);

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
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="Single-Post">
      <AlertDialog message={alertMessage} open={alert} setOpen={setAlert} />
      <FileInputBar onAnalyse={onAnalyse} setFile={setFile} url={file} />
      {loading ? <LoadingBackdrop /> : null}
      {empty ? (
        <EmptyAnalysis AnalysisTypes={AnalysisTypes} />
      ) : (
        <VideoAnalysisResult result={result} imageURL={file} />
      )}
    </div>
  );
}
