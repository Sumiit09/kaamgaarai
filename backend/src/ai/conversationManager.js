import {
    getSession,
    createSession,
    updateSession
} from "../services/conversationService.js";

export const manageConversation = async (
    businessId,
    phone,
    intentData
) => {

    let session = await getSession(businessId, phone);

    if (!session) {
        session = await createSession(businessId, phone);
    }

    const entities = intentData.entities || {};

    const updates = {};

    if (entities.customerName) {
        updates.customer_name = entities.customerName;
    }

    if (entities.service) {
        updates.service = entities.service;
    }

    if (entities.appointmentDate) {
        updates.appointment_date = entities.appointmentDate;
    }

    if (entities.appointmentTime) {
        updates.appointment_time = entities.appointmentTime;
    }

    if (Object.keys(updates).length > 0) {
        await updateSession(session.id, updates);
    }

    return await getSession(businessId, phone);

};