import supabase from "../config/supabase.js";

// =========================
// GET ALL BUSINESSES
// =========================
export const getBusinesses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("businesses")
      .select("*");

    if (error) throw error;

    return res.status(200).json({
      success: true,
      count: data.length,
      businesses: data,
    });
  } catch (err) {
    console.error("Get Businesses Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// CREATE BUSINESS
// =========================
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

    // Check if business already exists
    const { data: existing, error: existingError } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", ownerId)
      .maybeSingle();

    if (existingError) throw existingError;

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Business already exists",
      });
    }

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
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      business: data,
    });
  } catch (err) {
    console.error("Create Business Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// GET MY BUSINESS
// =========================
export const getMyBusiness = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const { data, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("owner_id", ownerId)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    return res.status(200).json({
      success: true,
      business: data,
    });
  } catch (err) {
    console.error("Get My Business Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// UPDATE BUSINESS
// =========================
export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Updating Business ID:", id);
    console.log("Request Body:", req.body);

    const {
      name,
      industry,
      address,
      city,
      state,
      pincode,
      whatsapp,
    } = req.body;

    const { data, error } = await supabase
      .from("businesses")
      .update({
        name,
        industry,
        address,
        city,
        state,
        pincode,
        whatsapp,
      })
      .eq("id", Number(id))
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      business: data,
    });
  } catch (err) {
    console.error("Update Business Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};