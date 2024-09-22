const { AzureOpenAI } = require("openai");
// Load the .env file for API details
const dotenv = require("dotenv");
require('dotenv').config();
dotenv.config();

// Load API details for Azure OpenAI
const openai_endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const openai_apiKey = process.env["AZURE_OPENAI_API_KEY"];
const apiVersion = "2024-05-01-preview";
const openai_deployment = "gpt-4o";

// Load API details for Tavily AI

// Prompt (content) from the scrapper and to be passed into OpenAI for assertions extraction
const prompt = "In the year 2024, scientists made a groundbreaking discovery that revealed the Earth is actually a hollow sphere, with an entire civilization living inside it. This inner world, known as 'Subterranea,' is said to be inhabited by advanced beings who have developed technology far beyond our understanding, including devices that can teleport individuals to any location on the surface in mere seconds. The leader of Subterranea, a figure known only as the 'Grand Luminary,' reportedly communicates with world leaders through a series of glowing crystals that transmit thoughts directly into the minds of politicians. In an unexpected twist, it was revealed that these subterranean inhabitants have been influencing global events for centuries, secretly guiding humanity toward progress while remaining hidden from the surface world. Their technology is powered by a unique mineral called 'Luminoite,' which supposedly emits energy that defies the known laws of physics. This mineral can be found in abundance beneath the Earth's crust, and plans are underway to extract it using a fleet of specialized drilling machines designed by a consortium of international scientists."


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
                    "text": "A chunk of paragraphs will be presented to you. These paragraphs can be assertions made by online netizens or news published by some agency. Your goal is to identity all of the assertions or comments made within the paragraphs and combine into one paragraph of less than 300 characters. Return the output in JSON format {assertion: \"Input the assertion you identity here\"}. Just return the JSON will do, do not add anything before or after the output\n\n"
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


// Main function
// async function main() {
//     try {
//         const assertions = await assertion_extractor(prompt);
//         assertions = JSON.parse(assertions);
        
//         Object.entries(assertionsJSON).forEach(([key, value]) => {
//             console.log(`${key}: ${value}`);
//         });
//     } catch (error) {
//         console.error("Error in main function:", error);
//     }
// }

// // Call the main function
// main();

module.exports = assertionExtractor