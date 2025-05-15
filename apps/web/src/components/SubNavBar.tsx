import { useAuthContext } from "@/context/AuthContext";
import { useNav } from "@/hooks/useNav";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IoIosLogOut } from "react-icons/io";

export default function SubNavBar() {
  const { user, logout } = useAuthContext();
  const { collapsed, openSettings } = useNav();

  return (
    <AnimatePresence>
      {openSettings && (
        <motion.div
          key="settings-panel"
          initial={{ opacity: 0, left: 100 }}
          animate={{
            opacity: 1,
            left: collapsed ? 80 : 210,
            bottom: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          exit={{ opacity: 0, left: 100, transition: { duration: 0.2 } }}
          className="absolute bg-white border border-zinc-300 w-[200px] h-[200px] rounded-2xl rounded-bl-none z-50 p-2 shadow-lg shadow-blue-500/30"
        >
          {/* Animación del nombre y email */}
          {collapsed && (
            <motion.div
              key="user-info"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="px-2"
            >
              <h3 className="font-medium text-sm">{user.name}</h3>
              <a
                href={`mailto:${user.email}`}
                className="text-blue-500 text-xs"
              >
                {user.email}
              </a>
            </motion.div>
          )}

          {/* Fondo animado si deseas cambiarlo dinámicamente */}
          <motion.div
            layout
            className="w-full h-full bg-zinc-100 rounded-2xl transition-all ease-in-out duration-200 p-4"
          >
            {/*Botones como cerrar sesion */}
            <ul>
              <li onClick={logout} className="flex gap-3 items-center rounded-lg hover:bg-zinc-300 px-2 py-1 cursor-pointer">
                <IoIosLogOut />
                <p className="text-zinc-600">Cerrar sesion</p>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
