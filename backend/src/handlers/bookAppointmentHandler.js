import { manageConversation } from "../ai/conversationManager.js";
import { isSlotAvailable } from "../services/availabilityService.js";
import { saveBooking } from "../services/bookingService.js";
import { matchService } from "../services/serviceMatcher.js";
import { updateCustomerName } from "../services/customerService.js";

export const execute = async (intentData, context) => {

    console.log("BOOK APPOINTMENT HANDLER EXECUTED");
    console.log("STEP 6 - BOOK HANDLER");
    const {
        businessId,
        phone,
        services
    } = context;

    const session = await manageConversation(
        businessId,
        phone,
        intentData
    );
    console.log("========== SESSION ==========");
console.log(session);

console.log("========== INTENT ==========");
console.log(JSON.stringify(intentData, null, 2));

    console.log("SESSION:");
    console.log(session);

    if (intentData.entities?.customerName) {
        await updateCustomerName(
            businessId,
            phone,
            intentData.entities.customerName
        );
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

    const matchedService = matchService(
        session.service,
        services
    );

    if (!matchedService) {
        return {
            success: false,
            type: "invalid_service",
            reply: "Sorry, we don't offer that service. Please choose one of our available services.",
            data: {}
        };
    }

    const available = await isSlotAvailable(
        businessId,
        session.appointment_date,
        session.appointment_time
    );

    if (!available) {
        return {
            success: false,
            type: "slot_unavailable",
            reply: `Sorry, ${session.appointment_time} is already booked. Please choose another time.`,
            data: {}
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