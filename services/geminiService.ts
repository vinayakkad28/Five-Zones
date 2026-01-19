
import { GoogleGenAI } from "@google/genai";
import { ZoneType } from "../types.ts";

/**
 * Generates a response from the Gemini model based on the selected zone's persona.
 */
export const generateZoneResponse = async (
  zonePrompt: string,
  userMessage: string,
  history: { role: string; content: string }[] = []
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));

  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: zonePrompt,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "I am processing your input...";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};
