import { getAIResponse } from "../services/chatService.js";

export const chat = async (req, res) => {
   
    try {

        const {
            businessId = 1,
            phone,
            message
        } = req.body;

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone is required"
            });
        }

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }
        console.log("STEP 1 - CHAT CONTROLLER");
        const result = await getAIResponse({
            businessId,
            phone,
            message
        });

        return res.json(result);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};