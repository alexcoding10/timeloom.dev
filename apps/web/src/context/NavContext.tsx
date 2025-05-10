'use client';

import useGetUsersByCompany from "@/hooks/useGetUsersByCompany";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define tipos del contexto
type NavState = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

// Contexto inicial vacío solo para tipado
export const NavContext = createContext<NavState | undefined>(undefined);

// Provider
export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <NavContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </NavContext.Provider>
  );
};

