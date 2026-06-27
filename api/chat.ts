import type { VercelRequest, VercelResponse } from '@vercel/node';

const allowedOrigins = [
  'https://skillhive.name.ng',
  'https://www.skillhive.name.ng',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

function getCorsHeaders(origin: string | undefined) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    res.setHeader('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    res.setHeader('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    res.setHeader('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!Array.isArray(messages) || !messages.length) {
      res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
      return res.status(400).json({ error: 'Messages are required.' });
    }

    if (!apiKey) {
      res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
      return res.status(500).json({ error: 'Server misconfiguration. GEMINI_API_KEY is missing.' });
    }

    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction =
      'You are the SkillHive AI Assistant. You help users grow their business, explore services, book consultations, ' +
      'and answer general inquiries about marketing, training, and strategic solutions. Keep answers concise, helpful and engaging.';

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
      },
    });

    res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini Error:', error);
    const isInvalidKey = error?.status === 400 || error?.message?.includes('API key not valid') || error?.status === 'INVALID_ARGUMENT';
    res.setHeader('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    return res.status(500).json({
      text: isInvalidKey
        ? 'The AI Assistant is currently offline (Invalid API Key).'
        : 'Failed to communicate with AI Assistant.',
    });
  }
}
