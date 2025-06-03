'use client'

import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


export const useAuth = () => {
  const socketRef = useRef<Socket | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usersConnected, setUsersConnected] = useState<any>(null) // en principio

  const logout = () => {
    //elimina el token y el usuario
    //el token se elimina desde el back
    fetch(`${URL_BACKEND_DEV}/auth/logout`, {
      method: 'GET',
      credentials: "include"
    })
    // Desconecta el socket si está activo
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    // Borra el usuario
    setUser(null);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL_BACKEND_DEV}/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.data);
      } else {
        setUser(null);
        setError(data.message);
      }
    } catch (err) {
      setUser(null);
      setError("Error en la autenticación");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const socket: Socket = io(URL_BACKEND_DEV, {
      transports: ['websocket'],
      withCredentials: true
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 Conectado con socket.io:", socket.id);
      socket.emit("register", {
        userId: user.id,
        companyId: user.companyId
      });
    });

    socket.on("user_connected", (data) => {
      console.log("👥 Usuarios conectados:", data.users);
      setUsersConnected(data.users);
    });

    socket.on("message", (payload) => {
      console.log("📨 Mensaje público:", payload);
    });

    socket.on("private_message", (payload) => {
      console.log("📩 Mensaje privado:", payload);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Socket desconectado");
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);


  return { user, setUser, loading, error, fetchUser, logout,usersConnected };
};
