import React, { useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import nodes from "./nodes";
import links from "./links";
import { Container } from "react-bootstrap";
import Legend from "./Legend";
import NodeDetails from "./NodeDetails";
import { Grid } from "@mui/material";
import { padding } from "@mui/system";

const NetworkGraph = () => {

  const colourMapping = {
    "United States": "black",
    "Canada": "blue",
    "United Kingdom": "green",
    "Australia": "yellow",
    "Germany": "purple",
    "France": "orange",
    "India": "pink",
    "Japan": "brown",
    "Malaysia": "red",
    "Brazil:": "grey",
  }

    const data = {
        nodes: nodes.nodes,
        links: links.links,
    }

    const [display, setDisplay] = useState(false);
    const [nodeDetails, setNodeDetails] = useState(null);

  const handleNodeClick = (node) => {
    //alert(`Clicked node ${node.geo_location}`);
    setNodeDetails(node);
    setDisplay(true);
  }

  return (
    <Container sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={10} sx={{ padding: 2 }}>
          <h1 sx={{ display: "flex"}}>X Network Graph</h1>
          <ForceGraph2D
            graphData={data}
            autoPauseRedraw={false}
            nodeColor={(d) => colourMapping[d.geo_location]}
            linkDirectionalParticleColor={(d) => colourMapping[d.geo_location]}
            linkDirectionalParticleSpeed={(d) => 0.003}
            linkDirectionalParticles={(d) => 3}
            linkDirectionalParticleWidth={(d) => 3}
            onNodeClick={handleNodeClick}
            nodeRelSize={4}
          />
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            zIndex: 1,
            marginTop: 6,
          }}
        >
          <Legend sx={{ flex: 1, position: "relative" }} />
          {display ? (
            <NodeDetails
              data={nodeDetails}
              sx={{ flex: 1, position: "relative", zIndex: 1 }}
            />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  );
};

export default NetworkGraph;
