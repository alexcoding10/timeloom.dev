import { useState, useEffect } from "react";
import { useBonus } from "./useBonus";
import { useGetDeductions } from "./useGetDeductions";
import { useRol } from "./useRol";
import { FormCreateUser, FormOptionInputCreateUser } from "@/types/user";
import { capitalize } from "@/utils/utils";
import { CreateUserData } from "@/types/forms";
import { URL_BACKEND_DEV } from "@/utils/config";

const formSchema: FormCreateUser[] = [
  {
    table: "User",
    title: "Datos personales",
    inputs: [
      {
        name: "name",
        label: "Nombre",
        type: "text",
        hidden: false,
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        hidden: false,
        required: true,
      },
      {
        name: "password",
        label: "Contraseña",
        type: "password",
        min: "8",
        max: "20",
        hidden: false,
        required: true,
      },
      {
        name: "globalRol",
        label: "Rol",
        type: "select",
        required: true,
        hidden: false,
        multiple: false,
        dynamicKey: "rol",
        option: [], // <-- aqui se agregaran los roles
      },
    ],
  },
  {
    table: "Contract",
    title: "Contrato",
    inputs: [
      {
        name: "job",
        label: "Puesto de trabajo",
        type: "text",
        min: "5",
        max: "25",
        hidden: false,
        required: true,
      },
      {
        name: "type",
        label: "Tipo de contrato",
        type: "select",
        multiple: false,
        hidden: false,
        required: true,
        option: [
          {
            id: "FIXED",
            name: "Fijo",
            hidden: false,
          },
          {
            id: "TEMPORARY",
            name: "Temporal",
            hidden: false,
          },
          {
            id: "FREELANCE",
            name: "Freelance",
            hidden: false,
          },
        ],
      },
      {
        name: "startDate",
        label: "Fecha de comienzo",
        type: "date",
        hidden: false,
        required: true,
      },
      {
        name: "endDate",
        label: "Fecha fin",
        type: "date",
        hidden: true,
        required: false,
      },
      {
        name: "hoursForWeek",
        label: "Horas por semana",
        type: "number",
        steps: "0.01",
        min: "1",
        max: "40",
        hidden: false,
        required: true,
      },
      {
        name: "salaryHours",
        label: "Salario por horas (€)",
        type: "number",
        steps: "0.01",
        min: "1",
        max: "",
        hidden: false,
        required: true,
      },
      {
        name: "irpf_percentage",
        label: "Retención de IRPF (%)",
        type: "number",
        steps: "0.01",
        min: "0.1",
        max: "100",
        hidden: false,
        required: true,
      },
      {
        name: "bonuses",
        label: "Bonificaciones por contrato",
        type: "select",
        multiple: true,
        dynamicKey: "bonus",
        option: [], // <-- aqui se agregaran las bonificaciones
        hidden: false,
        required: false,
      },
      {
        name: "deductions",
        label: "Deducciones estándar",
        type: "select",
        multiple: true,
        dynamicKey: "deduction",
        option: [], // <-- aqui se agregaran las deducciones
        hidden: false,
        required: true,
      },
    ],
  },
];
export const useCreateUser = () => {
  const { bonus } = useBonus();
  const { deductions } = useGetDeductions();
  const { roles } = useRol();
  const [loading, setLoading] = useState(true);
  const [loadingFormSchema, setLoadingFormSchema] = useState(true);
  const [errorSubmit, setErrorSubmit] = useState({
    message: "",
    status: false,
  });

  const handlerErrorSubmit = (message?: string) => {
    //si hay un mensaje se crea el error si no , se reestablece
    setErrorSubmit({
      message: message ? message : "",
      status: message ? true : false,
    });
  };

  const [FormOptions, setFormOptions] = useState({
    bonus: [] as FormOptionInputCreateUser[],
    deduction: [] as FormOptionInputCreateUser[],
    rol: [] as FormOptionInputCreateUser[],
  });

  const [formState, setFormState] = useState<FormCreateUser[]>(formSchema);

  const handlerHiddenInput = (
    table: string,
    inputName: string,
    value?: boolean,
    required?: boolean
  ) => {
    setFormState((prev) => {
      return prev.map((section) => {
        if (section.table === table) {
          return {
            ...section,
            inputs: section.inputs.map((input) => {
              if (input.name === inputName) {
                return {
                  ...input,
                  hidden: value !== undefined ? value : !input.hidden,
                  required: required !== undefined ? required : !input.required, //quitamos que sea requerido
                };
              }
              return input;
            }),
          };
        }
        return section;
      });
    });
  };

  const rol = {
    admin: "Administrador",
    supervisor: "Supervisor",
    employee: "Empleado",
    hr: "Recursos Humanos",
    teamLeader: "Lider de un equipo",
    teamWorker: "Trabajador en un equipo",
  };

  const mapFormOptions = (contractType?: string) => {
    const bonusMap = bonus.map((bonus, idx) => ({
      id: bonus.id ?? `${bonus.name}-${idx}`,
      name: capitalize(bonus.name),
      desc: capitalize(bonus.description),
      hidden: false,
    }));

    const deductionMap = deductions.map((deduction, idx) => {
      return {
        id: deduction.id ?? `${deduction.name}-${idx}`,
        name: capitalize(deduction.name),
        desc: capitalize(deduction.description),
        hidden: contractType
          ? contractType !== deduction.type
            ? false
            : true
          : false, // Oculto los que no corresponden al tipo de contrato
      };
    });

    const roleMap = roles.map((role, idx) => ({
      id: role.id ?? `${role.name}-${idx}`,
      name: rol[role.name as keyof typeof rol],
      desc: role.description ? capitalize(role.description) : "",
      hidden: false,
    }));

    setFormOptions({
      bonus: bonusMap,
      deduction: deductionMap,
      rol: roleMap,
    });
  };

  const selectContract = (type: "FIXED" | "TEMPORARY" | "FREELANCE") => {
    if (type === "FIXED") {
      handlerHiddenInput("Contract", "startDate", false, true);
      handlerHiddenInput("Contract", "endDate", true, false); //ocultar fecha fin ya que es fijo
      handlerHiddenInput("Contract", "bonuses", false, false);
      handlerHiddenInput("Contract", "deductions", false, true);
      handlerHiddenInput("Contract", "irpf_percentage", false, true);
      mapFormOptions("Fijos");
    } else if (type === "TEMPORARY") {
      handlerHiddenInput("Contract", "endDate", false, true);
      handlerHiddenInput("Contract", "bonuses", false, false);
      handlerHiddenInput("Contract", "deductions", false, true);
      handlerHiddenInput("Contract", "irpf_percentage", false, true);
      mapFormOptions("Temporeros");
    } else {
      handlerHiddenInput("Contract", "endDate", false, true);
      handlerHiddenInput("Contract", "bonuses", true, false);
      handlerHiddenInput("Contract", "deductions", true, false);
      handlerHiddenInput("Contract", "irpf_percentage", true, false);
    }
  };

  //enviar los datos al backend
  const onSubmit = async (data: CreateUserData) => {
    const response = await fetch(
      `${URL_BACKEND_DEV}/users/create-with-contract`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const dataResponse = await response.json();

    if (!response.ok) {
      handlerErrorSubmit("Error al crear el usuario");
      return;
    }
    //aqui no hay errores
    handlerErrorSubmit("");
  };

  useEffect(() => {
    const allLoaded =
      bonus.length > 0 || deductions.length > 0 || roles.length > 0;

    if (allLoaded) {
      mapFormOptions('FIXED');
      setLoadingFormSchema(false);
    }
  }, [bonus, deductions, roles]);

  useEffect(() => {
    if (!loadingFormSchema) {
      setFormState((prev) => {
        return prev.map((section) => {
          if (section.inputs.some((input) => input.dynamicKey)) {
            return {
              ...section,
              inputs: section.inputs.map((input) => {
                if (input.dynamicKey) {
                  return {
                    ...input,
                    option:
                      FormOptions[
                        input.dynamicKey as keyof typeof FormOptions
                      ] || [],
                  };
                }
                return input;
              }),
            };
          }
          return section;
        });
      });

      setLoading(false); //Termino de cargar
    }
  }, [FormOptions]);

  return {
    formState,
    loading,
    loadingFormSchema,
    handlerHiddenInput,
    mapFormOptions,
    onSubmit,
    errorSubmit,
    selectContract
  };
};
