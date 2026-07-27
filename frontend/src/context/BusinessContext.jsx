import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BusinessContext = createContext();

export function BusinessProvider({ children }) {
  const { user } = useAuth();

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBusiness = async () => {
  if (!user) {
    setBusiness(null);
    setLoading(false);
    return;
  }

  console.log("User object:", user);
  console.log("User ID:", user?.id);

  const url = `http://localhost:3000/api/businesses/me/${user.id}`;
  console.log("Request URL:", url);

  try {
    const res = await axios.get(url);

    console.log("Response:", res.data);

    setBusiness(res.data.business);

  } catch (err) {
    console.error("Failed to fetch business", err);
    console.log("Error Response:", err.response?.data);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBusiness();
  }, [user]);

  return (
    <BusinessContext.Provider
      value={{
  business,
  setBusiness,
  loading,
  fetchBusiness,
}}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export const useBusiness = () => useContext(BusinessContext);