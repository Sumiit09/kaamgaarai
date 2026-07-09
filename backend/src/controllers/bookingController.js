import supabase from "../config/supabase.js";

export const createBooking = async (req, res) => {
    try {

        const {
            businessId,
            customerName,
            phone,
            service,
            appointmentDate,
            appointmentTime
        } = req.body;

        const { data, error } = await supabase
            .from("bookings")
            .insert([
                {
                    business_id: businessId,
                    customer_name: customerName,
                    phone,
                    service,
                    appointment_date: appointmentDate,
                    appointment_time: appointmentTime
                }
            ])
            .select();

        if (error) throw error;

        res.status(201).json({
            success: true,
            booking: data[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};