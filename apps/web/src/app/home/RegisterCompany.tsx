import React, {  useState } from "react";
import { motion, } from "framer-motion";
import { HeadingXL, TextLG } from "@/components/Typography";
import { ArrowRight } from "lucide-react";
import FormCompany from "./components/FormCompany";

interface Props {
  user: any;
}

export default function RegisterCompany({ user }: Props) {
  // Estado para controlar cuándo mostrar el formulario
  const [showForm, setShowForm] = useState(false);

  // Efecto para retrasar la aparición del formulario
  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center flex-col gap-10">
      {/* Bienvenida y Botón */}
      {!showForm && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="text-center md:text-start">
              <HeadingXL>Bienvenido, {user.name}</HeadingXL>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
          >
            <TextLG>Veo que aún no tienes una compañía</TextLG>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.6,
              ease: "easeInOut",
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            <motion.button
              whileHover={{
                scale: 1.1, // Agranda el botón
                backgroundColor: "#26A69A", // Cambia de color (ejemplo verde)
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }} // Efecto al hacer clic
              className="bg-secondary-500 w-full py-3 px-6 rounded-xl text-white font-semibold flex gap-3"
              onClick={handleClick}
            >
              <p>Crear mi Compañía</p>
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </>
      )}

      {/* Formulario de creación de compañía */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 200 }} // Empieza un poco hacia abajo con opacidad 0
          animate={{ opacity: 1, y: 0 }} // Aparece con opacidad 1 sin cambiar demasiado la posición
          transition={{
            duration: 0.6, // Ajusta la duración para suavizar la transición
            type: "spring", // Usamos 'spring' para una animación más fluida
            stiffness: 250, // Menos rigidez para una animación más suave
            damping: 20, // Menos amortiguación para hacerla más natural
          }}
          className="px-5 sm:px-10 py-20 md:px-20 min-w-[350px] max-w-[600px] overflow-hidden bg-neutral-500 border-neutral-300 border-2 drop-shadow-lg flex justify-center items-center rounded-3xl min-h-[400px] "
        >
          <FormCompany user={user} />
        </motion.div>
      )}
    </div>
  );
}
