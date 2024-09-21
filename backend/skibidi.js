const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAIHelper = require('./openai/OpenAIHelper');
const fetchRedditPostDetails = require('./functions/redditscrape');
const fetchSearchResults = require('./functions/googlesearch');
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Middleware to parse JSON bodies

const openAIHelper = new OpenAIHelper();

// app.post('/skibidi', (req, res) => {
//   const inputValue = req.body.post_url; // Get the input value from the request body
//   console.log('Received post_url:', inputValue);

//   if (!inputValue) {
//     return res.status(400).json({ error: 'post_url is required' });
//   }

//   // Here you can process the input value (e.g., save to a database)
//   console.log('Input received successfully:', inputValue);

//   // Respond to the client
//   res.status(200).json({ message: 'Input received successfully!' });
// });

app.post('/scrape', async (req, res) => {
  const { post_url } = req.body;

  if (!post_url) {
      return res.status(400).json({ error: 'No post URL provided' });
  }

  const postDetails = await fetchRedditPostDetails(post_url);

  if (!postDetails) {
      return res.status(500).json({ error: 'Failed to scrape the post' });
  }

  const searchQuery = `${postDetails.post_title}`;
  const searchResults = await fetchSearchResults(searchQuery);
  const similarResults = searchResults.organic_results.slice(1, 6).map(result => ({
    title: result.title,
    link: result.link,
  }));
  const result = { postDetails, similarResults };
  console.log('Post details:', result);
  res.json(result);
});

// Endpoint to handle image analysis requests
app.post('/describe-image', async (req, res) => {
  const { image_url } = req.body;
  
  if (!image_url) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    const prompt = `
        Analyze the image provided. The image MUST satisfy all of the following criteria:
        1. It must not be an AI-generated image.
        2. It must not contain any disinformation or fake news.
        
        Please respond with a JSON object as follows:
        {
        "validityFactor": 0 or 1,
        "descriptionOfAnalysis": "Your analysis here."
        }
    `;    
    const response = await openAIHelper.askChatGPTAboutImage({ base64Image: image_url, prompt });
    const jsonResponse = openAIHelper.getResponseJSONString(response);
    const cleanResponse = openAIHelper.cleanChatGPTJSONString(jsonResponse);   
    const parsedResponse = openAIHelper.parseChatGPTJSONString(cleanResponse);
    console.log('********')
    console.log("Validity factor of image:", parsedResponse.validityFactor); // Log the parsed response
    console.log("Parsed response from OpenAI:", parsedResponse.descriptionOfAnalysis); // Log the parsed response
    console.log('********')
    res.status(200).json(parsedResponse);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
