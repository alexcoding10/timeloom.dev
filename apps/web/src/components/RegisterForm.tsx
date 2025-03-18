import { useState } from "react";
import { motion } from "framer-motion";
import { HeadingXL, TextBase } from "./Typography";

interface Props{
    registerToggle:() => void
    loginToggle:()=>void
}

export default function RegisterForm(props:Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  return (
    <motion.div
      className=" flex flex-col gap-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
        <div className="text-center mb-10">

            <HeadingXL>Registrarse</HeadingXL>    
        </div>
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Nombre */}
        <div>
          <label className="text-gray-600 font-medium">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="text-gray-600 font-medium">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="text-gray-600 font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <label className="text-gray-600 font-medium">Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Botón de Registro */}
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold mt-2 hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Registrarse
        </motion.button>
      </form>

      {/* Link para iniciar sesión */}
  
  
      <p className="text-gray-500 text-center mt-2">
        ¿Ya tienes una cuenta?{" "}
        <a onClick={()=>{

            props.registerToggle()
            props.loginToggle()

        }
        } className="text-blue-600 hover:underline">
          Iniciar sesión
        </a>
      </p>

    </motion.div>
  );
}
