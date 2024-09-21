const { OPENAI_API_KEY } = require('./config');
const OpenAI = require('openai');

class OpenAIHelper {
  constructor(_openai) {
    this.openai = _openai || this.createOpenAIInstance();
  }

  createOpenAIInstance() {
    return new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true, // TODO: Verify necessity based on your security requirements
    });
  }

  async askChatGPTAboutImage({ base64Image, prompt, maxTokens = 350 }) {
    return this.openai.chat.completions.create({
      model: 'gpt-4o', // Ensure this is the correct model for your needs
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
    });
  }

  getResponseJSONString(response) {
    return response.choices[0]?.message?.content || '';
  }

  cleanChatGPTJSONString(jsonString) {
    return jsonString.replace(/```json|```/g, '').trim();
  }

  parseChatGPTJSONString(jsonString) {
    if (!jsonString) return;

    const content = this.cleanChatGPTJSONString(jsonString);
    try {
      return content ? JSON.parse(content) : undefined;
    } catch (error) {
      console.error('Failed to parse ChatGPT response:', error);
    }
  }
}

module.exports = OpenAIHelper;
