import supabase from "../config/supabase.js";

/**
 * Get customer by business + phone
 */
export const getCustomer = async (businessId, phone) => {

    const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("business_id", businessId)
        .eq("phone", phone)
        .maybeSingle();

    if (error) throw error;

    return data;
};

/**
 * Create new customer
 */
export const createCustomer = async ({
    businessId,
    phone,
    name
}) => {

    const { data, error } = await supabase
        .from("customers")
        .insert([
            {
                business_id: businessId,
                phone,
                name
            }
        ])
        .select()
        .single();

    if (error) throw error;

    return data;
};

/**
 * Update customer
 */
export const updateCustomer = async (
    customerId,
    updates
) => {

    const { data, error } = await supabase
        .from("customers")
        .update(updates)
        .eq("id", customerId)
        .select()
        .single();

    if (error) throw error;

    return data;
};

/**
 * Customer booking history
 */
export const getCustomerHistory = async (
    businessId,
    phone
) => {

    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("business_id", businessId)
        .eq("phone", phone)
        .order("appointment_date", {
            ascending: false
        });

    if (error) throw error;

    return data;
};

/**
 * Save customer name
 */
export const updateCustomerName = async (
    businessId,
    phone,
    name
) => {

    const { data, error } = await supabase
        .from("customers")
        .update({
            name
        })
        .eq("business_id", businessId)
        .eq("phone", phone)
        .select()
        .single();

    if (error) throw error;

    return data;

};