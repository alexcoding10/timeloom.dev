"use client";

import { useAuthContext } from "@/context/AuthContext";
import { URL_BACKEND_DEV } from "@/utils/config";
import React, { useEffect, useState } from "react";
import { FaClock, FaUsers } from "react-icons/fa";
import {
  BsFillPersonFill,
  BsBuildingsFill,
  BsBellFill,
  BsTrello,
  BsChatLeftDotsFill,
} from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import { useNav } from "@/hooks/useNav";
import Loading from "../Loading";
import SubNavBar from "./SubNavBar";

export const NavBarData = {
  menu: [
    { title: "DashBoard", url: "/home", icon: <BsTrello />, rol: null },
    {
      title: "Control de Usuario",
      url: "/control-user",
      icon: <FaUsers />,
      rol: ["admin", "hr"],
    },
    {
      title: "Empresa",
      url: "/company",
      icon: <BsBuildingsFill />,
      rol: ["admin"],
    },
    {
      title: "Fichaje",
      url: "/signings",
      icon: <FaClock />,
      rol: ["supervisor", "employee", "hr"],
    },
  ],
  cuenta: [
    {
      title: "Mi perfil",
      url: "/profile",
      icon: <BsFillPersonFill />,
      rol: ["supervisor", "employee", "hr"],
    },
    {
      title: "Notificaciones",
      url: "/notification",
      icon: <BsBellFill />,
      rol: [],
    },
    {
      title: "Chat",
      url: "/chat",
      icon: <BsChatLeftDotsFill />,
      rol: null,
    },
  ],
};

export default function NavBar() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const {
    collapsed,
    setCollapsed,
    handlerOpenSettings,
    openSettings,
    isMobile,
  } = useNav();

  const handlerReload = (urlReload: string) => {
    if (urlReload === pathname) return;
    router.push(urlReload, { scroll: false });
  };

  if (loading || !user) {
    return (
      <div className="absolute w-screen h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <nav
      className={`${
        isMobile
          ? "w-full h-[80px] flex-row bottom-0 left-0 right-0 fixed border-t"
          : collapsed
            ? "w-[100px] h-screen flex-col fixed border-r"
            : "w-[250px] h-screen flex-col fixed border-r"
      } bg-white flex z-50 transition-all duration-300 ease-in-out border-zinc-100`}
    >
      {/* Desktop Header */}
      {!isMobile && (
        <div className="bg-zinc-100 rounded-3xl flex-1 m-2">
          <div className="flex items-center justify-between px-4 py-6 border-b border-zinc-200">
            <img
              className="w-10 h-10 rounded"
              src={`${URL_BACKEND_DEV + user.company.logoUrl}`}
              alt="logo"
            />
            {!collapsed && (
              <div className="ml-2">
                <h3 className="font-medium text-sm">{user.company.name}</h3>
                <a
                  href={`mailto:${user.company.email}`}
                  className="text-blue-500 text-xs"
                >
                  {user.company.email}
                </a>
              </div>
            )}
            <button
              className={`p-2 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
              onClick={() => setCollapsed(!collapsed)}
            >
              <IoIosArrowBack />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="flex flex-col px-4 py-6 gap-3">
            {!collapsed && (
              <h1 className="font-medium text-neutral-dark-400 text-sm">
                Menu
              </h1>
            )}
            <div className="flex flex-col p-2 gap-2">
              {NavBarData.menu
                .filter((link) => {
                  if (!link.rol) return true;
                  return link.rol.includes(user.globalRol[0].rol.name);
                })
                .map((link, index) => (
                  <div
                    key={index}
                    onClick={() => handlerReload(link.url)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      pathname === link.url
                        ? "bg-blue-500 text-white shadow-lg"
                        : "hover:bg-zinc-200"
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    {!collapsed && (
                      <p className="whitespace-nowrap">{link.title}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Desktop Cuenta */}
          <div className="flex flex-col px-4 py-6 gap-3">
            {!collapsed && (
              <h1 className="font-medium text-neutral-dark-400 text-sm">
                Cuenta
              </h1>
            )}
            <div className="flex flex-col p-2 gap-2">
              {NavBarData.cuenta
                .filter((link) => {
                  if (!link.rol) return true;
                  return link.rol.includes(user.globalRol[0].rol.name);
                })
                .map((link, index) => (
                  <div
                    key={index}
                    onClick={() => handlerReload(link.url)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      pathname === link.url
                        ? "bg-blue-500 text-white shadow-lg"
                        : "hover:bg-zinc-200"
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    {!collapsed && <p>{link.title}</p>}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile layout */}
      {isMobile && (
        <div className="flex flex-1 items-center justify-around px-2">

           <button
            onClick={() => {
              handlerOpenSettings();

            }}
            
          >
            {user.imgProfile ? (
              <img
                className="w-10 h-10 rounded-lg"
                src={`${URL_BACKEND_DEV + user.imgProfile}`}
                alt="user"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-neutral-dark-400 flex items-center justify-center">
                <p className="text-white font-bold text-lg">
                  {user.name.substring(0, 2).toUpperCase()}
                </p>
              </div>
            )}
          </button>

          {[...NavBarData.menu, ...NavBarData.cuenta]
            .filter((link) => {
              if (!link.rol) return true;
              return link.rol.includes(user.globalRol[0].rol.name);
            })
            .map((link, index) => (
              <div
                key={index}
                onClick={() => handlerReload(link.url)}
                className={`flex flex-col items-center justify-center text-sm cursor-pointer transition-all duration-300 ${
                  pathname === link.url
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
              </div>
            ))}
         
        </div>
      )}

      {/* Footer / User Info */}
      {!isMobile && (
        <div className="flex items-center justify-center py-4 border-t border-zinc-200">
          <div
            onClick={() => {
              if (collapsed) {
                handlerOpenSettings();
              }
            }}
            className="flex items-center gap-3"
          >
            {user.imgProfile ? (
              <img
                className="w-10 h-10 rounded-lg"
                src={`${URL_BACKEND_DEV + user.imgProfile}`}
                alt="user"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-neutral-dark-400 flex items-center justify-center">
                <p className="text-white font-bold text-lg">
                  {user.name.substring(0, 2).toUpperCase()}
                </p>
              </div>
            )}
            {!collapsed && (
              <div className="grid grid-cols-[1fr_0.4fr] ">
                <div>
                  <h3 className="font-medium text-sm">{user.name}</h3>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-blue-500 text-xs"
                  >
                    {user.email}
                  </a>
                </div>
                <button
                  onClick={handlerOpenSettings}
                  className=" h-full flex justify-center items-center"
                >
                  {!openSettings ? <IoIosArrowForward /> : <IoIosArrowBack />}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <SubNavBar />
    </nav>
  );
}
