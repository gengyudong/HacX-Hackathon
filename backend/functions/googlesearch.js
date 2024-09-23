const { getJson } = require("serpapi");
require('dotenv').config();

// const query = "fake news pritam singh";

async function fetchSearchResults(query) {
  return new Promise((resolve, reject) => {
    getJson({
      api_key: process.env.GOOGLE_API_KEY,
      engine: "google",
      q: query,
      location: "Singapore",
      google_domain: "google.com",
      gl: "us",
      hl: "en"
    }, (json) => {
      if (json.error) {
        reject(json.error);
      } else {
        resolve(json);
      }
    });
  });
}

// Call the function and log the results
// fetchSearchResults()
//   .then(json => {
//     console.log(json.organic_results.slice(0, 5));
//   })
//   .catch(error => {
//     console.error('Error fetching search results:', error);
//   });

module.exports = fetchSearchResults;

