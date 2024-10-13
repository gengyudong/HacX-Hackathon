import React from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function AddToWatchListButton({ author }) {
  const handleClick = async () => {
    try {
      // Check if author and URL are defined
      if (!author) {
        console.error("Author or URL are undefined");
        return;
      }

      // Prepare data to send to the backend
      const data = { author };
      console.log("Data being sent to backend:", data);

      // Send the data to the backend
      const response = await axios.post('http://localhost:3001/save-author', data);

      // Handle the response
      if (response.status === 200) {
        alert("Author and URL saved successfully!");
      }
    } catch (error) {
      console.error("Error saving author and URL:", error);
    }
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={handleClick} size="small">
        Save
      </Button>
    </Stack>
  );
}
