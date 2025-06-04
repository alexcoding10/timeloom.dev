import { URL_BACKEND_DEV } from '@/utils/config'
import React from 'react'

type Props = {
    name: string,
    url?: string | null
    connected?:boolean
    width?:string
}

export default function Avatar({ name, url,connected,width }: Props) {
    return (
        <div className='flex items-center'>
            {
                url ? (
                    <img
                        className={` ${width ? `${width} h-auto` :'w-10 h-10 md:w-12 md:h-12 lg:w-15 lg:h-15'} rounded-full border border-zinc-200  transition-all duration-300 ${connected ? 'ring-2 ring-success-600':''}`}
                        src={`${URL_BACKEND_DEV}${url}`}
                        alt="user"
                    />
                ) : (
                    <div className={`w-10 h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 rounded-full bg-neutral-dark-400 border border-zinc-200 flex items-center justify-center  transition-all duration-300 ${connected ? 'ring-2 ring-success-600':''}`}>
                        <p className="text-white font-bold text-lg">
                            {name.substring(0, 2).toUpperCase()}
                        </p>
                    </div>
                )
            }

        </div>
    )
}
