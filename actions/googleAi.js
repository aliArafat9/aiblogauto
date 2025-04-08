"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { console } from "inspector";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateContentAi(prompt) {
    const model = genAi.getGenerativeModel({
        model: "gemini-2.5-pro-exp-03-25",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text =  response.text();

    const cleanResponse = text.trim().replace(/^```json|```$/g, "");
    const parseResponse = JSON.parse(cleanResponse);

    console.log("parsedResponse", parseResponse);
    return parseResponse;
}