import { useAuthContext } from "@/context/AuthContext";
import { Deduction } from "@/types/deductions";
import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useState } from "react";



// Función para mapear el tipo de deducción
const mapType = (type: string) => {
  switch (type) {
    case "ALL":
      return "Todos";
    case "FIXED":
      return "Fijos";
    case "TEMPORARY":
      return "Temporeros";
    default:
      return "Desconocido"; // Esto no debería ser necesario, ya que ahora el tipo es controlado
  }
};

export const useGetDeductions = () => {
  const { user } = useAuthContext();
  const [deductions, setDeductions] = useState<Deduction[]>([]); // Tipamos el estado
  const [loading, setLoading] = useState(true);

  const removeDeduction = async (id: number) => {
    try {
      const response = await fetch(`${URL_BACKEND_DEV}/company/deduction/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (!response.ok) {
        console.error("Error al eliminar la deducción");
        return;
      }
  
      // Solo actualizamos el estado si la eliminación fue exitosa
      setDeductions((prev) => prev.filter((dct) => dct.id !== id));
    } catch (error) {
      throw new Error('Error al eliminar en base de datos la deduccion')
    }
  };
  

  const addDeduction = async (newDeduction: Deduction) => {
    try {
      const response = await fetch(
        `${URL_BACKEND_DEV}/company/create/deduction`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDeduction),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error al crear deducción:", data);
        return;
      }

      // Si el backend responde con la deducción creada (idealmente con su ID), la usamos
      const savedDeduction = data || newDeduction;

      // Mapear el tipo de la deducción agregada, asegurando que sea uno de los valores correctos
      const mappedDeduction = {
        ...savedDeduction,
        type: mapType(savedDeduction.type), // Aplicamos mapType directamente
      };

      // Actualizamos el estado con la nueva deducción mapeada
      setDeductions((prev) => [...prev, mappedDeduction]);
    } catch (error) {
      console.error("Error de red al crear deducción:", error);
    }
  };

  const fetchDeduction = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URL_BACKEND_DEV}/company/${user.companyId}/deductions`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      const responseDeductions: Deduction[] = data || [];

      // Mapeamos las deducciones y aplicamos mapType
      const mappedDeductions = responseDeductions.map((item) => ({
        ...item,
        type: mapType(item.type), // Usamos mapType directamente
      }));

      setDeductions(mappedDeductions);
    } catch (err) {
      console.error("Error fetching deductions:", err);
      setDeductions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.companyId) {
      fetchDeduction();
    }
  }, [user?.companyId]);

  return { deductions, loading, addDeduction,removeDeduction };
};
