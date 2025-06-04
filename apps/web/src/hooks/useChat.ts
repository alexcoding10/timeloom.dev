
'use client'

import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import useGetUsersByCompany from "./useGetUsersByCompany";
import { UserConnected } from "@/types/user";


export const useChat = () => {
    const { usersConnected, user } = useAuthContext();
    const { usersByCompany } = useGetUsersByCompany(user.companyId || 0);
    const listUserConnected = useRef<UserConnected[]>([]);
    const [listSearchUser, setListSearchUser] = useState<UserConnected[]>([]);
    const [searchUser, setSearchUser] = useState<string>("");
    const [userCurrentChat, setUserCurrentChat] = useState<UserConnected | null>(null)

    const handlerSelectedUserChat = (userId?: number) => {
        //seleciona un usuario por id o  puede hacer que se deselecione si no pasas la prop
        if (userId) {
            const user = listUserConnected.current.find(user => user.userId === userId)
            if (user) {
                setUserCurrentChat(user)
            } else {
                setUserCurrentChat(null)
            }
        } else {
            setUserCurrentChat(null)
        }
    }

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

        setUserCurrentChat(prev => {
            if (!prev) return null;
            const updated = listUserConnected.current.find(user => user.userId === prev.userId);
            return updated ?? null;
        });
        
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


    return {
        userCurrentChat,
        listSearchUser,
        searchUser,
        setSearchUser,
        handlerSelectedUserChat,
        listUserConnected,
        user
    }

}