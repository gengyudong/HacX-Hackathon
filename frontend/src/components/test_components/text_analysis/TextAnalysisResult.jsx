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
import OptionButton from "../components/OptionButton";
import Box from "@mui/material/Box";

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
        <TableCell align="right">
          {Array.isArray(row.source) && row.source.length > 0 ? (
            row.source.map((link, index) => (
              <Box>
                {/* <Link
                  key={link.sourceURL}
                  href={link.sourceURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>
                    {link.sourceName} <br /> Relevance score:{" "}
                    {link.relevanceScore}{" "}
                  </p>
                </Link> */}
                <OptionButton source={link} />
              </Box>
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

function RelatedRow(props) {
  const { row } = props;
  
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row"></TableCell>
        <TableCell align="left">{row.title}</TableCell>
        <TableCell align="left">
          <Link
            key={row.link}
            href={row.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.link}
          </Link>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AnalysisResult(result) {

  const query = result.result;  
  const postDetails = [query.postDetails];
  const postAssertions = query.jsonDisinformation;
  const relatedPosts = query.similarResults;
  console.log(query);
    
    return (
      <div>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            margin: "auto",
            width: "90%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Post Details
        </Typography>
        <TableContainer component={Paper} sx={{ margin: "auto", width: "90%" }}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Post Title</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Author/Username</TableCell>
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
          sx={{
            margin: "auto",
            width: "90%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
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
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            margin: "auto",
            width: "90%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Similar Posts
        </Typography>
        <TableContainer component={Paper} sx={{ margin: "auto", width: "90%" }}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell align="left" />
                <TableCell align="left">Post Title</TableCell>
                <TableCell align="left">Post Link</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {relatedPosts.map((row, index) => (
                <RelatedRow key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}