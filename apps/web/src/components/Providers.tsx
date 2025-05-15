"use client";

import { AuthProvider } from "@/context/AuthContext";
import { NavProvider } from "@/context/NavContext";
import React from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <NavProvider>{children}</NavProvider>
    </AuthProvider>
  );
}
