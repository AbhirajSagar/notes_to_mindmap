import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) 
{
  try 
  {
    const { text } = await req.json();
    if (!text || !text.trim()) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    const prompt = createPrompt(text);

    const completion = await groq.chat.completions.create(
    {
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    return NextResponse.json(JSON.parse(raw));
  } 
  catch (err) 
  {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function createPrompt(text) 
{
  return `
You are an assistant that converts notes into a JSON format for React Flow.
Each node must have:
  - id (unique string)
  - position (x,y)
  - data { label: string } where the label includes the heading and a concise summary of its content

Each edge must have:
  - id (unique string)
  - source (parent node id)
  - target (child node id)

Rules:
1. Treat each heading, bullet point, or subpoint as a separate node.
2. Include a **concise summary or rephrasing** of the content under each heading wherever applicable, extracting the most important gists, facts, or takeaways.
3. Indentation or nesting indicates child-parent relationships.
4. Generate positions automatically (x: horizontal level * 200, y: sequential * 50).
5. Return only valid JSON with "nodes" and "edges" arrays. Do not include any text outside JSON.

Example input:
Biology
  Cell
    The cell is the basic unit of life. It contains organelles like the nucleus and mitochondria.
  Photosynthesis
    Light reactions convert sunlight into chemical energy. Calvin cycle synthesizes glucose from CO2.

Example output:
{
  "nodes": [
    { "id": "0", "position": { "x": 0, "y": 0 }, "data": { "label": "Root" } },
    { "id": "1", "position": { "x": 200, "y": 50 }, "data": { "label": "Biology" } },
    { "id": "2", "position": { "x": 400, "y": 100 }, "data": { "label": "Cell\nBasic unit of life with nucleus and mitochondria." } },
    { "id": "3", "position": { "x": 400, "y": 150 }, "data": { "label": "Photosynthesis\nLight reactions create energy; Calvin cycle makes glucose." } }
  ],
  "edges": [
    { "id": "e0-1", "source": "0", "target": "1" },
    { "id": "e1-2", "source": "1", "target": "2" },
    { "id": "e1-3", "source": "1", "target": "3" }
  ]
}

Now convert the following text into a fully nested React Flow JSON mindmap, following the same rules:
---
${text}
---
Return only valid JSON.
`;
}
