const axios = require("axios");

const tavily_endpoint = process.env["TAVILY_ENDPOINT"];
const tavily_apikey = process.env["TAVILY_API_KEY"];

// Disinformation detection function (Tavily AI)
async function disinformationDetector(query) {
    try {
        // edit query
        const result = await axios.post(tavily_endpoint, {
            "api_key": tavily_apikey,
            "query": query,
            "search_depth": "basic",
            "topic": "general",
            "include_answer": true,
            "include_images": false,
            "include_image_descriptions": false,
            "include_raw_content": false,
            "max_results": 20,
            "include_domains": [],
            "exclude_domains": []
        })
        return result.data.answer;
    } catch (error) {
        console.error("Error calling Tavily AI:", error);
        throw error;
    }
}

module.exports = disinformationDetector;