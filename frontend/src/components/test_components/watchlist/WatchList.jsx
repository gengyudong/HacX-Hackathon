import { ToggleButton, Typography } from "@mui/material";
import ResultTable from "./ResultTable"
import UserChart from "./UserChart"
import Box from "@mui/material/Box"

export default function WatchList() {

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row"
        }}>
            <ResultTable />
            <UserChart />
        </Box>
    )
}