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
export const getBookings = async (req, res) => {
  try {
    const { businessId } = req.params;

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("business_id", businessId)
      .order("appointment_date", { ascending: true })
      .order("appointment_time", { ascending: true });

    if (error) throw error;

    res.status(200).json({
      success: true,
      bookings: data,
    });

  } catch (err) {
    console.error("Get Bookings Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const { data, error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", Number(id))
      .select();

    if (error) throw error;

    res.status(200).json({
      success: true,
      booking: data[0],
    });

  } catch (err) {
    console.error("Update Booking Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", Number(id));

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });

  } catch (err) {
    console.error("Delete Booking Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
