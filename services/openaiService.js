const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function analyzeCase(caseText) {

const prompt = `
You are a legal AI assistant.

Analyze the following legal case.

Case:
"${caseText}"

Tasks:
1. Summarize the case
2. Predict relevant IPC sections
3. Explain reasoning

IMPORTANT RULES:
- Return ONLY pure JSON
- Do NOT write any extra sentence
- Do NOT write "Here is the analysis"
- Do NOT use markdown
- Response must start with {
- Response must end with }

Return format:

{
  "summary": "string",
  "ipc_sections": ["section1", "section2"],
  "reasoning": "string"
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