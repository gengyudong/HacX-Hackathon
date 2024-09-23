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
        <TableCell align="left">{row.post_title}</TableCell>
        <TableCell align="left">{row.Platform}</TableCell>
        <TableCell align="left">{row.user_name}</TableCell>
        <TableCell align="left">{row.user_profile_link}</TableCell>
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
        <TableCell align="left">{row.assertion}</TableCell>
        <TableCell align="left">{row.factcheck}</TableCell>
        <TableCell align="left">{row.source.sourceName}</TableCell>
        <TableCell align="left">{row.source.sourceURL}</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AnalysisResult(result) {

  const query = result.result;  
  const postDetails = query.postDetails.post_title;
  const postAssertions = query.jsonDisinformation;

    
    console.log("Query: ", query);
    console.log("Post Details: ", postDetails);
    console.log("Post Assertions: ", postAssertions);
    
    return (
      <div>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ margin: "auto", width: "85%", marginTop: "25px" }}
        >
          Post Details
        </Typography>
        <h1>{postDetails}</h1>
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
              {/* {postDetails.map((row) => (
                <PostRow key={row.name} row={row} />
              ))} */}
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
                <TableCell align="left">Sources</TableCell>
                <TableCell align="left">Reference Link</TableCell>
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