
import { GoogleGenAI } from "@google/genai";
import { ZoneType } from "../types";

/**
 * Generates a response from the Gemini model based on the selected zone's persona.
 */
export const generateZoneResponse = async (
  zonePrompt: string,
  userMessage: string,
  history: { role: string; content: string }[] = []
) => {
  // Always use a new instance with the API key from environment variables.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Clean history for the model and map roles correctly ('model' instead of 'assistant').
  const contents = history.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));

  // Add current user message to the conversation.
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

    // Access the text property directly from the response.
    return response.text || "I am processing your input...";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};
