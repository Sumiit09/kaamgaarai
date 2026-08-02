import supabase from "../config/supabase.js";

export const getBusiness = async (businessId) => {

    const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", businessId)
        .single();

    if (error) {
        throw error;
    }

    return data;
};

export const getServices = async (businessId) => {

    const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("business_id", businessId);

    if (error) {
        throw error;
    }

    return data;
};