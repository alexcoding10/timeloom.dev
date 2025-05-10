import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL_BACKEND_DEV}/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.data);
      } else {
        setUser(null);
        setError(data.message);
      }
    } catch (err) {
      setUser(null);
      setError("Error en la autenticación");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, fetchUser };
};
