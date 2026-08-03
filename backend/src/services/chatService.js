import ai from "./geminiService.js";

import {
    getBusiness,
    getServices
} from "./businessService.js";

import {
    getCustomer,
    createCustomer
} from "./customerService.js";

import { buildPrompt } from "../ai/promptBuilder.js";
import { extractIntent } from "../ai/intentExtractor.js";
import { routeAction } from "./actionRouter.js";

export const getAIResponse = async ({
    businessId,
    phone,
    message
}) => {

    console.log("STEP 2 - CHAT SERVICE");

    // Fetch Business Context
    const business = await getBusiness(businessId);
    const services = await getServices(businessId);

    let customer = await getCustomer(
        businessId,
        phone
    );

    if (!customer) {

        customer = await createCustomer({
            businessId,
            phone,
            name: null
        });

    }

    const conversationHistory = [];

    const prompt = buildPrompt({
        business,
        services,
        customer,
        conversationHistory,
        userMessage: message,
        currentDateTime: new Date().toLocaleString("en-IN")
    });

    await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    const intentData = await extractIntent(message);

    console.log("STEP 3 - INTENT");
    console.log(intentData);

    console.log("STEP 4 - ROUTING");

    return await routeAction(intentData, {
        businessId,
        phone,
        business,
        services,
        customer,
        conversationHistory
    });

};