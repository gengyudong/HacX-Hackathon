import * as React from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile"; // Import an icon for file upload

export default function FileInputBar({ onAnalyse, setFile }) {
    const handleFileChange = (event) => {
        const file = './public/test.mp4'; // Get the first file
        if (file) {
            setFile('./public/test.mp4'); // Update the file state in the parent component
        }
    };

    return (
        <div className="input-bar" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                <input
                    type="file"
                    accept=".mp3,.mp4" // Specify accepted file types
                    onChange={handleFileChange}
                    style={{ flex: 1, marginLeft: '8px', marginRight: '8px' }} // Style as needed
                />
                <Button
                    startIcon={<UploadFileIcon />}
                    variant="contained"
                    onClick={onAnalyse}
                    sx={{ marginTop: "5px", display: "flex", justifyContent: "center" }}
                >
                    Analyse
                </Button>
            </Paper>
        </div>
    );
}
