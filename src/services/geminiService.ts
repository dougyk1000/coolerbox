import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface PhysiologicalData {
  heartRate: number;
  hrv: number;
  breathingRate: number;
  stressIndex: number;
}

export async function generateInsight(data: PhysiologicalData[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this physiological data and provide a brief, professional, high-performance insight (one sentence). 
      Format: "Your [metric] [behavior] [context/effect]."
      Data: ${JSON.stringify(data.slice(-10))}`,
      config: {
        systemInstruction: "You are a physiological intelligence engine for a performance wearable called VagaFlow. Your voice is scientific, precise, and encouraging. Focus on nervous system regulation and composure."
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini insight generation failed:", error);
    return null;
  }
}
