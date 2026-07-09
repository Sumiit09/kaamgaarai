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

    if (bookingData.customerName)
        updates.customer_name = bookingData.customerName;

    if (bookingData.service)
        updates.service = bookingData.service;

    if (bookingData.appointmentDate)
        updates.appointment_date = bookingData.appointmentDate;

    if (bookingData.appointmentTime)
        updates.appointment_time = bookingData.appointmentTime;

    await updateSession(session.id, updates);

    const latest = await getSession(businessId, phone);

    return latest;
};