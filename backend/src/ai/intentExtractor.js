import ai from "../services/geminiService.js";

export const extractIntent = async (message) => {

    const today = new Date().toISOString().split("T")[0];

    const prompt = `
Today's date is ${today}.

Return ONLY valid JSON.

Intent values MUST be exactly one of:

- book_appointment
- ask_services
- ask_price
- greeting
- unknown

Rules:

- Never use bookAppointment.
- Always use snake_case.
- Convert "tomorrow" into the real date.
- Convert time into HH:MM:SS (24-hour).

Format:

{
  "intent":"",
  "customerName":"",
  "service":"",
  "appointmentDate":"",
  "appointmentTime":""
}

User:

${message}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
};