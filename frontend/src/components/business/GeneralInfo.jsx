import { useEffect, useState } from "react";
import { useBusiness } from "../../context/BusinessContext";

import { Card, CardContent } from "../ui/Card";
import Input, { Select } from "../ui/Input";
import Button from "../ui/Button";
import axios from "axios";

const GeneralInfo = () => {
  const { business, setBusiness } = useBusiness();

  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    whatsapp: "",
  });

  useEffect(() => {
    if (!business) return;

    setFormData({
      name: business.name || "",
      industry: business.industry || "",
      address: business.address || "",
      city: business.city || "",
      state: business.state || "",
      pincode: business.pincode || "",
      whatsapp: business.whatsapp || "",
    });
  }, [business]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
const handleSave = async () => {
  console.log("Business Object:", business);
  console.log("Business ID:", business?.id);
  console.log("Form Data:", formData);

  try {
    const res = await axios.patch(
      `http://localhost:3000/api/businesses/${business.id}`,
      formData
    );

    setBusiness(res.data.business);

console.log("Updated:", res.data);

alert("Business updated successfully!");
  } catch (err) {
    console.error("PATCH Error:", err);
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);

    alert("Failed to update business");
  }
};
  if (!business) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-10 text-text-secondary">
            Loading Business...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-6">

        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            General Information
          </h2>

          <p className="text-sm text-text-secondary mt-1">
            Update your business information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Input
            label="Business Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Input
            label="WhatsApp Number"
            value={formData.whatsapp}
            onChange={(e) => handleChange("whatsapp", e.target.value)}
          />

          <Select
            label="Category"
            value={formData.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
          >
            <option value="Salon">Salon</option>
            <option value="Gym">Gym</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Clinic">Clinic</option>
            <option value="Gaming Cafe">Gaming Cafe</option>
            <option value="Coaching">Coaching</option>
          </Select>

          <Input
            label="City"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <Input
            label="State"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />

          <Input
            label="Pincode"
            value={formData.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
          />

          <div className="md:col-span-2">
            <Input
              label="Business Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

        </div>
                <div className="flex justify-end pt-2">
          <Button onClick={handleSave}>
  Save Changes
</Button>
        </div>

      </CardContent>
    </Card>
  );
};

export default GeneralInfo;