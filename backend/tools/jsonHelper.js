class OpenAIHelper {

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
