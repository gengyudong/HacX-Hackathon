import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function LoadingBackdrop({ abortAnalysis }) {
  const [open, setOpen] = React.useState(true);
  
  const handleCancel = () => {
    console.log("abort prop", abortAnalysis);
    abortAnalysis();
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          display: "flex",
          flexDirection: "column",
        })}
        open={open}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h6" gutterBottom>
          Loading... Please wait
        </Typography>
        <Button variant="contained" onClick={handleCancel} color="inherit">
          Cancel
        </Button>
      </Backdrop>
    </div>
  );
}
