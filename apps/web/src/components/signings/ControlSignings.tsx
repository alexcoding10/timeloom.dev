import React from 'react'
import type { ControlSigningsType } from '@/types/signings'
import { HiOutlineClock } from "react-icons/hi";
import { LuClockAlert, LuAlarmClockCheck } from "react-icons/lu";
import { CgPlayButtonO } from "react-icons/cg";
import { FaRegCirclePause } from "react-icons/fa6";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { IoCheckmark } from "react-icons/io5";
import Container from '../Container';

export default function ControlSignings() {

    const controlData: ControlSigningsType = {
        info: [
            {
                icon: {
                    bgColor: "bg-secondary-300",
                    color: "text-secondary-600",
                    icon: HiOutlineClock
                },
                title: "Tiempo Trabajado",
                hour: { h: 0, m: 0, s: 0 }
            },
            {
                icon: {
                    bgColor: "bg-warning-400",
                    color: "text-accent-primary-600",
                    icon: LuClockAlert
                },
                title: "Tiempo pausado",
                hour: { h: 0, m: 0, s: 0 }
            },
            {
                icon: {
                    bgColor: "bg-accent-tertiary-400",
                    color: "text-accent-tertiary-600",
                    icon: LuAlarmClockCheck
                },
                title: "Hora de salida esperada",
                hour: { h: 0, m: 0, s: 0 }
            }
        ],
        controls: [
            {
                disabled: false,
                hidden: false,
                icon: {
                    bgColor: "bg-success-400",
                    color: "text-success-700",
                    icon: CgPlayButtonO
                },
                title: "Comenzar",
                action: () => { }
            },
            {
                disabled: false,
                hidden: false,
                icon: {
                    bgColor: "bg-error-400",
                    color: "text-[#9B0505]",
                    icon: FaRegCirclePause
                },
                title: "Pausar",
                action: () => { }
            }, {
                disabled: false,
                hidden: false,
                icon: {
                    bgColor: "bg-success-400",
                    color: "text-success-700",
                    icon: GiAnticlockwiseRotation
                },
                title: "Reanudar",
                action: () => { }
            }, {
                disabled: false,
                hidden: false,
                icon: {
                    bgColor: "bg-success-400",
                    color: "text-success-700",
                    icon: IoCheckmark
                },
                title: "Finalizar",
                action: () => { }
            },
        ]
    }

    return (
        <div className='w-full'>
            <div className="w-[500px] mx-auto border-2 border-zinc-200 rounded-3xl p-5 shadow-md">
                <ul className="flex flex-col gap-2">
                    {controlData.info.map(({ title, icon: { icon: Icon, bgColor, color }, hour: { h, m, s } }) => (
                        <li key={title.replace(" ", "")} className="flex  gap-3 lg:gap-5 rounded-lg items-center border-b border-b-zinc-200 py-2 px-4  hover:bg-zinc-100 transition-all">
                            <div className={`${bgColor} ${color} p-2 rounded-lg`}>
                                <Icon size={48} />
                            </div>
                            <div>
                                <h1 className="font-montserrat text-base lg:text-xl text-neutral-dark-400">{title}</h1>
                                <p className="text-lg lg:text-2xl font-bold font-montserrat text-neutral-dark-400">{h}h {m}m {s}s</p>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    )
}
