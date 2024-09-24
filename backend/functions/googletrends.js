const { getJson } = require("serpapi");
const { getRelevantTopSearches } = require('./azure');
require('dotenv').config();
// const { AzureOpenAI } = require("openai");

// // Load API details for Azure OpenAI
// const openAIendPoint = process.env["AZURE_OPENAI_ENDPOINT"];
// const openAIapiKey = process.env["AZURE_OPENAI_API_KEY"];
// const apiVersion = "2024-05-01-preview";
// const openAIdeployment = "gpt-4o";

// Google does not return real time trends for Singapore, doesn't work, 
// but just leaving it here
function getRealTimeTopSearches() {
    getJson({
        engine: "google_trends_trending_now",
        frequency: "realtime",
        geo: "SG", // Geolocation set to Singapore, 
        hl: "en", // Search english results
        async: true,
        api_key: process.env.GOOGLE_API_KEY
    }, (json) => {
        // console.log(json["daily_searches"]);
        console.log(json)
    });
}

// Tested on 24 Sep 2024 (20240924), earliest date it can return is 26 August 2024
// Returns an array of topics (query) and for each query it shows related queries (if any) 
// and articles related to the query and related queries. Each article has at least title, 
// snippet (summary), source, date and link
async function getTopSearchesAroundDate(onDate) { //date format: yyyymmdd (string)
    return new Promise((resolve, reject) => {
        getJson({
            engine: "google_trends_trending_now",
            frequency: "daily",
            date: onDate,
            geo: "SG", // Geolocation set to Singapore, 
            hl: "en", // Search English results
            async: true,
            api_key: process.env.GOOGLE_API_KEY
        }, (json) => {
            // Check if json is received
            if (json) {
                resolve(json);
            } else {
                reject(new Error("Failed to fetch data from Google Trends API"));
            }
        });
    });
}

// Run function to see output
async function run() {
    const todayDate = getCurrentDateString();
    // Can use threeDaysAgoDate to get more search results
    const threeDaysAgoDate = getDateStringDaysAgo(3);

    const resultToday = await getRelevantTopSearches(todayDate, getTopSearchesAroundDate);

    // This is for Option 2 to get the 3 days ago to combine with today's results to get the whole week
    // const resultThreeDaysAgo = await getRelevantTopSearches(threeDaysAgoDate, getTopSearchesAroundDate);
    // const resultWeek = Object.assign({}, resultToday, resultThreeDaysAgo);

    // Option 1: Get only around the date specified (-3 days around there)
    // Run this to get the actual Json
    console.log(resultToday);

    // Run this to get string version
    // console.log(JSON.stringify(resultToday));

    // Option 2: Get whole week (around 6 days but openai parsing not very consistent, some errors)
    // Run this to get the actual Json
    // console.log(resultWeek);

    // Run this to get string version
    // console.log(JSON.stringify(resultWeek));
}

run();  // This will execute the async function and log the result
