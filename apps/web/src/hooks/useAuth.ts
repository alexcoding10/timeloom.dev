"use client";

import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const socketRef = useRef<Socket | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usersConnected, setUsersConnected] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);  // plural messages
  const router = useRouter();

  const logout = () => {
    fetch(`${URL_BACKEND_DEV}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    router.push("/");
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
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 Conectado con socket.io:", socket.id);
      socket.emit("register", {
        userId: user.id,
        companyId: user.companyId,
      });
    });

    socket.on("user_connected", (data) => {
      console.log("👥 Usuarios conectados:", data.users);
      setUsersConnected(data.users);
    });

    socket.on('private_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
      socket.off('private_message');
      socket.off('chat_history');
      socket.off('user_connected');
      socket.off('connect');
    };
  }, [user]);

  const sendMessage = (toUserId: number, message: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('private_message', { toUserId, message });
  };

  return { user, setUser, loading, error, fetchUser, logout, usersConnected, messages, sendMessage ,socketRef};
};
