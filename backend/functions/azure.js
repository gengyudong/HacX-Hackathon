const { AzureOpenAI } = require("openai");
require('dotenv').config();

// Load API details for Azure OpenAI
const openai_endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const openai_apiKey = process.env["AZURE_OPENAI_API_KEY"];
const apiVersion = "2024-05-01-preview";
const openai_deployment = "gpt-4o";

// Extract assertions from the scrapped content (OpenAI)
async function assertionExtractor(prompt) {
    try {
        const client = new AzureOpenAI({ openai_endpoint, openai_apiKey, apiVersion, openai_deployment });
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

module.exports = assertionExtractor