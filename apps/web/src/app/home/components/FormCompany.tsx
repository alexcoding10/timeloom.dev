import React, { useState, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import MapComponent from "@/components/maps/MapComponent";
import { URL_BACKEND_DEV } from "@/utils/config";
import { motion } from "framer-motion";
import StepPhoto from "./StepPhoto";

interface Props {
  user: any;
}

const stepsInit = [
  {
    title: "Información de la compañía",
    completed: false,
    current: true,
    icon: 1,
  },
  {
    title: "Imagen Corporativa",
    completed: false,
    current: false,
    icon: 2,
  },
  {
    title: "Ubicación",
    completed: false,
    current: false,
    icon: 3,
  },
];

type Inputs = {
  name: string;
  email: string;
  address: string;
};

let debounceTimer: ReturnType<typeof setTimeout>;

function FormCompany({ user }: Props) {
  const [steps, setSteps] = useState(stepsInit);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [viewPreviewCompany, setViewPreviewCompany] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useForm<Inputs>();

  //🔹  Estados para las imagenes
  const [image, setImage] = useState<File | null>(null); // Guardar como archivo
  const [preview, setPreview] = useState<string | null>(null); // Vista previa Base64

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtiene el archivo
    if (file) {
      setImage(file); // Guarda el archivo

      // Generar vista previa en Base64 (solo para mostrar)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [viewImage, setViewImage] = useState("si");
  const handleSetViewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setViewImage(event.target.value);
  };

  //🔹 funcion para controlar la vista del previewCompany

  const handlerTogglePreviewCompany = () =>
    setViewPreviewCompany(!viewPreviewCompany);

  // 🔹 Función para buscar direcciones en la API
  const fetchAddresses = useCallback(async (query: string) => {
    if (!query) return;

    const url = `${URL_BACKEND_DEV}/address/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.length > 0) {
      const { lat, lon } = data[0];
      setLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
    }
    setSuggestions(data); // Guardamos las sugerencias
  }, []);

  // 🔹 Manejar cambios en el input con debounce
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchAddresses(query);
    }, 500); // 500ms de retraso
  };

  // 🔹 Seleccionar una dirección de las sugerencias
  const selectAddress = (address: string) => {
    setValue("address", address); // Establece el valor en react-hook-form
    setSuggestions([]); // Limpiar sugerencias
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (Object.keys(errors).length > 0) {
      console.log("Errores en el formulario:", errors);
      return; // Detenemos la ejecución si hay errores
    }
    //Si es la ultima etapa, envio los datos
    if (steps[steps.length - 1].current) {
      handlerRegisterCompany();
    }
    // Si no hay errores, y si no es la ultima estapa avanzamos al siguiente paso
    handlerNextStep();
  };

  const handlerNextStep = () => {
    if (!steps[steps.length - 1].current) {
      setSteps((prevSteps) => {
        const updatedSteps = prevSteps.map((step, index) => {
          if (step.current) {
            return { ...step, completed: true, current: false }; // Marca el actual como completado
          }
          if (index > 0 && prevSteps[index - 1].current) {
            return { ...step, current: true }; // Marca el siguiente como actual
          }
          return step;
        });
        return updatedSteps;
      });
    }
  };

  const getDataForm = () => {
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('name', getValues('name'));
    formData.append('email', getValues('email'));
    formData.append('address', getValues('address'));
    formData.append('location', JSON.stringify(location));
    if (viewImage === "si" && image) {
     formData.append("file", image); // Agregar archivo correctamente
   }
    return formData;
  };

  const handlerRegisterCompany = async () => {
   //Tengo que enviar el formulario con el archivo
    let logoUrl = "";
   //si hay una imagen entonces creo el formulario y subo la imagen 
   if(viewImage === "si" && image){
    const formData = new FormData();
    formData.append('file', image);
    const response = await fetch(`${URL_BACKEND_DEV}/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    logoUrl = data.filePath;
   }
   // userId, name,email,address,location como json
   const companyDataRegister = {
    userId: user.id,
    name: getValues('name'),
    email: getValues('email'),
    address: getValues('address'),
    coordinates: location,
    logoUrl: logoUrl
   }
   // guardo la empresa en la base de datos
   fetch(`${URL_BACKEND_DEV}/company/create-with-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(companyDataRegister),
  })
  .then(response => response.json())
  .then(data => {
    //Salio todo bien por lo que debe de recargar la pagina
    //De ese modo entrara en el dashboard
    window.location.reload();
  })
  .catch(error => {
    console.error('Error creating company:', error);
  });



  }

  const handlerRedirectStep = async (icon: number) => {
    //mirar si esta en la vista preview
    viewPreviewCompany && handlerTogglePreviewCompany();
    // Disparar la validación de los campos actuales
    const isValid = await trigger(); // Valida los campos del formulario

    if (!isValid) {
      console.log("Errores detectados, no se puede cambiar de paso.");
      return; // Si hay errores, no avanzamos
    }
    setSteps((prevState) =>
      prevState.map((step, i) => {
        if (step.icon === icon) {
          return { ...step, current: true }; // Marcamos el paso actual
        }

        return {
          ...step,
          current: false,
          completed: i < prevState.findIndex((s) => s.icon === icon), // Los pasos anteriores permanecen completados
        };
      })
    );
  };

  return (
    <>
      {/**Header del formulario */}
      <div className="w-full h-[70px] bg-gray-100 border-b border-neutral-300 absolute top-0 flex justify-center items-center">
        {/** Contenedor de los pasos */}
        <div className="flex gap-3 items-center relative">
          {steps.map((step, index) => (
            <div key={step.icon} className="relative flex items-center">
              {/* Línea que conecta los círculos */}
              {index > 0 && (
                <div
                  className={`absolute w-[30px] h-[4px] left-[-24px] top-1/2 -translate-y-1/2 
            ${steps[index - 1].completed ? "bg-secondary-500" : "bg-neutral-300"}`}
                ></div>
              )}

              {/* Círculo del paso */}
              <div
                onClick={() => handlerRedirectStep(step.icon)}
                className={`w-[40px] h-[40px] cursor-pointer flex justify-center items-center font-bold text-lg bg-neutral-300 rounded-full relative z-10
            ${step.current || step.completed ? "bg-secondary-500 text-white" : "text-neutral-dark-400"}`}
              >
                {step.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/**Formulario */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-3 lg:gap-6"
      >
        {steps[0].current && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg"
          >
            <div className="flex flex-col w-[250px] lg:w-[350px] transition-all duration-100 ease-in ">
              <label className="text-gray-600 font-medium">Nombre</label>
              <input
                {...register("name", {
                  required: "Debes poner un nombre a tu empresa",
                  minLength: {
                    value: 3,
                    message:
                      "El nombre de la empresa debe tener al menos 3 caracteres",
                  },
                })}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
              />
              {errors.name && (
                <span className="text-red-500 text-wrap  w-full">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-[250px] lg:w-[350px] transition-all duration-100 ease-in">
              <label className="text-gray-600 font-medium">
                Correo Electrónico
              </label>
              <input
                {...register("email", {
                  required: "Debes escribir un email de empresa",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "El correo electrónico no es válido",
                  },
                })}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-300"
              />
              <p className="text-red-500 text-wrap w-full">
                {errors.email?.message}
              </p>
            </div>
          </motion.div>
        )}
        {steps[1].current && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg"
          >
            <div className="relative">
              <label className="block text-gray-600 font-medium">
                Dirección
              </label>
              <input
                {...register("address", {
                  required: "La dirección es obligatoria",
                })}
                type="text"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-[250px] lg:w-[350px] transition-all duration-100 ease-in"
                onChange={handleAddressChange}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}

              {/* 🔹 Mostrar sugerencias */}
              {suggestions.length > 0 && (
                <ul className="absolute z-30 w-full bg-white border rounded shadow mt-1 max-h-40 overflow-auto">
                  {suggestions.map((sug, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => selectAddress(sug.display_name)}
                    >
                      {sug.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {location && (
              <div className="relative w-full mt-4 z-10">
                <MapComponent lat={location.lat} lon={location.lon} />
              </div>
            )}
          </motion.div>
        )}

        {/**Foto de la empresa */}
        {steps[2].current && !viewPreviewCompany && (
          <StepPhoto
            image={preview}
            handleImageChange={handleImageChange}
            viewImage={viewImage}
            handleSetViewImage={handleSetViewImage}
          />
        )}

        {viewPreviewCompany && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-5 "
          >
            <div className="flex gap-5">
              {preview && viewImage == "si" ? (
                <img
                  src={preview}
                  alt="Vista previa"
                  className="w-20 h-20 sm:h-40 sm:w-40 object-cover rounded-full border border-neutral-300"
                />
              ) : (
                <div className="w-20 h-20 sm:h-40 sm:w-40  rounded-full flex justify-center items-center border border-zinc-300 text-5xl text-center bg-zinc-300 text-zinc-500">
                  {getValues("name").substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex justify-center flex-col max-w-2xs">
                <h2 className="text-zinc-600 font-bold text-2xl mb-2">
                  {getValues("name")}
                </h2>
                <h3 className="text-zinc-400">{getValues("email")}</h3>
                <h3 className="text-secondary-400">{getValues("address")}</h3>
              </div>
            </div>
            {location && (
              <div className="relative w-full mt-4 z-10">
                <MapComponent lat={location.lat} lon={location.lon} />
              </div>
            )}
          </motion.div>
        )}
        {steps[steps.length - 1].current ? (
          <div className="absolute bottom-5 right-5 flex  gap-3 ">
            <input
              type="button"
              value={`${viewPreviewCompany ? "Atras" : "Ver previsualizacion"}`}
              className="bg-neutral-400 text-white font-bold px-4 py-2 rounded-lg"
              onClick={handlerTogglePreviewCompany}
            />
            <input
              type="submit"
              className="bg-secondary-500 text-white font-bold px-4 py-2 rounded-lg"
              value={"Crear empresa"}
            />
          </div>
        ) : (
          <input
            type="submit"
            className="bg-secondary-500 text-white font-bold px-4 py-2 rounded-lg absolute bottom-5 right-5"
            value={"Siguiente"}
          />
        )}
      </form>
    </>
  );
}

export default FormCompany;
