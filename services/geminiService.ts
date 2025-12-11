import { GoogleGenAI, Type } from "@google/genai";
import { CustomerProfile, AiInsight } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is missing from environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateMockProfile = async (): Promise<CustomerProfile> => {
  const ai = getAiClient();
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Generate a realistic mock customer profile for a furniture store named Pine Valley Furniture. The customer should have a history of purchasing.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          currentDate: { type: Type.STRING },
          customerId: { type: Type.STRING },
          lastName: { type: Type.STRING },
          firstName: { type: Type.STRING },
          address: { type: Type.STRING },
          city: { type: Type.STRING },
          state: { type: Type.STRING },
          zip: { type: Type.STRING },
          isFirstTimeCustomer: { type: Type.STRING, enum: ["Y", "N"] },
          visitsBeforePurchasing: { type: Type.INTEGER },
          hearAboutSource: { type: Type.STRING },
          firstPurchaseDate: { type: Type.STRING },
          avgYearlySpend: { type: Type.NUMBER },
          monthlyStoreVisits: { type: Type.INTEGER },
        },
      },
    },
  });

  if (response.text) {
    return JSON.parse(response.text) as CustomerProfile;
  }
  throw new Error("Failed to generate profile");
};

export const analyzeProfile = async (profile: CustomerProfile): Promise<AiInsight[]> => {
  const ai = getAiClient();

  const prompt = `Analyze this customer profile for Pine Valley Furniture and provide 3 key insights for the sales team. 
  Focus on Customer Lifetime Value, engagement opportunities, or retention risks.
  
  Profile: ${JSON.stringify(profile)}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ["opportunity", "risk", "neutral"] },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
          }
        }
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as AiInsight[];
  }
  return [];
};
