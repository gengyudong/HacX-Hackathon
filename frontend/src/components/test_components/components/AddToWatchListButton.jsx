import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function AddToWatchListButton() {

  const handleClick = () => {
    alert("You clicked the button and author has been added to the list!");
    // insert code here to add author to watchlist
  }
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={handleClick}size="small">
      Add author to watchlist
      </Button>
    </Stack>
  );
}
