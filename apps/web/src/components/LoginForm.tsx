import {useState } from "react";
import { motion } from "framer-motion";
import { HeadingXL } from "./Typography";
import { URL_BACKEND_DEV } from "@/utils/config";
import {  useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

interface Props {
  registerToggle: () => void;
  loginToggle: () => void;
}

export default function LoginForm(props: Props) {
  const router = useRouter();
  const { fetchUser } = useAuthContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    value: false,
    text: "",
  });
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlerDafaultLoginFom = () => {
    setFormData({
      email: "",
      password: "",
    });
    setError({
      value: false,
      text: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({ value: false, text: "" });
  
    try {
      const response = await fetch(`${URL_BACKEND_DEV}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
  
      console.log("Respuesta del servidor:", response);
  
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
  
      const data = await response.json();
      console.log("Datos del servidor:", data);
  
      if (!data.success) {
        setError({ value: true, text: data.message });
      } else {
        setError({ value: false, text: "" });
  
        // 🔥 Llamar a fetchUser para actualizar el estado global
        await fetchUser();
  
        // 🔄 Redirigir después de actualizar el usuario
        router.push("/home");
      }
    } catch (error: any) {
      console.error("Error en la solicitud:", error);
      setError({ value: true, text: error.message });
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <HeadingXL>Iniciar Sesión</HeadingXL>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Correo Electrónico */}
        <div>
          <label className="text-gray-600 font-medium">
            Correo Electrónico
          </label>
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

        {error.value && <p className="text-red-400 py-2">{error.text}</p>}

        {/* Botón de Inicio de Sesión */}
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold mt-2 hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </motion.button>
      </form>

      {/* Link para registrarse */}
      <p className="text-gray-500 text-center mt-2">
        ¿No tienes una cuenta?{" "}
        <a
          onClick={() => {
            props.loginToggle();
            handlerDafaultLoginFom();
            props.registerToggle();
          }}
          className="text-blue-600 hover:underline"
        >
          Regístrate
        </a>
      </p>
    </motion.div>
  );
}
