import { useState, useEffect } from "react"
import { useBonus } from "./useBonus"
import { useGetDeductions } from "./useGetDeductions"
import { useRol } from "./useRol"
import { FormCreateUser, FormOptionInputCreateUser } from "@/types/user"
import { capitalize } from "@/utils/utils"


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
                dynamicKey: 'rol',
                option: [], // <-- aqui se agregaran los roles
            },
        ],
    },
    {
        table: "Contract",
        title: "Contrato",
        inputs: [
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
            }, {
                name: "job",
                label: 'Puesto de trabajo',
                type: 'text',
                min: "5",
                max: "25",
                hidden: false,
                required: true,
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
                hidden: false,
                required: true,
            },
            {
                name: "hoursForWeek",
                label: "Horas por semana",
                type: "number",
                steps: "0.01",
                min: "1",
                max: "45",
                hidden: false,
                required: true,
            },
            {
                name: "salaryHours",
                label: "Salario por horas",
                type: "number",
                steps: "0.01",
                min: "1",
                max: "",
                hidden: false,
                required: true,
            },
            {
                name: "bonuses",
                label: "Bonificaciones por contrato",
                type: "select",
                multiple: true,
                dynamicKey: 'bonus',
                option: [], // <-- aqui se agregaran las bonificaciones
                hidden: false,
                required: false,
            },
            {
                name: "deductions",
                label: "Deducciones estándar",
                type: "select",
                multiple: true,
                dynamicKey: 'deduction',
                option: [], // <-- aqui se agregaran las deducciones
                hidden: false,
                required: true,
            },
        ],
    },
];
export const useCreateUser = () => {
    const { bonus } = useBonus()
    const { deductions } = useGetDeductions()
    const { roles } = useRol()
    const [loading, setLoading] = useState(true)
    const [loadingFormSchema, setLoadingFormSchema] = useState(true)

    const [FormOptions, setFormOptions] = useState({
        bonus: [] as FormOptionInputCreateUser[],
        deduction: [] as FormOptionInputCreateUser[],
        rol: [] as FormOptionInputCreateUser[],
    })

    const [formState, setFormState] = useState<FormCreateUser[]>(formSchema)

    const handlerHiddenInput = (sectionTitle: string, inputLabel: string, value?: boolean) => {
        setFormState((prev) => {
            return prev.map((section) => {
                if (section.title === sectionTitle) {
                    return {
                        ...section,
                        inputs: section.inputs.map((input) => {
                            if (input.label === inputLabel) {
                                return {
                                    ...input,
                                    hidden: value !== undefined ? value : !input.hidden,
                                    required: value !== undefined ? value : !input.required //quitamos que sea requerido
                                }
                            }
                            return input
                        })
                    }
                }
                return section
            })
        })
    }

    const rol= {
        admin:'Administrador',
        supervisor:'Supervisor',
        employee:'Empleado',
        hr:'Recursos Humanos',
        teamLeader:'Lider de un equipo',
        teamWorker:'Trabajador en un equipo',
    }

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
            hidden: contractType ? (contractType !== deduction.type ? false : true) : false, // Oculto los que no corresponden al tipo de contrato
            }
        });

        const roleMap = roles.map((role, idx) => ({
            id: role.id ?? `${role.name}-${idx}`,
            name:rol[role.name as keyof typeof rol],
            desc: role.description ? capitalize(role.description) : '',
            hidden: false,
        }));

        setFormOptions({
            bonus: bonusMap,
            deduction: deductionMap,
            rol: roleMap,
        });
    }


    useEffect(() => {
        const allLoaded =
            bonus.length > 0 || deductions.length > 0 || roles.length > 0;

        if (allLoaded) {
            mapFormOptions()
            setLoadingFormSchema(false)
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
                                        option: FormOptions[input.dynamicKey as keyof typeof FormOptions] || []
                                    }
                                }
                                return input
                            })
                        }
                    }
                    return section
                })
            })

            setLoading(false) //Termino de cargar
        }

    }, [FormOptions])


    return { formState, loading, handlerHiddenInput, mapFormOptions }
}