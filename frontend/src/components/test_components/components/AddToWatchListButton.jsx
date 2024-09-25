import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function AddToWatchListButton() {

  const handleClick = () => {
    alert("You clicked the button and User has been added to the list!");
  }
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={handleClick}size="small">
      save
      </Button>
    </Stack>
  );
}
