'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define tipos del contexto
type NavState = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  openSettings:boolean;
  handlerOpenSettings:()=>void
  isMobile:boolean

};

// Contexto inicial vacío solo para tipado
export const NavContext = createContext<NavState | undefined>(undefined);

// Provider
export const NavProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const[openSettings,setOpenSettings] =useState(false)
    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 420);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

const handlerOpenSettings=()=>{
  setOpenSettings(!openSettings)
}

  return (
    <NavContext.Provider value={{ collapsed, setCollapsed,openSettings,handlerOpenSettings , isMobile}}>
      {children}
    </NavContext.Provider>
  );
};

