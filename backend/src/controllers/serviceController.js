import supabase from "../config/supabase.js";

export const getServices = async (req, res) => {
  try {
    const { businessId } = req.params;

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("business_id", businessId)
      .order("id");

    if (error) throw error;

    res.status(200).json({
      success: true,
      services: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const createService = async (req, res) => {
  try {
    const { businessId } = req.params;

    const {
      name,
      price,
      duration,
      description,
    } = req.body;

    const { data, error } = await supabase
      .from("services")
      .insert([
        {
          business_id: businessId,
          name,
          price,
          duration,
          description,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      service: data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      price,
      duration,
      description,
    } = req.body;

    console.log("ID:", id);
    console.log("BODY:", req.body);

    const { data, error } = await supabase
      .from("services")
      .update({
        name,
        price,
        duration,
        description,
      })
      .eq("id", Number(id))
      .select("*");

    console.log("UPDATED DATA:", data);
    console.log("SUPABASE ERROR:", error);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service: data[0],
    });

  } catch (err) {
    console.error("Update Service Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting ID:", id);

    const { data, error } = await supabase
      .from("services")
      .delete()
      .eq("id", Number(id))
      .select();

    console.log("Deleted rows:", data);
    console.log("Error:", error);

    if (error) throw error;

    res.status(200).json({
      success: true,
      deleted: data,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};