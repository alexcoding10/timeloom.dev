"use client";
import LayoutWithNav from "@/components/nav/LayoutWithNav";
import React from "react";
import Balances from "./components/Balances";
import Deductions from "./components/Deductions";
import Bonus from "./components/Bonus";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/Loading";

const balances = [
  {
    label: "Pagos",
    value: 300,
    icon: {
      color: "success-400",
      icon: "",
    },
  },
  {
    label: "Horas totales",
    value: 1000,
    icon: {
      color: "info-400",
      icon: "",
    },
  },
  {
    label: "Tabajadores",
    value: 300,
    icon: {
      color: "error-400",
      icon: "",
    },
  },
];

export default function Company() {
    const { user } = useAuth();

    if(!user){
      return <Loading/>
    }

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <LayoutWithNav>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/**Balance de horas y pagos de la empresa */}
          {/** Sincronizacion del server */}
          <Balances user={user}/> {/*Hay que conectarlo con base de datos */}
          {/**Deducciones y crear deducciones */}
          <Deductions />
          {/**Bonus y crear bonus*/}
          <Bonus />
        </div>
      </LayoutWithNav>
    </AuthGuard>
  );
}
