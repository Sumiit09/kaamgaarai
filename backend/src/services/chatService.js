import ai from "./geminiService.js";
import { buildPrompt } from "../ai/promptBuilder.js";
import { extractIntent } from "../ai/intentExtractor.js";
import { routeAction } from "./actionRouter.js";

export const getAIResponse = async ({
    business,
    services,
    customer = {},
    conversationHistory = [],
    message
}) => {

    // Build prompt
    const prompt = buildPrompt({
        business,
        services,
        customer,
        conversationHistory,
        userMessage: message,
        currentDateTime: new Date().toLocaleString("en-IN")
    });

    // Get conversational reply (current implementation)
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    // Extract structured intent
    const intentData = await extractIntent(message);

    // Route to correct handler
    const result = await routeAction(intentData, {
        business,
        services,
        customer,
        conversationHistory
    });

    return result;
};