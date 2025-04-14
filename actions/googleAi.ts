"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set");
}

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateContentAi(prompt: string) {
  const model = genAi.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const cleanResponse = text.trim().replace(/^```json|```$/g, "");
  const parsedResponse = JSON.parse(cleanResponse);

  console.log("parsedResponse", parsedResponse);
  return parsedResponse;
}
