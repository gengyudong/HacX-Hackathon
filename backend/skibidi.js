const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonHelper1 = require('./tools/jsonHelper');
const fetchSearchResults = require('./functions/googlesearch');
const { assertionExtractor, askAzureAboutImage, getRelevantTopSearches } = require('./functions/azure');
const { disinformationDetector, disinformationDetectorPic } = require('./functions/tavily');
const scrapeBody = require('./functions/scrapeany');
const { getTopSearchesAroundDate, getCurrentDateString } = require('./functions/googletrends');
const mediaTranscribe = require('./functions/mediaTranscribe');
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Middleware to parse JSON bodies

const jsonHelper = new jsonHelper1();

app.post('/describe-image', async (req, res) => {
  const { image_url } = req.body;
  console.log('Image URL:', image_url);
  if (!image_url) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    const prompt = `
        Analyze the image provided. Retrieve information on the content of the image such as:
        1. Words or text present in the image.
        2. Subjects, objects or entities present in the image and you must include their names.
        3. Any actions or activities taking place in the image.
        4. Any other relevant details you can infer from the image.
        Analysis has to be less than 200 characters.

        Please respond with a JSON object as follows:
        {
        "descriptionOfAnalysis": "Chances image is real: 0-1 and Analysis:"
        }
    `;    
    const response = await askAzureAboutImage({ base64Image: image_url, prompt });
    const jsonResponse = jsonHelper.getResponseJSONString(response);
    const cleanResponse = jsonHelper.cleanChatGPTJSONString(jsonResponse);   
    const parsedResponse = jsonHelper.parseChatGPTJSONString(cleanResponse);
    console.log('Parsed response:', parsedResponse);
    const disinformationSearch = `${parsedResponse.descriptionOfAnalysis} Please provide a long and clear assessment of its truthfulness and if it is AI-generated and spreads disinformation?`;
    const disinformationResult = await disinformationDetectorPic(disinformationSearch);
    const escapedResult = disinformationResult.replace(/"/g, '\\"');
    const cleanString = escapedResult.replace(/[\u0000-\u001F\u007F-\u009F]/g, ' '); 
    const jsonString = `{"disinformationResult": "${cleanString}"}`; // Example JSON string  
    const jsonDisinformation = JSON.parse(jsonString);
    console.log('Disinformation result:', jsonDisinformation);
    res.status(200).json(jsonDisinformation);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.post('/scrape', async (req, res) => {
  const { post_url } = req.body;

  if (!post_url) {
      return res.status(400).json({ error: 'No post URL provided' });
  }

  const scrapeResults = await scrapeBody(post_url);
  console.log('Post details:', scrapeResults);

  if (!scrapeResults) {
      return res.status(500).json({ error: 'Failed to scrape the post' });
  }

  const cleanResults = jsonHelper.cleanChatGPTJSONString(scrapeResults);   
  const parsedResults = jsonHelper.parseChatGPTJSONString(cleanResults);

  const postDetails = {
    post_title: parsedResults.post_title,
    author: parsedResults.author,
    date: parsedResults.date,
    platform: parsedResults.platform
};

// Extract assertions
  const assertions = {
      assertion_1: parsedResults.assertion_1,
      assertion_2: parsedResults.assertion_2,
      assertion_3: parsedResults.assertion_3
  };

  const searchQueryGoogle = `${postDetails.post_title}`;
  const searchResults = await fetchSearchResults(searchQueryGoogle);

  const similarResults = searchResults.organic_results.slice(1, 6).map(result => ({
    title: result.title,
    link: result.link,
  }));

  const disinformationResult = await disinformationDetector(assertions);
  const jsonData = JSON.stringify(disinformationResult, null, 2);
  const jsonDisinformation = JSON.parse(jsonData);
  
  const result = { postDetails, similarResults, jsonDisinformation };
  res.status(200).json(result);
});

app.post('/topsearch', async (req, res) => {
  const todayDate = getCurrentDateString();
  const result = await getTopSearchesAroundDate(todayDate);
  const resultToday = await getRelevantTopSearches(todayDate, getTopSearchesAroundDate);
  console.log('Top searches:', resultToday);
  res.status(200).json(resultToday);
});

app.post('/audio', async (req, res) => {
  const audio_url = './public/test.mp4';
  console.log('Audio URL:', audio_url);
  if (!audio_url) {
    return res.status(400).json({ error: 'Audio URL is required' });
  }
  const resultTranscribe = await mediaTranscribe(audio_url);
  const assertions = await assertionExtractor(resultTranscribe.text);
  const cleanResults = jsonHelper.cleanChatGPTJSONString(assertions);   
  const parsedResults = jsonHelper.parseChatGPTJSONString(cleanResults);
  const disinformationResult = await disinformationDetector(parsedResults);
  const jsonData = JSON.stringify(disinformationResult, null, 2);
  const jsonDisinformation = JSON.parse(jsonData);
  console.log('Parsed results:', parsedResults);
  console.log('Disinformation result:', jsonDisinformation);
  const result = { parsedResults, jsonDisinformation };
  res.status(200).json(result);

});

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

// app.post('/redditscrape', async (req, res) => {
//   const { post_url } = req.body;

//   if (!post_url) {
//       return res.status(400).json({ error: 'No post URL provided' });
//   }

//   const postDetails = await fetchRedditPostDetails(post_url);

//   if (!postDetails) {
//       return res.status(500).json({ error: 'Failed to scrape the post' });
//   }

//   const searchQueryGoogle = `${postDetails.post_title}`;
//   const searchQuery = `${postDetails.post_title} ${postDetails.paragraph_texts.join(' ')}`;
//   const searchResults = await fetchSearchResults(searchQueryGoogle);
//   const assertionResult = await assertionExtractor(searchQuery);
//   const cleanAssertion = jsonHelper.cleanChatGPTJSONString(assertionResult);   
//   const parsedAssertion = jsonHelper.parseChatGPTJSONString(cleanAssertion);

//   const disinformationResult = await disinformationDetector(parsedAssertion);
//   const jsonData = JSON.stringify(disinformationResult, null, 2);
//   const jsonDisinformation = JSON.parse(jsonData);

//   const similarResults = searchResults.organic_results.slice(1, 6).map(result => ({
//     title: result.title,
//     link: result.link,
//   }));
  
//   const result = { postDetails, similarResults, jsonDisinformation };
//   res.status(200).json(result);
// });
