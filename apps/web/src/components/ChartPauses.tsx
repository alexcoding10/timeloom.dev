import React from 'react'
import Loading from './Loading'
import { Col } from '@/hooks/useChartPause'

interface Props {
    cols: Col[]
    handlerColSelected: (idx: number) => void
    colSelected: Col
}

export default function ChartPauses({ cols, colSelected, handlerColSelected }: Props) {

    if (cols.length === 0) {
        return <Loading />
    }

    const numberCols = cols.length

    return (
        <div className='border-b border-l border-b-zinc-200 border-l-zinc-200 min-w-[300px] max-w-[600px]  w-full h-[200px] '>
            <div
                className="flex justify-between items-end gap-2 h-full"
            >
                {cols.map((col, idx) => {

                    const rowHeight = (col.value + 1) * 20; // Ajuste del valor para calcular la altura
                    return (
                        <div
                            key={idx}
                            onClick={() => handlerColSelected(idx)}
                            className={`${colSelected.day === col.day ? 'bg-lime-green-600' : 'bg-light-blue-300'} w-full rounded-t-lg hover:bg-secondary-500 transition-all duration-300 ease-in `}
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
        </div>
    )
}
