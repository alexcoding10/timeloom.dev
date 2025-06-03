"use client";

import Avatar from "@/components/Avatar";
import Loading from "@/components/Loading";
import { useAuthContext } from "@/context/AuthContext";
import useGetUsersByCompany from "@/hooks/useGetUsersByCompany";
import React, { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

type UserConnected = {
  userId: number;
  connected: boolean;
  name: string;
  img: string | null;
};

export default function ListUserChat() {
  const { usersConnected, user } = useAuthContext();
  const { usersByCompany } = useGetUsersByCompany(user.companyId | 0);
  const listUserConnected = useRef<UserConnected[]>([]);
  const [listSearchUser, setListSearchUser] = useState<UserConnected[]>([]);

  const [searchUser, setSearchUser] = useState<string>("");

  useEffect(() => {
    if (!usersConnected || !usersByCompany) return;
    // mapear los usuarios en listUser

    const users: UserConnected[] = usersByCompany.map((user) => ({
      userId: user.id,
      name: user.name,
      img: user.imgProfile ?? null,
      connected: usersConnected.some(
        (conn: { userId: number }) => conn.userId === user.id
      ),
    }));

    listUserConnected.current = users;
    setListSearchUser(users)
  }, [usersByCompany]);

  useEffect(() => {
  if (!usersConnected) return;

  // Actualiza solo el campo "connected" en la lista actual
  setListSearchUser((prev) =>
    prev.map((user) => ({
      ...user,
      connected: usersConnected.some((conn: { userId: number; }) => conn.userId === user.userId),
    }))
  );

  // Actualiza también la ref base si quieres que siga sincronizada
  listUserConnected.current = listUserConnected.current.map((user) => ({
    ...user,
    connected: usersConnected.some((conn: { userId: number; }) => conn.userId === user.userId),
  }));
}, [usersConnected]);

  useEffect(() => {
    if (searchUser === "") {
      setListSearchUser(listUserConnected.current);
    } else {
      setListSearchUser(
        listUserConnected.current.filter((user) =>
          user.name.toLowerCase().includes(searchUser.toLowerCase())
        )
      );
    }
  }, [searchUser]);

  if (!listUserConnected.current || listUserConnected.current.length === 0) {
    return <Loading />;
  }

  return (
    <div className="w-[60%] flex  flex-col gap-3">
      <h1 className="font-montserrat md:text-xl xl:text-2xl font-semibold">
        Chats
      </h1>
      <div className="flex items-center w-full max-w-md mx-auto shadow-sm rounded-lg overflow-hidden border border-zinc-300 focus-within:ring-2 focus-within:ring-blue-500">
        <div className="px-3 text-zinc-500">
          <FiSearch />
        </div>

        <input
          type="text"
          className="w-full py-2 px-3 text-zinc-800 placeholder-zinc-400 text-base bg-white focus:outline-none"
          placeholder="Busca tu chat..."
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>

      {listSearchUser.length === 0 ? (
        <div className="flex items-center justify-center gap-3 p-4 border-b border-zinc-200 rounded-lg hover:bg-zinc-100 hover:cursor-pointer transition-all duration-200 ease-in">
          <p className="text-zinc-500">Usuario no encontrado</p>
        </div>
      ) : (
        listSearchUser.map((user) => (
          <div
            key={user.userId}
            className="flex items-center gap-3 p-4 border-b border-zinc-200 rounded-lg hover:bg-zinc-100 hover:cursor-pointer transition-all duration-200 ease-in"
          >
            <Avatar
              url={user.img}
              name={user.name}
              connected={user.connected} // corregido: era "conected"
            />
            <p className="font-semibold">{user.name}</p>
          </div>
        ))
      )}
    </div>
  );
}
