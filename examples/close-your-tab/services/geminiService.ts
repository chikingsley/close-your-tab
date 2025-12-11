import { GoogleGenAI, Type } from "@google/genai";
import { TabSession } from "../types";

const apiKey = process.env.API_KEY || '';

// Fallback if no API key is provided
const MOCK_INSIGHT = "I can't analyze your data without a valid API Key, but it looks like you enjoy your weekends! Remember to hydrate.";

export const analyzeSpendingHabits = async (history: TabSession[]): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key found for Gemini Service");
    return MOCK_INSIGHT;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Prepare data for the model
    const historySummary = history.map(h => ({
      venue: h.venueName,
      date: new Date(h.startTime).toLocaleDateString(),
      total: h.totalAmount || 0,
      duration: h.endTime ? (new Date(h.endTime).getTime() - new Date(h.startTime).getTime()) / 60000 : 0 // minutes
    }));

    const prompt = `
      You are a witty financial sidekick for a bar tab tracking app called "Close Your Tab".
      Analyze the user's recent bar spending history provided in JSON format.
      
      Data: ${JSON.stringify(historySummary)}

      Provide a short, fun, and slightly sassy paragraph (max 100 words) summarizing their habits. 
      Point out if they go out mostly on weekends, if they are a "big spender", or if they are responsible.
      End with a responsible drinking tip.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster simple text response
        temperature: 0.7,
      }
    });

    return response.text || "Could not generate insights at this time.";

  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Gemini is taking a nap. Try again later for insights!";
  }
};

export const suggestDrinkPrice = async (venueName: string, city: string = "general"): Promise<number> => {
   if (!apiKey) return 12; // Default fallback

   try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Estimate the average price of a standard mixed drink or beer at a place called "${venueName}" in or near ${city}. Return ONLY a number representing the price in USD.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            price: { type: Type.NUMBER }
          }
        }
      }
    });
    
    const data = JSON.parse(response.text);
    return data.price || 12;

   } catch (e) {
     return 12;
   }
}