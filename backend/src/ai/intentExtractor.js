import ai from "../services/geminiService.js";

export const extractIntent = async (message) => {

    const today = new Date().toISOString().split("T")[0];

    const prompt = `
You are the AI Decision Engine for Kaamgaar AI.

Today's date is ${today}.

Your job is to understand the customer's message and extract structured business information.

--------------------------------------------------
SUPPORTED INTENTS
--------------------------------------------------

- greeting
- book_appointment
- cancel_appointment
- reschedule_appointment
- ask_services
- ask_price
- business_hours
- location
- faq
- human_support
- complaint
- feedback
- goodbye
- unknown

--------------------------------------------------
RULES
--------------------------------------------------

1. Return ONLY valid JSON.

2. Never use markdown.

3. Never use \`\`\`json.

4. Never explain your answer.

5. Never guess.

6. If information is missing use null.

7. Intent MUST be snake_case.

8. Confidence must be between 0 and 1.

9. Convert "tomorrow" into the actual date.

10. Convert all times into HH:MM:SS (24-hour).

11. reply should be natural and customer-friendly.

12. missingFields must contain every required value still needed.

--------------------------------------------------
JSON FORMAT
--------------------------------------------------

{
  "intent": "",
  "confidence": 0,

  "reply": "",

  "entities": {

    "customerName": null,

    "service": null,

    "appointmentDate": null,

    "appointmentTime": null

  },

  "missingFields": [],

  "nextAction": ""
}

--------------------------------------------------
NEXT ACTION VALUES
--------------------------------------------------

ASK_MISSING_DETAILS

CREATE_BOOKING

ANSWER_SERVICE_QUERY

ANSWER_PRICE_QUERY

TRANSFER_TO_HUMAN

GENERAL_REPLY

UNKNOWN

--------------------------------------------------
USER MESSAGE
--------------------------------------------------

${message}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    const raw = response.text;

try {
    return JSON.parse(raw);
} catch (error) {

    console.error("Intent JSON Parse Error:", error);

    console.log(raw);

    return {
        intent: "unknown",
        confidence: 0,
        reply: "Sorry, I couldn't understand your request.",
        entities: {
            customerName: null,
            service: null,
            appointmentDate: null,
            appointmentTime: null
        },
        missingFields: [],
        nextAction: "UNKNOWN"
    };
}
};