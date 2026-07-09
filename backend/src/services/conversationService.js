import supabase from "../config/supabase.js";

export const getSession = async (businessId, phone) => {

    const { data, error } = await supabase
        .from("conversation_sessions")
        .select("*")
        .eq("business_id", businessId)
        .eq("phone", phone)
        .maybeSingle();

    if (error) throw error;

    return data;
};

export const createSession = async (businessId, phone) => {

    const { data, error } = await supabase
        .from("conversation_sessions")
        .insert([
            {
                business_id: businessId,
                phone: phone
            }
        ])
        .select()
        .single();

    if (error) throw error;

    return data;
};

export const updateSession = async (id, updates) => {

    const { data, error } = await supabase
        .from("conversation_sessions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
};