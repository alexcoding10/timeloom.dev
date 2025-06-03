"use client";

import React from "react";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useNav } from "@/hooks/useNav";

export default function LayoutWithNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { collapsed} = useNav();

  return (
    <div className="flex h-screen">
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname} // fuerza la animación al cambiar de ruta
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className={`flex-1 py-4 px-4 lg:py-5 lg:px-20 ${collapsed? 'ml-[100px]' : 'min-[770px]:ml-[250px]'} transition-all duration-200 ease-in`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
