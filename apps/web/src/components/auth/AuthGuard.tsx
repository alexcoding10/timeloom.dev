'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthGuard({ children }: React.PropsWithChildren) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  // Usamos useEffect para realizar la redirección después del renderizado
  useEffect(() => {
    if (loading == false && !user) {
      // Si no hay usuario y no está cargando, redirige al login
      router.push("/login");
    }
  }, [user, loading, router]);  // Dependencias para que se ejecute cuando cambien `user` o `loading`

  if (loading) {
    return <p>Loading...</p>; // Opcional: Muestra un mensaje de carga mientras se determina el estado
  }

  // Si no hay usuario, no se renderiza nada
  if (!user) {
    return null;
  }

  // Si hay usuario, renderiza el contenido
  return <>{children}</>;
}
