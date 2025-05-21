import { ColsPauses, GetPauses } from '@/types/signings'
import { formatDate } from '@/utils/utils'
import { col } from 'framer-motion/client'
import React, {  useRef} from 'react'
import Loading from './Loading'

interface Props {
    cols:ColsPauses 
    handlerColSelected: (idx: number) => void 
}

export default function ChartPauses({ cols ,handlerColSelected}: Props) {

    if(cols.length === 0 ){
        return <Loading/>
    }

    const numberCols = cols.length

    return (
        <div
            className="flex justify-between items-end gap-2 h-full"
        >
            {cols.map((col, idx) => {
                const rowHeight = (col.value > 0 ? col.value : 1) * 20; // Ajuste del valor para calcular la altura
                return (
                    <div
                        key={idx}
                        onClick={()=>handlerColSelected(idx)}
                        className={`${idx === numberCols - 1 ? 'bg-lime-green-600' : 'bg-light-blue-300'} w-full rounded-t-lg hover:bg-secondary-500 transition-all duration-300 ease-in `}
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
