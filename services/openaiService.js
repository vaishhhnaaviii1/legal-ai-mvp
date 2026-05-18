const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function analyzeCase(caseText) {

const prompt = `
You are an advanced Indian Legal AI Assistant.

Analyze the following legal case carefully.

Case:
"${caseText}"

Tasks:

1. Create a detailed summary of the case in simple legal language.

2. Predict ALL possible relevant IPC sections.

IMPORTANT:
- Include exact IPC sub-sections whenever applicable.
- VERY IMPORTANT:
  - Predict highly specific IPC sections and sub-parts.
  - Examples:
    - IPC 302
    - IPC 304B
    - IPC 307
    - IPC 326A
    - IPC 354A
    - IPC 354B
    - IPC 354C
    - IPC 354D
    - IPC 376
    - IPC 376A
    - IPC 376B
    - IPC 376C
    - IPC 376D
    - IPC 498A
    - IPC 509
    - IPC 120B
    - IPC 201
    - IPC 420
    - IPC 467
    - IPC 468
    - IPC 471
    - IPC 34
    - IPC 149
- Do NOT give only broad IPC sections.
- Always try to predict the MOST SPECIFIC IPC section/sub-section possible.
- If multiple IPC sub-sections may apply, include all relevant possibilities.

3. For EACH IPC section:
- Mention probability/confidence percentage
- Explain why that IPC section may apply

4. Break the case into smaller sub-incidents/events if possible.

Examples:
- assault
- kidnapping
- poisoning
- harassment
- intimidation
- extortion
- conspiracy
- stalking
- sexual harassment
- dowry harassment
- acid attack
- forgery
- cheating

5. For EACH sub-incident:
- Mention relevant IPC sections/sub-sections
- Mention probability percentage
- Explain reasoning

IMPORTANT RULES:
- Return ONLY pure JSON
- Do NOT write any extra sentence
- Do NOT use markdown
- Response must start with {
- Response must end with }

Return format:

{
  "summary": "Detailed case summary",

  "overall_ipc_analysis": [
    {
      "ipc_section": "IPC 376D",
      "probability": "92%",
      "reason": "Reason why this IPC applies"
    }
  ],

  "sub_incidents": [
    {
      "incident": "Victim was assaulted",

      "possible_ipc_sections": [
        {
          "ipc_section": "IPC 354B",
          "probability": "87%",
          "reason": "Assault involving disrobing or criminal force"
        },

        {
          "ipc_section": "IPC 323",
          "probability": "78%",
          "reason": "Physical hurt caused to victim"
        }
      ]
    }
  ],

  "final_observation": "Overall legal interpretation"
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