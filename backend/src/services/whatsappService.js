import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendWhatsAppMessage = async (to, message) => {
    try {

        console.log("PHONE_NUMBER_ID:", process.env.PHONE_NUMBER_ID);
        console.log(
            "ACCESS_TOKEN:",
            process.env.WHATSAPP_ACCESS_TOKEN ? "Loaded ✅" : "Missing ❌"
        );

        const response = await axios.post(
  `https://graph.facebook.com/v25.0/${process.env.PHONE_NUMBER_ID}/messages`,
  {
    messaging_product: "whatsapp",
    to: to,
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US"
      }
    }
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    }
  }
);

        return response.data;

    } catch (error) {

        console.error("WHATSAPP ERROR:");
        console.error(error.response?.data || error.message);

        throw error;

    }
};