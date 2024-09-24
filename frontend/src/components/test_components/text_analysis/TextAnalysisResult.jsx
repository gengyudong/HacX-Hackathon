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
// import testconstant from "../constants/testconstant";

function PostRow(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{row.post_title}</TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">{row.author}</TableCell>
        <TableCell align="left">{row.platform}</TableCell>
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
          {row.assertionCount.slice(10)}
        </TableCell>
        <TableCell align="left">{row.assertion}</TableCell>
        <TableCell align="left">{row.factCheck}</TableCell>
        <TableCell align="left">
        {Array.isArray(row.source) && row.source.length > 0 ? (
          row.source.map((link) => (
            <Link key={link.sourceURL} href={link.sourceURL} target="_blank" rel="noopener noreferrer">
              <p>{link.sourceName} <br /> Relevance score: {link.relevanceScore} </p> 
          </Link>
        ))
        ) : (
        <span>No sources available</span>
        )}
        </TableCell>    
        <TableCell></TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AnalysisResult(result) {

  const query = result.result;  
  const postDetails = [query.postDetails];
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
        <TableContainer component={Paper} sx={{ margin: "auto", width: "90%" }}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Post Title</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Author</TableCell>
                <TableCell align="left">Platform</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {postDetails.map((row, index) => (
                <PostRow key={index} row={row} />
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
                <TableCell align="left">Supporting Sources</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {postAssertions.map((row, index) => (
                <AssertionRow key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}