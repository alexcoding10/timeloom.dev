"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PanelControl from "@/components/PanelControl";
import { HeadingXL, TextBase, TextLG } from "@/components/Typography";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handlerToggleOpenRegister = () => {
    setOpenRegister(!openRegister);
  };
  const handlerToggleOpenLogin = () => {
    setOpenLogin(!openLogin);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20, // Ajuste de inclinación
        y: (e.clientY / innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      {!openRegister && !openLogin && (
        <>
          {/* Animación del texto principal */}
          <motion.div
            className="text-center flex flex-col gap-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeadingXL textColor="text-secondary-300">TimeLoom</HeadingXL>
            <TextLG textWeight="font-bold" textColor="text-white">
              Nunca ha sido tan fácil llevar el control
            </TextLG>
          </motion.div>

          {/* Animación del panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PanelControl auto={true} />
          </motion.div>

          {/* Animación de botones */}
          <motion.div className="flex flex-col gap-4">
            <motion.button
              onClick={handlerToggleOpenRegister}
              className="bg-secondary-600 text-white px-20 py-4 rounded-xl active:bg-secondary-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TextBase textWeight="font-bold">Registrarse</TextBase>
            </motion.button>
            <motion.button
              onClick={handlerToggleOpenLogin}
              className="bg-secondary-300 active:bg-secondary-400 text-white px-20 py-4 rounded-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TextBase textWeight="font-bold">Inicia sesión</TextBase>
            </motion.button>
          </motion.div>
        </>
      )}

      {/* Imagen con efecto 3D */}
      <motion.img
        src="starts.svg"
        className="absolute -top-70 -z-30 w-full h-full object-cover"
        alt="Stars"
        style={{ perspective: 1000 }}
        animate={{
          rotateX: mousePos.y,
          rotateY: mousePos.x,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 10 }}
      />

      {/* Fondo */}
      <motion.img
        src="nubes-01.png"
        className="absolute bottom-0 -z-20 h-5/6 w-full"
        alt=""
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.img
        src="backgroun-01.svg"
        className="absolute top-0 -z-40 w-full h-full object-cover"
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <div
        className={`p-10 md:p-20 bg-neutral-500 border-neutral-300 border-2 drop-shadow-lg flex justify-center items-center rounded-3xl absolute transform transition-all duration-500 ease-in-out ${
          openRegister
            ? "translate-y-20 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <RegisterForm
          registerToggle={handlerToggleOpenRegister}
          loginToggle={handlerToggleOpenLogin}
        />
      </div>

      <div
        className={`p-10 md:p-20 bg-neutral-500 border-neutral-300 border-2 drop-shadow-lg flex justify-center items-center rounded-3xl absolute transform transition-all duration-500 ease-in-out ${
          openLogin
            ? "translate-y-20 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <LoginForm
          registerToggle={handlerToggleOpenRegister}
          loginToggle={handlerToggleOpenLogin}
        />
      </div>
    </div>
  );
}
