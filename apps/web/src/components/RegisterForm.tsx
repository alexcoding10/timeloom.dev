import { useState } from "react";
import { motion } from "framer-motion";
import { HeadingXL, TextBase } from "./Typography";
import { URL_BACKEND_DEV } from "@/utils/config";
import { registerSchema } from "@/schema/validator.schema";

interface Props {
  registerToggle: () => void;
  loginToggle: () => void;
}

type Error = {
  value: Boolean;
  text: string;
};

type TypeError =
  | "name"
  | "email"
  | "password"
  | "confirmPassword"
  | "globalError";

export default function RegisterForm(props: Props) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 

  const [error, setError] = useState({
    name: { value: false, text: "" },
    email: { value: false, text: "" },
    password: { value: false, text: "" },
    confirmPassword: { value: false, text: "" },
    globalError: { value: false, text: "" },
  });

  const [loading, setLoading] = useState(false); // Estado de carga

  // Función para establecer un error en un campo específico
  const handlerSetError = (
    type: TypeError,
    data: Error = { value: false, text: "" }
  ) => {
    setError((prevError) => ({
      ...prevError, // Mantén el estado anterior
      [type]: data, // Actualiza solo el campo correspondiente
    }));
  };

  const handleDefaultRegisterForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    handlerDafaultErrors();
  };

  const handlerDafaultErrors = () => ({
    name: { value: false, text: "" },
    email: { value: false, text: "" },
    password: { value: false, text: "" },
    confirmPassword: { value: false, text: "" },
    globalError: { value: false, text: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    handlerDafaultErrors(); //limpio los errores
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.format();

      (["name", "email", "password", "confirmPassword"] as const).forEach(
        (key) => {
          if (errors[key]?._errors?.length) {
            handlerSetError(key, {
              value: true,
              text: errors[key]._errors[0], // Tomamos el primer error
            });
          }
        }
      );
      return false;
    }

    return true;
  };

  const handlerRequest = async () => {
    setLoading(true); // Inicia la carga
    const { confirmPassword, ...dataToSend } = formData;
    fetch(`${URL_BACKEND_DEV}/auth/create/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        handlerSetError("globalError"); // Limpio errores
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.success) {
          //setear error
          handlerSetError("globalError", { value: true, text: data.message });
        }
        //abre login
        props.registerToggle();
        props.loginToggle();

        handlerDafaultErrors(); //limpio los errores
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }); //limpia el formulario
      })
      .catch((error) => {
        handlerSetError("globalError", { value: true, text: error.message });
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false); // Detiene la carga
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Verificar que los password son iguales si no mostrar error
    const isValidate = validateForm();
    // Si no hay errores, enviar a base de datos
    if (isValidate) {
      handlerRequest();
    }
    console.log("Formulario enviado:", formData);
  };

  return (
    <motion.div
      className="flex flex-col gap-4"
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
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              error.name.value
                ? "border-red-400 ring-red-400 focus:border-red-400 focus:ring-red-400 text-red-700"
                : ""
            }`}
            required
          />
          {error.name.value && (
            <p className="text-red-400">{error.name.text}</p>
          )}
        </div>

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
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              error.email.value
                ? "border-red-400 ring-red-400 focus:border-red-400 focus:ring-red-400 text-red-700"
                : ""
            }`}
            required
          />
          {error.email.value && (
            <p className="text-red-400">{error.email.text}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label className="text-gray-600 font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              error.password.value
                ? "border-red-400 ring-red-400 focus:border-red-400 focus:ring-red-400 text-red-700"
                : ""
            }`}
            required
          />
          {error.password.value && (
            <p className="text-red-400">{error.password.text}</p>
          )}
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <label className="text-gray-600 font-medium">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              error.confirmPassword.value
                ? "border-red-400 ring-red-400 focus:border-red-400 focus:ring-red-400 text-red-700"
                : ""
            }`}
            required
          />
          {error.confirmPassword.value && (
            <p className="text-red-400">{error.confirmPassword.text}</p>
          )}
        </div>

        {/* Mensaje de error global */}
        {error.globalError.value && (
          <p className="text-red-400 py-2">{error.globalError.text}</p>
        )}

        {/* Botón de Registro */}
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold mt-2 hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Cargando..." : "Registrarse"}
        </motion.button>
      </form>

      {/* Link para iniciar sesión */}
      <p className="text-gray-500 text-center mt-2">
        ¿Ya tienes una cuenta?{" "}
        <a
          onClick={() => {
            props.registerToggle();
            handleDefaultRegisterForm();
            props.loginToggle();
          }}
          className="text-blue-600 hover:underline"
        >
          Iniciar sesión
        </a>
      </p>
    </motion.div>
  );
}
