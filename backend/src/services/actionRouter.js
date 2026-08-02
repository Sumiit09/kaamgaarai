import * as greetingHandler from "../handlers/greetingHandler.js";
import * as bookAppointmentHandler from "../handlers/bookAppointmentHandler.js";

const handlers = {

    greeting: greetingHandler,

    book_appointment: bookAppointmentHandler

};

export const routeAction = async (intentData, context) => {

    const handler = handlers[intentData.intent];

    if (!handler) {

        return {

            success: false,

            reply: "Sorry, I don't know how to handle that request yet."

        };

    }

    return await handler.execute(intentData, context);

};