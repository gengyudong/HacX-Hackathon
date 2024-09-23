import React from "react";
import URLInputBar from "./URLInputBar";
import LoadingBackdrop from "./LoadingBackdrop";
import AnalysisResult from "./AnalysisResult";
import EmptyAnalysis from "./EmptyAnalysis";

export default function SingleURLAnalysis() {

    const [url, setUrl] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [empty, setEmpty] = React.useState(false);

    const onAnalyse = () => {
        console.log("Analyse URL: ", url);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 10000);
    }
    
    return (
      <div
        className="Single-Post"
        sx={{
          backgroundColor: "#011627",
        }}
      >
        <URLInputBar onAnalyse={onAnalyse} inputUrl={setUrl} />
        {loading ? <LoadingBackdrop /> : null}
        {empty ? <EmptyAnalysis /> : <AnalysisResult />}
      </div>
    );
    }