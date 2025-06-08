import { useAuthContext } from "@/context/AuthContext";
import { useNav } from "@/hooks/useNav";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";


export default function SubNavBar() {
  const { user, logout } = useAuthContext();
  const { collapsed, openSettings, handlerOpenSettings,isMobile } = useNav();
  const router = useRouter();
  //Aqui puedes poner mas botones si lo deseas
  const subNavData = [
    {
      title: "Perfil",
      icon: <FaRegUser />,
      handler: () => {
        router.push('/profile', { scroll: false })
      },
      rol: ["supervisor", "employee", "hr"],
    }, {
      title: "Cerrar sesion",
      icon: <IoIosLogOut />,
      handler: () => {
        logout(); //cierra sesion
        handlerOpenSettings() //cierra el menu
      },
      rol: null
    },

  ]


  return (
    <AnimatePresence>
      {openSettings && (
        <motion.div
          key="settings-panel"
          initial={{ opacity: 0, left: isMobile? 0: 100, bottom : isMobile ? -100:0, }}
          animate={{
            opacity: 1,
            left: isMobile ? 0 : collapsed ? 80 : 230,
            bottom: isMobile ? 80 : 0,
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          exit={{ opacity: 0, left: isMobile? 0: 100, bottom : isMobile ? -100:0, transition: { duration: 0.2 } }}
          className={`absolute bg-white  z-50 p-2 ${isMobile ? ' border border-zinc-300 border-b-0 rounded-tr-2xl ': 'shadow-lg  shadow-blue-500/30 border border-zinc-300 w-[200px] rounded-2xl rounded-bl-none'} `}
        >
          {/* Animación del nombre y email */}
          {collapsed && (
            <motion.div
              key="user-info"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-2"
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
            <ul className="flex  flex-col  gap-2">
              {subNavData.filter((link) => {
                if (!link.rol) return true
                //mostrar solo si el permiso esta en rol del link
                return link.rol.includes(user.globalRol[0].rol.name);
              })

                .map((item, index) => (
                  <li key={index} onClick={item.handler} className="flex gap-3 items-center rounded-lg hover:bg-zinc-300 px-2 py-1 cursor-pointer">
                    {item.icon}
                    <p className="text-zinc-600">{item.title}</p>
                  </li>
                ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
