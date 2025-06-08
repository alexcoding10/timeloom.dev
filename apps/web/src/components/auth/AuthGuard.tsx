'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading';

type AuthGuardProps = {
  children: React.ReactNode;
  allowedRoles?: string[]; // roles opcionales permitidos
};

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const userRoles = Array.isArray(user.globalRol)
      ? user.globalRol.map((r: any) => r.rol?.name)
      : [];

    //console.log("✅ userRoles:", userRoles);
    //console.log("🚨 allowedRoles:", allowedRoles);

    if (allowedRoles && allowedRoles.length > 0) {
      const hasAccess = allowedRoles.some((rol) => userRoles.includes(rol));
      if (!hasAccess) {
        router.push('/home');
        return;
      }
    }

    setChecking(false);
  }, [user, loading, allowedRoles, router, pathname]);

  if (loading || checking) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Loading/>

      </div>
    )
  }

  return <>{children}</>;
}
