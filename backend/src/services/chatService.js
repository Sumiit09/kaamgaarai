import ai from "./geminiService.js";
import { buildPrompt } from "../ai/promptBuilder.js";

export const getAIResponse = async (business, services, message) => {

    const prompt = buildPrompt(
        business,
        services,
        message
    );

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
};