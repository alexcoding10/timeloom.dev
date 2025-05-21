import { GetPauses } from '@/types/signings'
import { formatDate } from '@/utils/utils'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
    options: GetPauses
    numberCols: number
}

export default function ChartPauses({ options, numberCols }: Props) {
    // Referencia al último fichaje
    const lastPause = useRef(options.at(-1))

    // Comprobar si el último fichaje es hoy
    const isSigningsToday = lastPause.current?.day
        ? new Date(lastPause.current?.day).getDate() === new Date().getDate()
        : false

    // Número de columnas con la información
    const numberColsWithInfo = isSigningsToday ? options.length : options.length + 1

    // Crear las barras
    const cols = new Array(numberCols).fill(null).map((_, idx) => {
        if (idx >= (numberCols - numberColsWithInfo)) {
            // Calculamos el índice real del fichaje en 'options'
            const index = idx - (numberCols - numberColsWithInfo);
            const timebreaks = options[index]?.timebreaks || [];

            const duration = timebreaks.map((pause) => {
                if (!pause.clockOut && idx === numberCols - 1 && !isSigningsToday) {
                    // Si no hay fichaje hoy y estamos en la última columna
                    return { value: 0, duration: null };
                }

                if (pause.clockIn && pause.clockOut) {
                    const durationMs = new Date(pause.clockOut).getTime() - new Date(pause.clockIn).getTime();
                    return { value: 1, duration: formatDate(new Date(durationMs).toISOString(), 'Hh Mm Ss') };
                }

                return { value: 0, duration: null }; // Si no tiene fichaje, se marca 0
            });

            return {
                value: timebreaks.length +1 || 0,
                durations: duration,
            };
        }

        return { value: 0, durations: null } // default value if no data
    })

    useEffect(() => {
        console.log(cols)
    }, [])

    return (
        <div
            className="flex justify-between items-end gap-2 h-full"
        >
            {cols.map((col, idx) => {
                const rowHeight = (col.value > 0 ? col.value : 1) * 20; // Ajuste del valor para calcular la altura
                return (
                    <div
                        key={idx}
                        className={`${idx === numberCols - 1 ? 'bg-lime-green-600' : 'bg-light-blue-300'} w-full rounded-t-lg`}
                        style={{
                            height: `${rowHeight}px`, // Ajustar la altura de cada barra según el valor
                            maxHeight: '100%', // Para que no se desborde del contenedor
                            width: `${100 / numberCols}%`, // Para distribuir las barras en columnas
                        }}
                    >
                        {/* Aquí puedes agregar contenido dentro de la barra si es necesario */}
                    </div>
                )
            })}
        </div>
    )
}
