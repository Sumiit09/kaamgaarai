import supabase from "../config/supabase.js";

export const getBusinesses = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("businesses")
            .select("*");

        if (error) throw error;

        res.status(200).json({
            success: true,
            count: data.length,
            businesses: data
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};