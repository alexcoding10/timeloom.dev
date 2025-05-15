'use client';

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define tipos del contexto
type NavState = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  openSettings:boolean;
  handlerOpenSettings:()=>void

};

// Contexto inicial vacío solo para tipado
export const NavContext = createContext<NavState | undefined>(undefined);

// Provider
export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const[openSettings,setOpenSettings] =useState(false)

const handlerOpenSettings=()=>{
  setOpenSettings(!openSettings)
}

  return (
    <NavContext.Provider value={{ collapsed, setCollapsed,openSettings,handlerOpenSettings }}>
      {children}
    </NavContext.Provider>
  );
};

