const { AzureOpenAI } = require("openai");
require('dotenv').config();

// Load API details for Azure OpenAI
const openAIendPoint = process.env["AZURE_OPENAI_ENDPOINT"];
const openAIapiKey = process.env["AZURE_OPENAI_API_KEY"];
const apiVersion = "2024-05-01-preview";
const openAIdeployment = "gpt-4o";

// Extract assertions from the scrapped content (OpenAI)
async function assertionExtractor(prompt) {
    try {
        const client = new AzureOpenAI({ openAIendPoint, openAIapiKey, apiVersion, openAIdeployment });
        const result = await client.chat.completions.create({
            messages: [
            { 
                "role": "system", 
                "content": [
                    {
                    "type": "text",
                    "text": "A chunk of paragraphs will be presented to you. These paragraphs can be assertions made by online netizens or news published by some agency. Your goal is to identity all of the assertions or comments made within the paragraphs. Return the output in JSON format {\"assertion_1\": \"Input the assertion you identity here\"}. Just return the JSON will do, do not add anything before or after the output\n\n"
                    }
                ] 
            },
            { 
                "role": "user", 
                "content": [
                    {
                    "type": "text",
                    "text": prompt
                    }
                ] 
            }
            ],
            model: "",
        });
        const response = result.choices.map(choice => choice.message.content).join('\n');
        return response;
    } catch(error) {
        console.error("Error calling Azure OpenAI:", error);
        throw error;
    }
}

    async function askAzureAboutImage({ base64Image, prompt, maxTokens = 5000 }) {
        try {
            const client = new AzureOpenAI({ openAIendPoint, openAIapiKey, apiVersion, openAIdeployment });
            return client.chat.completions.create({
                max_tokens: maxTokens,
                messages: [
                    {
                      role: 'user',
                      content: [
                        { type: 'text', text: prompt },
                        {
                          type: 'image_url',
                          image_url: { url: base64Image },
                        },
                      ],
                    },
                  ],
                model: "",
            });
        } catch(error) {
        console.error("Error calling Azure OpenAI:", error);
        throw error;
    }
}

async function bodyTagExtractor(query) {
    try {
        const client = new AzureOpenAI({ openAIendPoint, openAIapiKey, apiVersion, openAIdeployment });
        const prompt = `A chunk of <body> tag will be passed to you. 
                        Identify any information that can be assertions made by online netizens or news published by some agency. 
                        Your goal is to identity all of the assertions or comments made within the paragraphs. 
                        Return the output in JSON format 
                        {\"post_title\": \"Input post title you identify here\", \"author\": \"Input author you identify here\", \"date\": \"Input date you identify here\", \"platform\": \"Input platform you identify here\", \"assertion_1\": \"Input the assertion you identify here\"}. 
                        Limit to 3 assertions. Just return the JSON will do, do not add anything before or after the output\n\n`;
        const result = await client.chat.completions.create({
            messages: [
            { 
                "role": "system", 
                "content": [
                    {
                    "type": "text",
                    "text": prompt
                    }
                ] 
            },
            { 
                "role": "user", 
                "content": [
                    {
                    "type": "text",
                    "text": query
                    }
                ] 
            }
            ],
            model: "",
        });
        const response = result.choices.map(choice => choice.message.content).join('\n');
        return response;
    } catch(error) {
        console.error("Error calling Azure OpenAI:", error);
        throw error;
    }
}

async function getRelevantTopSearches(onDate, getTopSearchesAroundDate) {
    try {
        const client = new AzureOpenAI({ openAIendPoint, openAIapiKey, apiVersion, openAIdeployment });
        const promptData = await getTopSearchesAroundDate(onDate)
        const prompt = JSON.stringify(promptData)
        const result = await client.chat.completions.create({
            messages: [
                {
                    "role": "system",
                    "content": [
                        {
                            "type": "text",
                            "text": "You are given a JSON in the string format. This contains information about top google searches which span over a few days, or might be just one. For each date, there are queries, these are topics that people search. In each query, there might be some related_queries, which are related topics. Within each query there are also articles and each article has a title, link, source, snippet and date field (there might be more but I'm not interested in them). Filter through all this information in the JSON string and pick out the queries with articles that are closely related to Singapore, or can affect public interest and the economy in Singapore (doesn't have to be about Singapore). Return the information in a JSON string. This is an example format: { query: “Singapore new prime minister”, articles: { link: “article_link”, source: “article source”, snippet:”snippet”, date: “5 hours ago”}} The example only shows one query, but there should be more in the JSON string returned (each query will have their own articles, and each articles object only have one query). Parse the data into a JSON string for me, nothing else, not even the weird json''' ''' you put."
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ]
                }
            ],
            model: "",
        });
        // Extract the content from the OpenAI response
        const responseContent = result.choices[0].message.content;
        // Remove unwanted characters at the beginning and end
        const cleanedResult = responseContent
            .replace(/^```json\s*/, '') // Remove leading "```json" and any whitespace
            .replace(/```$/, '') // Remove trailing "```"
            .trim(); // Trim any extra whitespace
        // Try to parse the cleaned response
        const responseJson = JSON.parse(cleanedResult);
        // Return the parsed JSON object
        return responseJson;
    } catch (error) {
        console.error("Error calling Azure OpenAI:", error);
        throw error;
    }
}

module.exports = { assertionExtractor, askAzureAboutImage, bodyTagExtractor, getRelevantTopSearches };
