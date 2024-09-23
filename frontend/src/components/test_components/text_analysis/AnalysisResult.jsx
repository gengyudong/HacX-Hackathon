import React from "react";
import { Typography } from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "@mui/material/Link";
import testconstant from "../constants/testconstant";

function PostRow(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{row.Title}</TableCell>
        <TableCell align="left">{row.Platform}</TableCell>
        <TableCell align="left">{row.Author}</TableCell>
        <TableCell align="left">{row.DatePosted}</TableCell>
        <TableCell align="left">
          <Link>{row.SourceLink}</Link>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function AssertionRow(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.Number}
        </TableCell>
        <TableCell align="left">{row.Assertions}</TableCell>
        <TableCell align="left">{row.Fact_Check}</TableCell>
        <TableCell align="left">{row.Source}</TableCell>
        <TableCell align="left">{row.Link}</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AnalysisResult(result) {

    const [open, setOpen] = React.useState(true);

    const postDetails = [
        {
        Title: "Geng Yu Dong is Gay",
        Platform: "VS Code",
        Author: "Mr Guo",
        DatePosted: "22-09-2024",
        SourceLink: "www.link.com",
        },
    ];

    const postAssertions = testconstant;
    
    return (
      <div>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ margin: "auto", width: "85%", marginTop: "25px" }}
        >
          Post Details
        </Typography>
        <TableContainer component={Paper} sx={{ margin: "auto", width: "90%" }}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Post Title</TableCell>
                <TableCell align="left">Platform</TableCell>
                <TableCell align="left">Author</TableCell>
                <TableCell align="left">Date Posted</TableCell>
                <TableCell align="left">Source Link</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {postDetails.map((row) => (
                <PostRow key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ margin: "auto", width: "85%", marginTop: "30px" }}
        >
          Assertions Details
        </Typography>
        <TableContainer component={Paper} sx={{ margin: "auto", width: "90%" }}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell align="left">No.</TableCell>
                <TableCell align="left">Assertions</TableCell>
                <TableCell align="left">Fact Check</TableCell>
                <TableCell align="left">Source</TableCell>
                <TableCell align="left">Link</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {postAssertions.map((row) => (
                <AssertionRow key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}