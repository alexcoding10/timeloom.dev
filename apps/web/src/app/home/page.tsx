"use client";

import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import RegisterCompany from "./RegisterCompany";
import DashBoard from "./DashBoard";

export default function Home() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (!user) {
    window.location.href = "/login";
  }

  // Si el usuario está autenticado y tiene 'companyId' igual a 1, muestra el formulario
  if (user && user.companyId === 1) {
    return <RegisterCompany user={user} />;
  }

  // Si el usuario está autenticado y no tiene 'companyId' igual a 1, muestra el saludo
  if (user) {
    return <DashBoard/>
  }
}
