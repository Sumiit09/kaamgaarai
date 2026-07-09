import ai from "../services/geminiService.js";

export const chat = async (req, res) => {
    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
        });

        res.status(200).json({
            success: true,
            reply: response.text,
        });

    } catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};