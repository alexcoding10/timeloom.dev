'use client'
import ChartInfo from '@/components/ChartInfo'
import ChartPauses from '@/components/ChartPauses'
import Container from '@/components/Container'
import Loading from '@/components/Loading'
import { useSigningsContext } from '@/context/SigningsContext'
import { useChartPause } from '@/hooks/useChartPause'
import { usePause } from '@/hooks/usePause'
import { formatDate } from '@/utils/utils'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'


const pauseFindDays = [
    { value: 5, label: '5 días' },
    { value: 10, label: '10 días' },
    { value: 15, label: '15 días' },
    { value: 20, label: '20 días' },
]


export default function DetailSignings() {

    const { signings } = useSigningsContext()
    const [pauseFind, setPauseFind] = useState(pauseFindDays[0].value)
    const { pauses } = usePause(pauseFind)

    const {cols,colSelected,handlerColSelected} = useChartPause(pauses ?? [],pauseFind)

    useEffect(() => {
        console.log(signings, pauses) //solo para dev

    }, [])
    if(!colSelected || !pauses){
        return <Loading/>
    }

    return (
        <Container>
            <div className='w-full flex flex-col gap-10 xl:gap-20 xl:flex-row  px-20 py-5'>
                <div className='flex justify-start items-center gap-5'>
                    <div>
                        <h1 className="font-montserrat text-base sm:text-xl text-neutral-dark-400">Comienzo de la jornada</h1>
                        <p className="text-lg sm:text-2xl font-bold font-montserrat text-neutral-dark-400">{signings ? formatDate(signings.clockIn, 'Hh Mm Ss') : '0h 0m 0s'}</p>
                    </div>
                    {/*Boton completado o no */}
                    <div className={`px-2 py-1 rounded-lg text-xs lg:text-sm ${!signings ? 'bg-zinc-300 text-neutral-dark-400' : signings.clockOut ? 'bg-lime-green-400/50 text-lime-green-700' : 'bg-lime-green-500 text-lime-green-700'}`}>
                        {
                            !signings ? 'No has fichado' : signings.clockOut ? 'Completado' : 'En desarrollo'
                        }
                    </div>
                </div>

                <div className='flex justify-start items-center gap-5'>
                    <div>
                        <h1 className="font-montserrat text-base sm:text-xl text-neutral-dark-400">Inicio de la última pausa</h1>
                        <p className="text-lg sm:text-2xl font-bold font-montserrat text-neutral-dark-400">
                            {signings?.timebreaks && signings?.timebreaks?.length !== 0
                                ? signings?.timebreaks.at(-1)?.clockIn
                                    ? formatDate(signings?.timebreaks.at(-1)?.clockIn ?? '', 'Hh Mm Ss')
                                    : '0h 0m 0s'
                                : '0h 0m 0s'}
                        </p>
                    </div>
                    {/*Boton completado o no */}
                    <div className={`px-2 py-1 rounded-lg text-xs lg:text-sm ${!signings?.timebreaks || signings?.timebreaks.length === 0 ? 'bg-zinc-300 text-neutral-dark-400' : signings?.timebreaks.at(-1)?.clockIn ? 'bg-lime-green-400/50 text-lime-green-700' : 'bg-lime-green-500 text-lime-green-700'}`}>
                        {
                            !signings?.timebreaks || signings?.timebreaks.length === 0 ? 'No hay pausas' : signings?.timebreaks.at(-1)?.clockIn ? 'Completado' : 'En desarrollo'
                        }
                    </div>
                </div>
            </div>
            {/*Pausas */}
            <div className='w-full flex flex-col gap-10 xl:gap-20  px-20 py-5'>
                {/*Titulos y busqueda */}
                <div className=''>
                    <h1 className="font-montserrat text-base sm:text-xl text-neutral-dark-400">Pausas</h1>
                    <div className='flex  items-center gap-3'>
                        <p className='font-montserrat text-xs sm:text-sm text-neutral-dark-400'>Últimos </p>
                        <Select
                            options={pauseFindDays}
                            defaultValue={pauseFindDays[0]}
                            onChange={(e) => e && setPauseFind(e.value)}
                            className='text-xs sm:text-sm'
                        />
                    </div>
                </div>

                <div className='flex'>
                    {
                        !pauses ? (<Loading />) : (
                            <>
                                <div className='border-b border-b-zinc-200 w-[370px] h-[150px]'>
                                    {/*Grafica de las pausa */}
                                    <ChartPauses cols={cols} handlerColSelected={handlerColSelected}/>
                                </div>
                                <div className='grid grid-cols-2'>
                                    {/*Mostrar todas las pausas */}
                                    <ChartInfo colSelected={colSelected}/>
                                </div>

                            </>
                        )
                    }
                </div>
            </div>

        </Container>
    )
}
