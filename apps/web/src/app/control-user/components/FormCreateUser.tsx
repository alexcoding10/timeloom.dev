import { generarPasswordSegura, mapSubmitUser } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import type { FormCreateUser } from "@/types/user";
import { useCreateUser } from "@/hooks/useCreateUser";
import Loading from "@/components/Loading";
import { useAuthContext } from "@/context/AuthContext";
import { quitarTildes } from "@/utils/utils";
import ModalViewRememberPassword from "./ModalViewRememberPassword";
import { useUserControlContext } from "@/context/UserControlContext";

export default function FormCreateUser() {
  const {handlerCloseCreateUserView} = useUserControlContext();
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const {
    formState: formSchema,
    loading:loadingFormSchema,
    onSubmit: onSubmitUser,
    errorSubmit,
    selectContract,
  } = useCreateUser();

  const { user } = useAuthContext();


  const [autoCompletedEmail, setAutoCompletedEmail] = useState(true);
  const [autoGeneredPassword, setGeneredPassword] = useState(false);
  const [openViewPassword, setOpenViewPassword] = useState({
    open: false,
    password: "",
    isClosed: false,
  });

  const nombre = watch("User.name");
  const tipoContrato = watch("Contract.type");
  const startDate = watch("Contract.startDate");
  const minEndDate = startDate
    ? new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000) // +1 día
    : null;
  const formattedMinEndDate = minEndDate
    ? minEndDate.toISOString().split("T")[0]
    : undefined;

  const handlerOpenViewPassword = (password: string) => {
    setOpenViewPassword({
      open: true,
      password: password,
      isClosed: false,
    });
  };
  const handlerCloseViewPassword = () => {
    setOpenViewPassword({
      open: false,
      password: "",
      isClosed: true,
    });
  };

  const onSubmit = async (data: any) => {
    const requestData = mapSubmitUser(data, user);
    
    
    await onSubmitUser(requestData); //espera aque termine la peticion
    if (errorSubmit.status) {
      //mostrar un popup con el error
    }
    //Mostrar un mensaje mostrando la contraseña generada
    //para que el usuario sepa la contraseña que se le ha generado
    //y la pase al usuario.
    handlerOpenViewPassword(requestData.user.password);
  };

  useEffect(() => {
    if (nombre && autoCompletedEmail) {
      const palabras = nombre.trim().split(/\s+/);
      const partes = palabras.map((p: string) =>
        quitarTildes(p.substring(0, 3).toLowerCase())
      );
      const correo =
        partes.join("") + `@${user?.company?.name.toLowerCase()}.com`;
      setValue("User.email", correo);
    }
  }, [nombre, autoCompletedEmail]);

  useEffect(() => {
    switch (tipoContrato?.value) {
      case "FIXED":
        selectContract("FIXED"); //oculta y mapea
        //setea
        setValue("Contract.endDate", "");
        setValue("Contract.bonuses", []);
        break;
      case "TEMPORARY":
        selectContract("TEMPORARY"); //oculta y mapea
        //setea
        setValue("Contract.bonuses", []);
        break;
      case "FREELANCE":
        selectContract("FREELANCE"); //oculta y mapea
        //setea
        setValue("Contract.irpf_percentage", 0);
        setValue("Contract.bonuses", []);
        setValue("Contract.deductions", []);
        break;
    }
  }, [tipoContrato]);

  useEffect(() => {
    if (autoGeneredPassword) {
      const generated = generarPasswordSegura();
      setValue("User.password", generated);
    } else {
      setValue("User.password", "");
    }
  }, [autoGeneredPassword]);

  useEffect(() => {
    if (openViewPassword.isClosed && handlerCloseCreateUserView) {
      //agrega el usuario a la lista
      
      //cambio la vista
      handlerCloseCreateUserView()
    }
  }, [openViewPassword]);

  if (loadingFormSchema) return <Loading />;

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {/*Modal contraseña generada */}
      {
        openViewPassword && (
          <ModalViewRememberPassword
            openViewPassword={openViewPassword}
            handlerCloseViewPassword={handlerCloseViewPassword}
          />
        )
      }

      {/* Formulario */}
      {formSchema.map((section, index) => (
        <div key={`section-${index}`}>
          <h1 className="font-montserrat font-medium mb-5">{section.title}</h1>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-12 my-4">
            {section.inputs
              .filter((input) => !input.hidden) // 👈 no renderizamos inputs ocultos
              .map((input, idx) => {
                const inputId = `${input.label
                  .replace(/\s+/g, "-")
                  .toLowerCase()}-${idx}`;

                const inputName = `${section.table}.${input.name}`;

                const renderLabel = () => {
                  if (input.label === "Email") {
                    return (
                      <div className="flex gap-3 items-center">
                        <label htmlFor={inputId}>{input.label}</label>
                        <div className="flex gap-2 bg-neutral-300 text-sm rounded-lg px-2">
                          <input
                            type="checkbox"
                            checked={autoCompletedEmail}
                            onChange={(e) =>
                              setAutoCompletedEmail(e.target.checked)
                            }
                          />
                          <p>Autocompletar</p>
                        </div>
                      </div>
                    );
                  }

                  if (input.label === "Contraseña") {
                    return (
                      <div className="flex gap-3 items-center">
                        <label htmlFor={inputId}>{input.label}</label>
                        <div className="flex gap-2 bg-neutral-300 text-sm rounded-lg px-2">
                          <input
                            type="checkbox"
                            checked={autoGeneredPassword}
                            onChange={(e) =>
                              setGeneredPassword(e.target.checked)
                            }
                          />
                          <p>Autogenerar</p>
                        </div>
                      </div>
                    );
                  }

                  return <label htmlFor={inputId}>{input.label}</label>;
                };

                return (
                  <div
                    key={`input-${inputId}`}
                    className="grid grid-row-[0.6fr_1fr] md:grid-col-[0.6fr_1fr] items-center gap-1"
                  >
                    {renderLabel()}
                    {input.type === "select" ? (
                      <Controller
                        name={inputName}
                        control={control}
                        rules={{
                          required: input?.required
                            ? "Este campo es obligatorio"
                            : false,
                          validate: input.multiple
                            ? (value) =>
                                input.required
                                  ? value && value.length > 0
                                    ? true
                                    : "Debe seleccionar al menos una opción"
                                  : undefined
                            : (value) =>
                                input.required
                                  ? value
                                    ? true
                                    : "Debe seleccionar una opción"
                                  : undefined,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            inputId={inputId}
                            isMulti={input.multiple}
                            options={input.option
                              ?.filter((opt) => !opt.hidden) //filtar por lo que no estan ocultos
                              .map((opt) => ({
                                value: opt.id,
                                label: opt.name,
                              }))}
                            placeholder="Seleccionar"
                            noOptionsMessage={() =>
                              "No hay opciones disponibles"
                            }
                            closeMenuOnSelect={!input.multiple}
                            components={makeAnimated()}
                            className="basic-multi-select"
                            classNamePrefix="Select"
                            styles={{
                              control: (base) => ({
                                ...base,
                                padding: "2px",
                                borderRadius: "0.5rem",
                                borderColor: "#D1D5DB",
                              }),
                            }}
                          />
                        )}
                      />
                    ) : (
                      <div>
                        <input
                          id={inputId}
                          type={input.type}
                          step={input.steps}
                          max={input.max}
                          min={
                            input.name === "endDate"
                              ? formattedMinEndDate
                              : input.min
                          }
                          disabled={input.name === "endDate" && !startDate}
                          {...register(inputName, {
                            required:
                              input?.required && "Este campo es obligatorio",
                            min: input.min
                              ? {
                                  value: parseFloat(input.min),
                                  message: `Debe ser al menos ${input.min}`,
                                }
                              : undefined,
                            max: input.max
                              ? {
                                  value: parseFloat(input.max),
                                  message: `No debe superar ${input.max}`,
                                }
                              : undefined,
                            pattern:
                              input.name === "name" || input.name === "job"
                                ? {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚ ]+$/, // Solo letras y espacios
                                    message: `El ${input.label.toLowerCase()} solo puede contener letras`,
                                  }
                                : input.name === "password"
                                  ? {
                                      value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                                      message:
                                        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial",
                                    }
                                  : undefined,
                          })}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400"
                        />
                        {input.name === "password" && autoGeneredPassword && (
                          <p className="text-sm ml-1 mt-1 text-zinc-500">{`${watch("User.password")}`}</p>
                        )}
                      </div>
                    )}
                    {(errors as any)?.[section.table]?.[input.name]
                      ?.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {(errors as any)?.[section.table]?.[
                          input.name
                        ]?.message?.toString()}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Crear Usuario
      </button>
    </form>
  );
}

