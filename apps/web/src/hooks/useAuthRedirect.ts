"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { NavBarData } from "@/components/nav/NavBar";

export const useAuthRedirect = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) return;

    const userRoles = user.globalRol.map((rol: { name: string }) => rol.name);

    const allRoutes = [...NavBarData.menu, ...NavBarData.cuenta];
    const route = allRoutes.find((item) => item.url === pathname);

    if (!route) return; // Página pública
    if (route.rol === null) return;

    const hasAccess = route.rol.some((rolPermitido: string) =>
      userRoles.includes(rolPermitido)
    );

    if (!hasAccess) {
      router.push("/home");
    }
  }, [pathname, user, router]);
};
