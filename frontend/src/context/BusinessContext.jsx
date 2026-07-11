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

    try {
     const res = await axios.get(
  `http://localhost:3000/api/businesses/me/${user.id}`
);

setBusiness(res.data.business);
console.log("Business:", res.data.business);
    } catch (err) {
      console.error("Failed to fetch business", err);
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
        loading,
        fetchBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export const useBusiness = () => useContext(BusinessContext);