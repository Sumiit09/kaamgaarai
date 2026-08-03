import supabase from "../config/supabase.js";

/**
 * Get all bookings for a business on a specific date
 */
export const getBookingsForDate = async (
    businessId,
    appointmentDate
) => {

    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("business_id", businessId)
        .eq("appointment_date", appointmentDate)
        .order("appointment_time", {
            ascending: true
        });

    if (error) throw error;

    return data;

};

/**
 * Check whether a slot is available
 */
export const isSlotAvailable = async (
    businessId,
    appointmentDate,
    appointmentTime
) => {

    const bookings = await getBookingsForDate(
        businessId,
        appointmentDate
    );

    const existingBooking = bookings.find(
        booking => booking.appointment_time === appointmentTime
    );

    return !existingBooking;

};