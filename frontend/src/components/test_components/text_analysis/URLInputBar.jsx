import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

export default function URLInputBar({onAnalyse, inputUrl}) {

  const [url, setUrl] = React.useState("");

  const handleClick = () => {
    inputUrl(url);
    onAnalyse();
  }

  return (
    <div
      className="input-bar"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center"  }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "90%",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <InputBase
          variant="outlined"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter One URL ONLY"
          inputProps={{ "aria-label": "analyse url" }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button
          startIcon={<TroubleshootIcon />}
          variant="contained"
          onClick={handleClick}
          sx={{ marginTop: "5px", display: "flex", justifyContent: "center" }}
        >
          Analyse
        </Button>
      </Paper>
    </div>
  );
}
