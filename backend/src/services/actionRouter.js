import * as greetingHandler from "../handlers/greetingHandler.js";
import * as bookAppointmentHandler from "../handlers/bookAppointmentHandler.js";

const handlers = {

    greeting: greetingHandler,

    book_appointment: bookAppointmentHandler

};

export const routeAction = async (intentData, context) => {
    console.log("STEP 5 - ACTION ROUTER");
console.log(intentData.intent);
console.log("ROUTER RECEIVED:", intentData.intent);
console.log("AVAILABLE HANDLERS:", Object.keys(handlers));

    const handler = handlers[intentData.intent];
console.log("SELECTED HANDLER:", handler);
    if (!handler) {

        return {

            success: false,

            reply: "Sorry, I don't know how to handle that request yet."

        };

    }

    return await handler.execute(intentData, context);

};