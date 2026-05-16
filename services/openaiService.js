const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function analyzeCase(caseText) {

  const prompt = `
You are a legal assistant.

Given the following legal case text:

"${caseText}"

Perform these tasks:

1. Summarize the case in simple language.
2. Identify relevant IPC sections.
3. Explain why those IPC sections apply.

Return response in JSON format:
{
  "summary": "",
  "ipc_sections": [],
  "reasoning": ""
}
`;

  const response = await client.chat.completions.create({
    model: "meta-llama/llama-3-8b-instruct",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.2
  });

  return response.choices[0].message.content;
}

module.exports = { analyzeCase };