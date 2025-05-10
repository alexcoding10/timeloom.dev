import { generarPasswordSegura } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

type FormOption = {
  id: number | string;
  name: string;
  desc?: string;
};

type FormInput = {
  label: string;
  type: string;
  multiple?: boolean;
  steps?: string;
  max?: string;
  min?: string;
  option?: FormOption[];
};

type FormCreateUser = {
  title: string;
  inputs: FormInput[];
};

const formSchema: FormCreateUser[] = [
  {
    title: "Datos personales",
    inputs: [
      {
        label: "Nombre",
        type: "text",
      },
      {
        label: "Email",
        type: "email",
      },
      {
        label: "Contraseña",
        type: "password",
      },
      {
        label: "Rol",
        type: "select",
        multiple: false,
        option: [
          {
            id: 1,
            name: "Administrador",
            desc: "Acceso completo a todas las funcionalidades de la aplicación. Puede gestionar usuarios, equipos, horarios, permisos, configuraciones generales y ver todos los registros y reportes.",
          },
          {
            id: 2,
            name: "Supervisor",
            desc: "Acceso para gestionar registros de trabajo y aprobar horarios. Puede revisar y modificar las entradas de tiempo de los usuarios, pero no puede modificar configuraciones globales o gestionar roles.",
          },
          {
            id: 4,
            name: "Recurso Humanos",
            desc: "Acceso a la gestión de usuarios, nómina, vacaciones y otros aspectos relacionados con el personal. No tiene acceso a configuraciones globales de la aplicación, pero puede gestionar los registros de trabajo para generar informes de nómina y ausencias.",
          },
          {
            id: 3,
            name: "Trabajador",
            desc: "Acceso básico a la aplicación. Solo puede registrar su tiempo (hora de entrada, hora de salida) y ver su propio historial de registros. No tiene acceso para modificar los horarios de otros usuarios o cambiar configuraciones.",
          },
        ],
      },
    ],
  },
  {
    title: "Contrato",
    inputs: [
      {
        label: "Tipo de contrato",
        type: "select",
        multiple: false,
        option: [
          {
            id: "FIXED",
            name: "Fijo",
          },
          {
            id: "TEMPORARY",
            name: "Temporal",
          },
          {
            id: "FREELANCE",
            name: "Freelance",
          },
        ],
      },{
        label:'Puesto de trabajo',
        type:'text'
      },
      {
        label: "Fecha de comienzo",
        type: "date",
      },
      {
        label: "Fecha fin",
        type: "date",
      },
      {
        label: "Horas por semana",
        type: "number",
        steps: "0.01",
        min: "1",
        max: "45",
      },
      {
        label: "Salario por horas",
        type: "number",
        steps: "0.01",
        min: "1",
        max: "",
      },
      {
        label: "Bonificaciones por contrato",
        type: "select",
        multiple: true,
        option: [
          {
            id: "FIXED_BONUS",
            name: "Bonificación por permanencia",
          },
          {
            id: "PRODUCTIVITY",
            name: "Bonificación por productividad",
          },
          {
            id: "SENIORITY",
            name: "Bonificación por antigüedad",
          },
        ],
      },
      {
        label: "Deducciones estándar",
        type: "select",
        multiple: true,
        option: [
          {
            id: "INSS",
            name: "Cotización a la seguridad social (INSS)",
          },
          {
            id: "IRPF",
            name: "Impuesto sobre la renta (IRPF)",
          },
          {
            id: "PENSION",
            name: "Aportación a fondo de pensión",
          },
        ],
      },
    ],
  },
];

export default function FormCreateUser() {
  const { register, handleSubmit, control, watch, setValue } = useForm();
  const [hiddenDateEnd, setHiddenDateEnd] = useState(false);
  const [autoCompletedEmail, setAutoCompletedEmail] = useState(true);
  const [autoGeneredPassword, setGeneredPassword] = useState(false);

  const nombre = watch("datos_personales.nombre");
  const tipoContrato = watch("contrato.tipo_de_contrato");
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const formatInputName = (sectionTitle: string, label: string) =>
    `${sectionTitle}`.toLowerCase().replace(/\s+/g, "_") +
    "." +
    label.toLowerCase().replace(/\s+/g, "_");

  useEffect(() => {
    if (nombre) {
      const palabras = nombre.trim().split(/\s+/);

      if (palabras.length != 0 && autoCompletedEmail) {
        const partes = palabras.map((p: string) =>
          p.substring(0, 3).toLowerCase()
        );
        const correo = partes.join("") + "@gmail.com";
        setValue("datos_personales.email", correo);
      }
    }
  }, [nombre]);

  useEffect(() => {
    if (tipoContrato?.value === "FIXED") {
      setHiddenDateEnd(true);
      setValue("contrato.fecha_fin", "");
    } else {
      setHiddenDateEnd(false);
    }
  }, [tipoContrato]);

  useEffect(()=>{
    if(autoGeneredPassword){
      setValue('datos_personales.contraseña',generarPasswordSegura())
    }else{
      setValue('datos_personales.contraseña','')
    }

  },[autoGeneredPassword])

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      {formSchema.map((section, index) => (
        <div key={`section-${index}`}>
          <h1 className="font-montserrat font-medium mb-5">{section.title}</h1>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-12 my-4">
            {section.inputs.map((input, idx) => {
              const inputId = `${input.label.replace(/\s+/g, "-").toLowerCase()}-${idx}`;
              const inputName = formatInputName(section.title, input.label);

              return (
                <div
                  key={`input-${inputId}`}
                  className="grid grid-row-[0.6fr_1fr] md:grid-col-[0.6fr_1fr] items-center gap-1"
                >
                  {hiddenDateEnd && input.label === "Fecha fin" ? (
                    <div className="flex gap-3 items-center ">
                      <label htmlFor={inputId}>{input.label}</label>
                      <div className="bg-secondary-300 text-secondary-500 text-sm rounded-lg px-2">
                        Deshabilitado contrato fijo
                      </div>
                    </div>
                  ) : input.label === "Email" ? (
                    <div className="flex gap-3 items-center ">
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
                  ) : input.label === 'Contraseña' ? (
                    <div className="flex gap-3 items-center ">
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
                  ) : (
                    <label htmlFor={inputId}>{input.label}</label>
                  )}
                  {input.type === "select" ? (
                    <Controller
                      name={inputName}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          inputId={inputId}
                          isMulti={input.multiple}
                          options={input.option?.map((opt) => ({
                            value: opt.id,
                            label: opt.name,
                          }))}
                          closeMenuOnSelect={!input.multiple}
                          components={makeAnimated()}
                          className="basic-multi-select"
                          classNamePrefix="Select"
                          styles={{
                            control: (base) => ({
                              ...base,
                              padding: "2px",
                              borderRadius: "0.5rem",
                              borderColor: "#D1D5DB", // neutral-300
                            }),
                          }}
                        />
                      )}
                    />
                  ) : (
                    <input
                      id={inputId}
                      type={input.type}
                      step={input.steps}
                      max={input.max}
                      min={input.min}
                      {...register(inputName, {
                        required: !(
                          hiddenDateEnd && input.label === "Fecha fin"
                        ),
                        min: input.min ? parseFloat(input.min) : undefined,
                        max: input.max ? parseFloat(input.max) : undefined,
                      })}
                      disabled={hiddenDateEnd && input.label === "Fecha fin"}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-400"
                    />
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
