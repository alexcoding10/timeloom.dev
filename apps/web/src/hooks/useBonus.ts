import { useAuthContext } from "@/context/AuthContext";
import { Bonus } from "@/types/bonus";
import { URL_BACKEND_DEV } from "@/utils/config";
import { use, useEffect, useState } from "react";

export const useBonus = () => {
  const { user } = useAuthContext();
  const [bonus, setBonus] = useState<Bonus[]>([]); //tipamos
  const [loading, setLoading] = useState(true);

  const removeBonus = async (id: number) => {
    try {
        const response = await fetch(`${URL_BACKEND_DEV}/contract/bonus/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
    
        if (!response.ok) {
          console.error("Error al eliminar la deducción");
          return;
        }
    
        // Solo actualizamos el estado si la eliminación fue exitosa
        setBonus((prev) => prev.filter((bonu) => bonu.id !== id));
      } catch (error) {
        throw new Error('Error al eliminar en base de datos la deduccion')
      }
  };

  const addBonus = async (newBonus: Bonus) => {
    try {
      const response = await fetch(
        `${URL_BACKEND_DEV}/contract/create/bonus`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBonus),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error al crear deducción:", data);
        return;
      }
      // Si el backend responde con la deducción creada (idealmente con su ID), la usamos
      const savedDeduction = data.data || newBonus;
      // Actualizamos el estado con la nueva deducción mapeada
      setBonus((prev) => [...prev, savedDeduction]);
    } catch (error) {
      console.error("Error de red al crear deducción:", error);
    }
  };

  const fetchGetBonus = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URL_BACKEND_DEV}/contract/bonus/${user.companyId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      const responseDeductions: Bonus[] = data.data || [];
      setBonus(responseDeductions);
    } catch (err) {
      console.error("Error fetching bonus:", err);
      setBonus([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.companyId) {
      fetchGetBonus();
    }
  }, [user?.companyId]);

  return { bonus, loading, removeBonus, addBonus };
};
