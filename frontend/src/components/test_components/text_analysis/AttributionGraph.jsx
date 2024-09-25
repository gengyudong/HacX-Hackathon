// import React from "react";
// import { GraphCanvas, darkTheme } from "reagraph";
// import { generateGraphData } from "./GraphData";

// const { nodes, edges } = generateGraphData(100, 250);

// export default function ActivityGraph() {
//   return (
//     <div>
//       <h1>My Graph Visualization</h1>
//       <GraphCanvas
//         theme={darkTheme}
//         nodes={nodes}
//         edges={edges}
//         edgeArrowPosition="none"
//         cameraMode="rotate"
//         sizingType="centrality"
//         layoutType="forceDirected3d"
//       />
//     </div>
//   );
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { GraphCanvas, darkTheme } from "reagraph";
import { generateGraphData } from "./GraphData";
import GraphIcon from "@mui/icons-material/BubbleChart";
import Typography from '@mui/material/Typography';
import AddToWatchListButton from '../components/AddToWatchListButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AttributionGraph() {
  const [open, setOpen] = React.useState(false);
  const { nodes, edges } = generateGraphData(100, 250);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        startIcon={<GraphIcon />}
        onClick={handleClickOpen}
      >
        Attribution Graph
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Attribution Graph
            </Typography>
            <AddToWatchListButton />
          </Toolbar>
        </AppBar>
        <GraphCanvas
          theme={darkTheme}
          nodes={nodes}
          edges={edges}
          edgeArrowPosition="none"
          cameraMode="rotate"
          sizingType="centrality"
          layoutType="forceDirected3d"
        />
      </Dialog>
    </React.Fragment>
  );
}