import { RolName } from '@/types/rol';
import React from 'react'

const rolesSchemaInfo = {
    admin: {
        label: 'Administrador',
        bgColor: '#6a5acd',        // Violeta suave (Slate Blue)
        textColor: '#ffffff'
    },
    supervisor: {
        label: 'Supervisor',
        bgColor: '#BCB3F7',        // Verde agua (Light Sea Green)
        textColor: '#4F36E9'
    },
    employee: {
        label: 'Trabajador',
        bgColor: '#87F48A',        // Naranja pastel suave
        textColor: '#1D8431'
    },
    hr: {
        label: 'Recursos Humanos',
        bgColor: '#F6898B',        // Amarillo pastel (Light Yellow)
        textColor: '#cd1215'
    },
    teamLeader: {
        label: 'Jefe de un equipo',
        bgColor: '#91C0FF',        // Azul cielo (Sky Blue)
        textColor: '#1F80FF'
    },
    teamWorker: {
        label: 'Se encuentra en un equipo',
        bgColor: '#F6F689',        // Verde menta suave (mint)
        textColor: '#8c8903'
    }
};

type Props = {
    rol: RolName
}

export default function RolesInfo({ rol }: Props) {
    const myRol = rolesSchemaInfo[rol]
    return (
        <div
            className="px-4 py-1 text-sm  rounded-full flex justify-center w-max h-auto max-h-[30px] text-center"
            style={{
                backgroundColor: myRol.bgColor,
                color: myRol.textColor,
            }}
        >
            {myRol.label}
        </div>
    )
}
