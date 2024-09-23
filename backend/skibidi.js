const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAIHelper = require('./openai/OpenAIHelper');
const fetchRedditPostDetails = require('./functions/redditscrape');
const fetchSearchResults = require('./functions/googlesearch');
const assertionExtractor = require('./functions/azure');
const { disinformationDetector, disinformationDetectorPic } = require('./functions/tavily');
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Middleware to parse JSON bodies

const openAIHelper = new OpenAIHelper();

app.post('/scrape', async (req, res) => {
  const { post_url } = req.body;

  if (!post_url) {
      return res.status(400).json({ error: 'No post URL provided' });
  }

  const postDetails = await fetchRedditPostDetails(post_url);

  if (!postDetails) {
      return res.status(500).json({ error: 'Failed to scrape the post' });
  }

  const searchQueryGoogle = `${postDetails.post_title}`;
  const searchQuery = `${postDetails.post_title} ${postDetails.paragraph_texts.join(' ')}`;
  const searchResults = await fetchSearchResults(searchQueryGoogle);
  const assertionResult = await assertionExtractor(searchQuery);
  const cleanAssertion = openAIHelper.cleanChatGPTJSONString(assertionResult);   
  const parsedAssertion = openAIHelper.parseChatGPTJSONString(cleanAssertion);

  const disinformationResult = await disinformationDetector(parsedAssertion);
  const jsonData = JSON.stringify(disinformationResult, null, 2);
  const jsonDisinformation = JSON.parse(jsonData);

  // const parsedAssertion = openAIHelper.parseChatGPTJSONString(assertionResult);

  // const disinformationSearch = `${parsedAssertion.assertion} Can you provide a long and clear assessment of its truthfulness and if it contains fake news and spreads disinformation?`;
  // const disinformationResult = await disinformationDetector(disinformationSearch);
  // const escapedResult = disinformationResult.replace(/"/g, '\\"');
  // const cleanString = escapedResult.replace(/[\u0000-\u001F\u007F-\u009F]/g, ' '); 
  // const jsonString = `{"disinformationResult": "${cleanString}"}`; // Example JSON string
  // const jsonDisinformation = JSON.parse(jsonString);
  const similarResults = searchResults.organic_results.slice(1, 6).map(result => ({
    title: result.title,
    link: result.link,
  }));
  
  const result = { postDetails, similarResults, jsonDisinformation };
  res.status(200).json(result);
});

// Endpoint to handle image analysis requests
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
        2. Subjects, objects or entities present in the image and include their names if recognisable.
        3. Any actions or activities taking place in the image.
        4. Any other relevant details you can infer from the image.
        Analysis has to be less than 200 characters.

        Please respond with a JSON object as follows:
        {
        "descriptionOfAnalysis": "Chances of image being real: 0-1 and Analysis:"
        }
    `;    
    const response = await openAIHelper.askChatGPTAboutImage({ base64Image: image_url, prompt });
    const jsonResponse = openAIHelper.getResponseJSONString(response);
    const cleanResponse = openAIHelper.cleanChatGPTJSONString(jsonResponse);   
    const parsedResponse = openAIHelper.parseChatGPTJSONString(cleanResponse);
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

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
