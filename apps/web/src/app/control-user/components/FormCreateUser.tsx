import { generarPasswordSegura } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import type { FormCreateUser } from "@/types/user";
import { useCreateUser } from "@/hooks/useCreateUser";
import Loading from "@/components/Loading";
import { set } from "zod";

export default function FormCreateUser() {
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
    loading: loadingFormSchema,
    handlerHiddenInput,
    mapFormOptions,
  } = useCreateUser();

  const [autoCompletedEmail, setAutoCompletedEmail] = useState(true);
  const [autoGeneredPassword, setGeneredPassword] = useState(false);

  const nombre = watch("User.name");
  const tipoContrato = watch("Contract.type");
  const startDate = watch("Contract.startDate");
  const minEndDate = startDate
    ? new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000) // +1 día
    : null;
  const formattedMinEndDate = minEndDate
    ? minEndDate.toISOString().split("T")[0]
    : undefined;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    if (nombre && autoCompletedEmail) {
      const palabras = nombre.trim().split(/\s+/);
      const partes = palabras.map((p: string) =>
        p.substring(0, 3).toLowerCase()
      );
      const correo = partes.join("") + "@gmail.com";
      setValue("User.email", correo);
    }
  }, [nombre, autoCompletedEmail]);

  useEffect(() => {
    switch (tipoContrato?.value) {
      case "FIXED":
        handlerHiddenInput("Contract", "startDate", true);
        handlerHiddenInput("Contract", "bonuses", false);
        handlerHiddenInput("Contract", "deductions", false);
        handlerHiddenInput("Contract", "irpf_percentage", false);
        setValue("Contract.endDate", "");
        mapFormOptions("Fijos");
        break;
      case "TEMPORARY":
        handlerHiddenInput("Contract", "endDate", false);
        handlerHiddenInput("Contract", "bonuses", false);
        handlerHiddenInput("Contract", "deductions", false);
        handlerHiddenInput("Contract", "irpf_percentage", false);
        mapFormOptions("Temporeros");
        break;
      case "FREELANCE":
        handlerHiddenInput("Contract", "endDate", false);
        handlerHiddenInput("Contract", "bonuses", true);
        handlerHiddenInput("Contract", "deductions", true);
        handlerHiddenInput("Contract", "irpf_percentage", true);
        setValue("Contact.irpf_percentage", 0);
        setValue("Contract.bonuses", []);
        setValue("Contract.deductions", []);
        break;
    }
  }, [tipoContrato]);

  useEffect(() => {
    //generar contraseña
    setValue(
      "User.password",
      autoGeneredPassword ? generarPasswordSegura() : ""
    );
  }, [autoGeneredPassword]);

  if (loadingFormSchema) return <Loading />;

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                        rules={{ required: input?.required }}
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
                            defaultValue={
                              input.name === "type" &&
                              input.option &&
                              input.option.length > 0
                                ? {
                                    value: input.option[0].id,
                                    label: input.option[0].name,
                                  }
                                : null
                            }
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
                          })}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400"
                        />
                        {input.name === "password" && autoGeneredPassword && (
                          <p className="text-sm ml-3 text-zinc-500">{`${watch("User.password")}`}</p>
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
