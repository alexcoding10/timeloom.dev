import ChartPauses from '@/components/ChartPauses'
import Container from '@/components/Container'
import Loading from '@/components/Loading'
import { useSigningsContext } from '@/context/SigningsContext'
import { pauseFindDays } from '@/state/pause.state'
import React from 'react'
import Select from 'react-select'

export default function PauseChart() {
    const { colSelected, cols, handlerColSelected, setPauseFind } = useSigningsContext()


    if (!colSelected) {
        return (
            <Loading />
        )
    }

    return (
        <Container>
            <div className='w-full h-full flex flex-col px-20 gap-10  '>
                {/*Grafica de las pausa */}
                {/*Titulos y busqueda */}
                <div className=''>
                    <h1 className="font-montserrat text-base sm:text-2xl text-black mb-2">Pausas</h1>
                    <div className='flex  items-center gap-3'>
                        <p className='font-montserrat text-xs sm:text-base text-neutral-dark-400'>Últimos </p>
                        <Select
                            options={pauseFindDays}
                            defaultValue={pauseFindDays[0]}
                            onChange={(e) => e && setPauseFind(e.value)}
                            className='text-xs sm:text-sm'
                        />
                    </div>
                </div>
                <div className='w-full flex justify-center '>
                  
                        <ChartPauses colSelected={colSelected} cols={cols} handlerColSelected={handlerColSelected} />
                    
                </div>
            </div>
        </Container>
    )
}
