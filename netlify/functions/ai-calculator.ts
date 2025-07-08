import { GoogleGenAI } from "@google/genai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export default async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query is required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key is not configured on the server.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: query,
        config: {
            systemInstruction: "You are a powerful calculator AI. Your task is to evaluate mathematical expressions or solve word problems provided by the user. Respond with only the final numerical answer or a very direct and short answer. Do not add any extra text, explanations, or units unless the query implies it. If the query is ambiguous or not a calculation, respond with 'I can only handle calculations.'. Keep answers concise.",
            temperature: 0,
            thinkingConfig: { thinkingBudget: 0 } 
        },
    });

    return new Response(JSON.stringify({ result: response.text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Error in AI calculator function:', err);
    return new Response(JSON.stringify({ error: err.message || 'An internal server error occurred.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

export const config = {
  path: "/ai-calculator",
};
