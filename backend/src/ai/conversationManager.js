import {
    getSession,
    createSession,
    updateSession
} from "../services/conversationService.js";

export const manageConversation = async (
    businessId,
    phone,
    bookingData
) => {

    let session = await getSession(businessId, phone);

    if (!session) {
        session = await createSession(businessId, phone);
    }

    const updates = {};

    const entities = bookingData.entities || {};

if (entities.customerName)
    updates.customer_name = entities.customerName;

if (entities.service)
    updates.service = entities.service;

if (entities.appointmentDate)
    updates.appointment_date = entities.appointmentDate;

if (entities.appointmentTime)
    updates.appointment_time = entities.appointmentTime;

    await updateSession(session.id, updates);

    const latest = await getSession(businessId, phone);

    return latest;
};