const { getJson } = require("serpapi");
require('dotenv').config();

var query = "fake news pritam singh"

getJson({
    api_key: process.env.GOOGLE_API_KEY,
    engine: "google",
    q: query,
    location: "Singapore",
    google_domain: "google.com",
    gl: "us",
    hl: "en"
}, (json) => {
    console.log(json.organic_results.slice(0, 5)); 
    // Organic results refer to just the articles/ videos from the google search 
    // (excludes things like google maps, recommmended commercial products). 
    // Sliced to display top 5 results but can be changed. 
    // Can console log json to see the whole thing. 100 free calls per month I used 3 alr
});