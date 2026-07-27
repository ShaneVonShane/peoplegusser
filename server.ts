import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy Gemini AI initialization helper
  function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({ apiKey });
  }

  // API Route: Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API Route: AI Hint Generator using Gemini
  app.post('/api/ai-hint', async (req, res) => {
    try {
      const { name, occupation, origin } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Fallback hint if GEMINI_API_KEY is missing
        const firstName = name ? name.split(' ')[0] : 'This person';
        return res.json({
          hint: `Hint: Starts with "${firstName.charAt(0)}" and is from ${origin || 'somewhere in the world'}.`,
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Give a subtle, clever 1-sentence hint for guessing a person's first name without giving away the full name. 
Name: ${name}
Occupation: ${occupation || 'Unknown'}
Origin: ${origin || 'Unknown'}

Rules:
1. Reveal the first letter of their first name.
2. Mention something funny or intriguing about their profession or origin.
3. Keep it under 25 words. Do NOT reveal their last name or full first name directly.`,
      });

      const text = response.text || `Starts with "${name.charAt(0)}"!`;
      res.json({ hint: text.trim() });
    } catch (error) {
      console.error('AI Hint error:', error);
      const name = req.body.name || '';
      res.json({
        hint: name
          ? `Starts with "${name.charAt(0)}"`
          : 'No hint available right now.',
      });
    }
  });

  // API Route: Generate AI Stranger Profiles
  app.post('/api/generate-strangers', async (req, res) => {
    try {
      const { theme = 'Diverse Global' } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(400).json({
          error: 'GEMINI_API_KEY is not configured.',
        });
      }

      const prompt = `Generate 5 fictional stranger profiles for a name-guessing game. Theme: "${theme}".
Return a JSON array of objects with the following schema:
[
  {
    "name": "Full Name (e.g. Maya Lin)",
    "gender": "female" | "male",
    "occupation": "e.g. Astrophysicist",
    "origin": "e.g. Kyoto, Japan",
    "funFact": "e.g. Solved a famous math puzzle in college.",
    "photoKeyword": "portrait female asian smiling"
  }
]
Output ONLY valid JSON without markdown wrapping.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const rawText = response.text || '[]';
      const cleanJson = rawText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleanJson);
      res.json({ strangers: parsed });
    } catch (error) {
      console.error('Error generating AI strangers:', error);
      res.status(500).json({ error: 'Failed to generate strangers.' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
