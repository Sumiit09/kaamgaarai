import { manageConversation } from "../ai/conversationManager.js";
import { saveBooking } from "../services/bookingService.js";
import { matchService } from "../services/serviceMatcher.js";

export const execute = async (intentData, context) => {
console.log("BOOK APPOINTMENT HANDLER EXECUTED");
    const {
        businessId,
        phone
    } = context;

    const session = await manageConversation(
        businessId,
        phone,
        intentData
    );
const matchedService = matchService(
    session.service,
    context.services
);

if (!matchedService) {
    return {
        success: false,
        type: "invalid_service",
        reply: "Sorry, we don't offer that service. Please choose one of our available services.",
        data: {}
    };
}
    if (
        !session.customer_name ||
        !session.service ||
        !session.appointment_date ||
        !session.appointment_time
    ) {

        return {
            success: false,
            type: "missing_information",
            reply: intentData.reply,
            data: {
                session
            }
        };

    }

    const booking = await saveBooking({
        business_id: businessId,
        customer_name: session.customer_name,
        phone,
      service: matchedService.name,
        appointment_date: session.appointment_date,
        appointment_time: session.appointment_time
    });

    return {
        success: true,
        type: "booking_created",
        reply: "Your appointment has been booked successfully.",
        data: booking
    };

};