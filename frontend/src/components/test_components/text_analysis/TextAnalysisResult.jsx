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
import AssertionChart from "../components/AssertionPieChart";
import AttributionGraph from "./AttributionGraph";
import Divider from "@mui/material/Divider";
import AddToWatchListButton from "../components/AddToWatchListButton";

function PostRow(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">{row.post_title}</TableCell>
        <TableCell align="left">{row.date}</TableCell>
        <TableCell align="left">
        <Box sx={{
          display: "flex",
          flexDirection: "column", // Change to column to stack items
          alignItems: "flex-start", // Align items to the start
        }}>
          <span>{row.author}</span>
          <br></br>
          <Divider orientation="horizontal" flexItem />
          <AddToWatchListButton />
        </Box>
        </TableCell>
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
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              margin: "auto",
              width: "90%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
            >
              Post Summary
            </Typography>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              margin: "auto",
              width: "90%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* First table: 75% width */}
            <Table aria-label="table" sx={{ width: "75%" }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#80d8ff", // set the background color
                  }}
                >
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

            {/* Second table: 25% width */}
            <Table aria-label="table" sx={{ width: "25%" }}>
              <TableHead
                sx={{
                  backgroundColor: "#80d8ff", // set the background color
                }}
              >
                <TableRow>
                  <TableCell align="left">Assertion Breakdown</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <AssertionChart info={postAssertions} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              margin: "auto",
              width: "90%",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h6">Assertions Details</Typography>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <AttributionGraph />
          </Box>
          <TableContainer
            component={Paper}
            sx={{ margin: "auto", width: "90%" }}
          >
            <Table aria-label="table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#80d8ff", // set the background color
                  }}
                >
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
        </Box>
        <Box>
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
          <TableContainer
            component={Paper}
            sx={{ margin: "auto", width: "90%" }}
          >
            <Table aria-label="table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#80d8ff", // set the background color
                  }}
                >
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
        </Box>
      </div>
    );
}