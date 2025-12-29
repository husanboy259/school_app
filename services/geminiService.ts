
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateGradeComment = async (studentName: string, subject: string, grade: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a short, encouraging teacher comment for a student named ${studentName} who received a grade of ${grade}/5 in ${subject}. Be professional and concise.`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 100,
    }
  });
  return response.text?.trim() || "Great effort, keep it up!";
};

export const analyzeSchoolStats = async (stats: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze these school performance statistics: ${JSON.stringify(stats)}. Provide 3 actionable insights for the principal.`,
    config: {
      temperature: 0.5,
      maxOutputTokens: 300,
    }
  });
  return response.text || "Unable to analyze stats at this time.";
};
