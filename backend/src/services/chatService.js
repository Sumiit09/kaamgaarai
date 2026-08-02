export const getAIResponse = async ({
    business,
    services,
    customer,
    conversationHistory,
    message
}) => {

    const prompt = buildPrompt({
        business,
        services,
        customer,
        conversationHistory,
        userMessage: message,
        currentDateTime: new Date().toLocaleString("en-IN")
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
};