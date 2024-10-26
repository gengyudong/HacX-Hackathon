import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Typography } from '@mui/material';

const NodeDetails = ({ data }) => {

    const metrics = data ? data.public_metrics : null;

    return (
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          margin: "6px",
          backgroundColor: "#f9f9f9",
          fontFamily: "roboto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Post Information
        </Typography>
        <Typography variant="body2" gutterBottom>
          Post Content: {data.text}
        </Typography>
        <Divider />
        <Typography variant="body2">Likes: {metrics.likes}</Typography>
        <Typography variant="body2">Replies: {metrics.reply}</Typography>
        <Typography variant="body2">Retweets: {metrics.retweet}</Typography>
        <Typography variant="body2">Quotes: {metrics.quote}</Typography>
        <Typography variant="body2">
          Influence Metric: {data.influence}
        </Typography>
        <Typography variant="body2">
          Author_Region: {data.geo_location}
        </Typography>
      </Box>
    );
};

NodeDetails.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    replies: PropTypes.number.isRequired,
    retweets: PropTypes.number.isRequired,
    quotes: PropTypes.number.isRequired,
    influenceMetric: PropTypes.number.isRequired,
    Author_Region: PropTypes.string.isRequired,
  }).isRequired,
};

export default NodeDetails;