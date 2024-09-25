
// import React, { useState, useEffect } from "react";
// import * as d3 from "d3";
// import URLInputBar from "../components/URLInputBar";
// import LoadingBackdrop from "../components/LoadingBackdrop";
// import TextAnalysisResult from "./TextAnalysisResult";
// import EmptyAnalysis from "../components/EmptyAnalysis";
// import AlertDialog from "../components/AlertDialog";

// export default function SingleURLAnalysis() {
//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [empty, setEmpty] = useState(true);
//   const [result, setResult] = useState({});
//   const [alert, setAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [controller, setController] = useState(null);
//   const [postDetails, setPostDetails] = useState(null);
//   const [assertionData, setAssertionData] = useState([]);

//   const analysisTypes = "Online Article";

//   const abortAnalysis = () => {
//     if (controller) {
//       controller.abort();
//       setController(null);
//     }
//   };

//   const onAnalyse = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     const abortController = new AbortController();
//     setController(abortController);

//     try {
//       const response = await fetch("http://localhost:3001/scrape", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ post_url: url }),
//         signal: abortController.signal,
//       });

//       if (!response.ok) {
//         setLoading(false);
//         setAlertMessage("Invalid URL. Please enter a valid URL.");
//         setAlert(true);
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       setResult(data);
//       setPostDetails(data.postDetails);
//       setAssertionData(data.jsonDisinformation);
//       setLoading(false);
//       setEmpty(false);
//     } catch (error) {
//       if (error.name === "AbortError") {
//         console.log("POST request was cancelled.");
//         setAlertMessage("Analysis request was cancelled");
//         setAlert(true);
//         setLoading(false);
//       } else {
//         console.error("Error:", error);
//         setAlertMessage(error.message);
//         setAlert(true);
//         setLoading(false);
//       }
//     }
//   };

//   // Process assertions and calculate percentage
//   useEffect(() => {
//     if (assertionData.length > 0) {
//       let trueCount = 0;
//       let falseCount = 0;

//       assertionData.forEach((assertion) => {
//         if (assertion.factCheck.includes("True")) {
//           trueCount++;
//         } else {
//           falseCount++;
//         }
//       });

//       const totalAssertions = trueCount + falseCount;
//       const truePercentage = (trueCount / totalAssertions) * 100;

//       console.log(`Number of True Assertions: ${trueCount}`);
//       console.log(`Number of False Assertions: ${falseCount}`);
//       console.log(`Percentage of True Assertions: ${truePercentage.toFixed(2)}%`);

//       if (truePercentage < 80 && postDetails) {
//         console.log(`Post Author: ${postDetails.author}`);
//       }

//       // Plot Pie Chart with D3.js
//       plotPieChart(trueCount, falseCount);
//     }
//   }, [assertionData, postDetails]);

//   const plotPieChart = (trueCount, falseCount) => {
//     // Clear previous chart if any
//     d3.select("#pie-chart").selectAll("*").remove();

//     const data = [
//       { label: "True", value: trueCount },
//       { label: "False", value: falseCount },
//     ];

//     const width = 300;
//     const height = 300;
//     const radius = Math.min(width, height) / 2;

//     const svg = d3
//       .select("#pie-chart")
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${width / 2}, ${height / 2})`);

//     const color = d3.scaleOrdinal(["#4CAF50", "#F44336"]);

//     const pie = d3.pie().value((d) => d.value);

//     const arc = d3.arc().innerRadius(0).outerRadius(radius);

//     const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g").attr("class", "arc");

//     arcs
//       .append("path")
//       .attr("d", arc)
//       .attr("fill", (d) => color(d.data.label));

//     arcs
//       .append("text")
//       .attr("transform", (d) => `translate(${arc.centroid(d)})`)
//       .attr("text-anchor", "middle")
//       .text((d) => `${d.data.label}: ${d.data.value}`);
//   };

//   return (
//     <div className="Single-Post">
//       <AlertDialog message={alertMessage} open={alert} setOpen={setAlert} />
//       <URLInputBar onAnalyse={onAnalyse} inputUrl={setUrl} url={url} />
//       {loading ? <LoadingBackdrop abordAnalysis={abortAnalysis} /> : null}
//       {empty ? (
//         <EmptyAnalysis AnalysisTypes={analysisTypes} />
//       ) : (
//         <TextAnalysisResult result={result} />
//       )}
//       <div id="pie-chart"></div>
//     </div>
//   );
// }


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

  const abortAnalysis = () => {
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
      {loading ? <LoadingBackdrop abortAnalysis={abortAnalysis} /> : null}
      {empty ? (
        <EmptyAnalysis AnalysisTypes={analysisTypes} />
      ) : (
        <TextAnalysisResult result={result} />
      )}
    </div>
  );
}
