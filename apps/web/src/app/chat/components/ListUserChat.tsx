"use client";

import Avatar from "@/components/Avatar";
import Loading from "@/components/Loading";
import { UserConnected } from "@/types/user";
import React from "react";
import { FiSearch } from "react-icons/fi";


type Props = {
  listUserConnected: React.RefObject<UserConnected[]>
  searchUser: string
  setSearchUser: React.Dispatch<React.SetStateAction<string>>
  listSearchUser: UserConnected[]
  handlerSelectedUserChat: (userId?: number) => void
};

export default function ListUserChat({
  listUserConnected,
  searchUser,
  setSearchUser,
  listSearchUser,
  handlerSelectedUserChat

}: Props) {

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
            onClick={()=>handlerSelectedUserChat(user.userId)}
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
