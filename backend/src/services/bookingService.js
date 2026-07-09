import supabase from "../config/supabase.js";

export const saveBooking = async (bookingData) => {

    const { data, error } = await supabase
        .from("bookings")
        .insert([bookingData])
        .select();

    if (error) throw error;

    return data[0];
};