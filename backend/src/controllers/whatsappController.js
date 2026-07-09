import { sendWhatsAppMessage } from "../services/whatsappService.js";

export const sendMessage = async (req, res) => {

    try {

        const { to, message } = req.body;

        const response = await sendWhatsAppMessage(to, message);

        res.json({
            success: true,
            response
        });

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: error.response?.data || error.message
        });

    }

};