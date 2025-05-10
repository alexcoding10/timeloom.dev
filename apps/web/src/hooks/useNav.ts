import { NavContext } from "@/context/NavContext";
import { useContext } from "react";

// Hook para usar fácilmente el contexto
export const useNav = () => {
    const context = useContext(NavContext);
    if (!context) {
      throw new Error("useNav debe usarse dentro de un NavProvider");
    }
    return context;
  };
  