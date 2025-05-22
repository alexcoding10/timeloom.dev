'use client'
import ChartInfo from '@/components/ChartInfo'
import Container from '@/components/Container'
import Loading from '@/components/Loading'
import { useSigningsContext } from '@/context/SigningsContext'
import { formatDate } from '@/utils/utils'
import React, { useEffect } from 'react'
import { InfoCard } from './InfoCard'



export default function DetailSignings() {
    const { signings, pauses, colSelected } = useSigningsContext()

    if (!colSelected || !pauses) {
        return <Loading />
    }

    const clockInValue = signings ? formatDate(signings.clockIn, 'Hh Mm Ss') : '0h 0m 0s';
    const lastPauseClockIn = signings?.timebreaks?.at(-1)?.clockIn ? formatDate(signings?.timebreaks.at(-1)?.clockIn ?? '', 'Hh Mm Ss') : '0h 0m 0s';
    const clockOutStatus = signings?.clockOut ? 'completed' : signings ? 'in-progress' : 'inactive';
    const pauseStatus = signings?.timebreaks?.length === 0 ? 'inactive' : signings?.timebreaks?.at(-1)?.clockOut ? 'completed' : 'in-progress';

    return (
        <Container>
            <div className='w-full flex flex-col gap-5 min-[1400px]:gap-10 min-[1400px]:flex-row px-20 py-5'>
                <InfoCard
                    title="Comienzo de la jornada"
                    value={clockInValue}
                    status={clockOutStatus}
                    statusText={clockOutStatus === 'inactive' ? 'No has fichado' : clockOutStatus === 'completed' ? 'Completado' : 'En desarrollo'}
                />

                <InfoCard
                    title="Inicio de la última pausa"
                    value={lastPauseClockIn}
                    status={pauseStatus}
                    statusText={pauseStatus === 'inactive' ? 'No hay pausas' : pauseStatus === 'completed' ? 'Completado' : 'En desarrollo'}
                />
            </div>

            <div className='w-full px-20'>
                <h1 className="font-montserrat font-semibold text-start">
                    {new Date().getDate().toString() === colSelected.day.split('/')[0]
                        ? 'Pausas de hoy'
                        : `Pausas del día ${colSelected.day}`}
                </h1>
            </div>

            <div className='w-full flex px-20 overflow-y-auto overflow-x-hidden'>
                {!pauses ? (<Loading />) : (<ChartInfo colSelected={colSelected} />)}
            </div>
        </Container>
    )
}