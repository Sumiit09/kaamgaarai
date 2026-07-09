import supabase from "../config/supabase.js";

import { extractIntent } from "../ai/intentExtractor.js";
import { parseGeminiJSON } from "../utils/jsonParser.js";

import { buildPrompt } from "../ai/promptBuilder.js";
import { getAIResponse } from "../services/chatService.js";

import { manageConversation } from "../ai/conversationManager.js";
import { saveBooking } from "../services/bookingService.js";

export const chat = async (req, res) => {
    try {

        const {
            businessId = 1,
            phone,
            message
        } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Phone is required"
            });
        }

        // Business
        const { data: business, error: businessError } = await supabase
            .from("businesses")
            .select("*")
            .eq("id", businessId)
            .single();

        if (businessError) throw businessError;

        // Services
        const { data: services, error: servicesError } = await supabase
            .from("services")
            .select("*")
            .eq("business_id", businessId);

        if (servicesError) throw servicesError;

        // Detect intent
        const rawIntent = await extractIntent(message);

        const intent = parseGeminiJSON(rawIntent);
        console.log("RAW INTENT:");
console.log(rawIntent);

console.log("PARSED INTENT:");
console.log(intent);

        if (
            intent &&
            intent.intent === "book_appointment"
        ) {

            const session = await manageConversation(
                businessId,
                phone,
                intent
            );
            console.log("SESSION:");
console.log(session);

            // Check if all required details exist
            if (
                session.customer_name &&
                session.service &&
                session.appointment_date &&
                session.appointment_time
            ) {

                const booking = await saveBooking({
                    business_id: businessId,
                    customer_name: session.customer_name,
                    phone: phone,
                    service: session.service,
                    appointment_date: session.appointment_date,
                    appointment_time: session.appointment_time
                });

                return res.json({
                    success: true,
                    type: "booking_created",
                    booking
                });
            }

            // Missing details
            if (!session.customer_name) {
                return res.json({
                    success: true,
                    reply: "May I know your name?"
                });
            }

            if (!session.service) {
                return res.json({
                    success: true,
                    reply: "Which service would you like?"
                });
            }

            if (!session.appointment_date) {
                return res.json({
                    success: true,
                    reply: "Which date would you like?"
                });
            }

            if (!session.appointment_time) {
                return res.json({
                    success: true,
                    reply: "What time would you like?"
                });
            }
        }

        // Normal AI chat
        const reply = await getAIResponse(
            business,
            services,
            message
        );

        res.json({
            success: true,
            type: "chat",
            reply
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};