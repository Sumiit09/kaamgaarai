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
export const createBusiness = async (req, res) => {
  try {
    const {
      ownerId,
      ownerName,
      businessName,
      category,
      address,
      city,
      state,
      pincode,
      whatsapp,
    } = req.body;

    const { data, error } = await supabase
      .from("businesses")
      .insert([
        {
          owner_id: ownerId,
          owner_name: ownerName,
          name: businessName,
          industry: category,
          address,
          city,
          state,
          pincode,
          whatsapp,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      business: data[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const getMyBusiness = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("owner_id", ownerId)
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      business: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};