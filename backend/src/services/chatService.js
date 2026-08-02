import ai from "./geminiService.js";

import { buildPrompt } from "../ai/promptBuilder.js";
import { extractIntent } from "../ai/intentExtractor.js";

import { routeAction } from "./actionRouter.js";

import {
    getBusiness,
    getServices
} from "./businessService.js";

export const getAIResponse = async ({
    businessId,
    phone,
    message
}) => {

    // Fetch Business Context
    const business = await getBusiness(businessId);
    const services = await getServices(businessId);

    const customer = {};
    const conversationHistory = [];

    // Build Prompt
    const prompt = buildPrompt({
        business,
        services,
        customer,
        conversationHistory,
        userMessage: message,
        currentDateTime: new Date().toLocaleString("en-IN")
    });

    // Generate AI response (kept for conversational context)
    await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    // Extract structured intent
    const intentData = await extractIntent(message);

    // Route to the appropriate handler
    return await routeAction(intentData, {
        businessId,
        phone,
        business,
        services,
        customer,
        conversationHistory
    });

};