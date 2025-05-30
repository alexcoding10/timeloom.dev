import React from 'react';
import { TimeBreak } from '@/types/user';
import { formatDate } from '@/utils/utils';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/maps/MapComponent'), {
  ssr: false,
});

interface SigningCardProps {
    timebreak: TimeBreak;
}

export default function SigningsBreakCards({ timebreak }: SigningCardProps) {
    return (
        <div className="shadow-lg bg-yellow-100 rounded-lg p-4 mb-3">
            <div className="mb-5 flex justify-between">
                <div>
                    <h1 className="font-bold text-lg">Datos del fichaje</h1>
                    <hr className="text-zinc-400 mb-3" />
                    <p>Comienzo: {formatDate(timebreak.clockIn, 'hh:mm:ss')}</p>
                    {timebreak.clockOut ? (
                        <p>Final: {formatDate(timebreak.clockOut, 'hh:mm:ss')}</p>
                    ) : (
                        <p className="text-red-600">❌ No se ha fichado el final de la pausa</p>
                    )}
                    {
                        timebreak.description.length !== 0 && (
                            <div className='my-4'>
                                <h1 className='font-bold'>Descripción</h1>
                                <hr className="text-zinc-400 mb-3" />
                                <p>{timebreak.description}</p>

                            </div>
                        )
                    }
                </div>
            </div>
            {timebreak.coordinates !== null ? (
                <div className="w-[300px] mx-auto">
                    <MapComponent lat={timebreak.coordinates.lat} lon={timebreak.coordinates.lon} />
                </div>
            ) : (
                <p>No se consiguió la ubicación 🌎</p>
            )}
        </div>
    );
}
