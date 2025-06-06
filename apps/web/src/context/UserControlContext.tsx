'use client'

import useGetUsersByCompany from "@/hooks/useGetUsersByCompany";
import { UserControl } from "@/types/user";
import React, { createContext, ReactNode, useState } from "react";

//creo el contexto
interface UserControlState {
  usersByCompany: UserControl[];
  loadingUserFetch: boolean;
  addUsersByCompany: (user: UserControl) => void;
  openCreateUser: boolean;
  handlerCloseCreateUserView: () => void;
  setOpenCreateUser: (open: boolean) => void;
  handlerSelectUser: (id: number) => void;
  handlerDeselectUser: () => void;
  currentUserSelect: UserControl | undefined
  updateUsersCompanyById: (id: number, data: any) => void
}
const UserControlContext = createContext<UserControlState | undefined>(undefined);


interface UserControlProviderProps {
  children: ReactNode;
}

export const UserControlProvider: React.FC<UserControlProviderProps> = ({ children }) => {
  const { usersByCompany, loadingUserFetch, addUsersByCompany, updateUsersCompanyById } = useGetUsersByCompany();
  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [currentUserSelect, setCurrentUserSelect] = useState<UserControl | undefined>(undefined)


  const handlerSelectUser = (id: number) => {
    setCurrentUserSelect(usersByCompany.find(user => user.id === id))
  }
  const handlerDeselectUser = () => {
    setCurrentUserSelect(undefined)
  }


  const handlerCloseCreateUserView = () => {
    setOpenCreateUser(false);
  };

  return (
    <UserControlContext.Provider value={{ usersByCompany, loadingUserFetch, addUsersByCompany, openCreateUser, handlerCloseCreateUserView, setOpenCreateUser, handlerSelectUser, handlerDeselectUser, currentUserSelect, updateUsersCompanyById }}>
      {children}
    </UserControlContext.Provider>
  );""
};

export const useUserControlContext = (): UserControlState => {
  const context = React.useContext(UserControlContext);
  if (!context) {
    throw new Error("useUserControlContext must be used within an AuthProvider");
  }
  return context;
};