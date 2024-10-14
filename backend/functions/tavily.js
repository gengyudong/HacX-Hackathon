const axios = require("axios");
const { parse } = require("tldts");
require('dotenv').config();

const tavilyEndpoint = process.env["TAVILY_ENDPOINT"];
const tavilyApikey = process.env["TAVILY_API_KEY"];

// Disinformation detection function (Tavily AI)
async function disinformationDetector(query) {
    try {
        let result = [];

        for (const [key, value] of Object.entries(query)) {
            let assertion = `For the assertion below, do the following: \n1. True/False. \n2. Explain your reasoning, include quotes from the sources that you reference from.\n\nAssertion: ${value}`;

            let decision = await axios.post(tavilyEndpoint, {
                "api_key": tavilyApikey,
                "query": assertion,
                "search_depth": "basic",
                "topic": "general",
                "include_answer": true,
                "include_images": false,
                "include_image_descriptions": false,
                "include_raw_content": false,
                "max_results": 20,
                "include_domains": ["straitstimes.com", "bloomberg.com", "apnews.com", "bbc.com", "economist.com", "reuters.com", "washingtonpost.com", "wsj.com", "gov.sg", "channelnewsasia.com", "ft.com", "mothership.sg", "statista.com", "who.int", "who.org"],
                "exclude_domains": ["wikipedia.com", "facebook.com"]
            })  
            console.log(decision)
            let resultArray = [];
            decision.data.results.forEach((result) => {
                resultArray.push(result);
            });

            result.push({
                assertionCount: key,
                assertion: value,
                factCheck: decision.data.answer,
                source: getSource(resultArray)
            });
        }
        return result;
    } catch (error) {
        console.error("Error calling Tavily AI:", error);
        throw error;
    }
}

async function disinformationDetectorPic(query) {
    try {
        // edit query
        const result = await axios.post(tavilyEndpoint, {
            "api_key": tavilyApikey,
            "query": query,
            "search_depth": "basic",
            "topic": "general",
            "include_answer": true,
            "include_images": false,
            "include_image_descriptions": false,
            "include_raw_content": false,
            "max_results": 2,
            "include_domains": [],
            "exclude_domains": []
        })
        return result.data.answer;
    } catch (error) {
        console.error("Error calling Tavily AI:", error);
        throw error;
    }
}
// Function to extract the source from the results
function getSource(results) {
    const sourceMap = {};

    results.forEach((item) => {
        const domainName = getBaseDomain(item.url)

        // Only add or update the source if it doesn't exist
        if (!sourceMap[domainName]) {
            sourceMap[domainName] = {
                sourceURL: item.url,
                relevanceScore: item.score
            };
        }
    });

    // Convert the map to an array
    const sourceArray = Object.entries(sourceMap).map(([sourceName, { sourceURL, relevanceScore }]) => ({
        sourceName: sourceName,
        sourceURL,
        relevanceScore
    }));

    return sourceArray.slice(0, 5);
}

// Function to extract the base domain from the URL
function getBaseDomain(url) {
    // Use tldts to parse the URL
    const parsed_url = parse(url);
    const domain_name = parsed_url.domain;

    return domain_name.split('.')[0].toUpperCase();
}

// const query = {
//     "assertion_1": "In the year 2024, scientists made a groundbreaking discovery that revealed the Earth is actually a hollow sphere, with an entire civilization living inside it.",
//     "assertion_2": "This inner world, known as 'Subterranea,' is said to be inhabited by advanced beings who have developed technology far beyond our understanding.",
//     "assertion_3": "The leader of Subterranea, known as the 'Grand Luminary,' reportedly communicates with world leaders through glowing crystals."
// }

// async function main() {
//     try {
//         const assertions = await disinformationDetector("describe this picture: https://imageio.forbes.com/specials-images/imageserve/64b48af219dee92a6b534a09/Fake-photo-created-with-AI-showing-Donald-Trump-with-Martin-Luther-King-Jr-/960x0.jpg?format=jpg&width=960");
//         const jsonData = JSON.stringify(assertions.data, null, 2);
//         console.log(jsonData);
//     } catch (error) {
//         console.error("Error in main function:", error);
//     }
// }

// main();

module.exports = { disinformationDetector, disinformationDetectorPic };

