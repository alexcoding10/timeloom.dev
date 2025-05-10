'use client'

import { useAuth } from "@/hooks/useAuth";
import useGetUsersByCompany from "@/hooks/useGetUsersByCompany";
import React, { createContext, useState, useEffect, ReactNode } from "react";


// Define los tipos para el estado de autenticación
interface AuthState {
  user: any;  // Ajusta el tipo de `user` según lo que devuelva `useAuth()`
  loading: boolean;
  fetchUser: () => Promise<void>
}

// Crea el contexto de autenticación
const AuthContext = createContext<AuthState | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;  // Define los `children` que son de tipo ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, loading,fetchUser } = useAuth(); // Supongo que useAuth retorna un `user` y `loading`
  const [authState, setAuthState] = useState<AuthState>({ user, loading, fetchUser});
  //const {} = useGetUsersByCompany(user.companyId)



  useEffect(() => {
    // Cada vez que los datos de user o loading cambien
    setAuthState({ user, loading ,fetchUser});

  }, [user, loading]);


  return (
    <AuthContext.Provider value={authState}> 
      {children}
    </AuthContext.Provider>
  );
};

// Crea un hook para acceder al contexto de autenticación
export const useAuthContext = (): AuthState => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
