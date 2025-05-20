import { HiOutlineClock } from "react-icons/hi";
import { LuClockAlert, LuAlarmClockCheck } from "react-icons/lu";
import { CgPlayButtonO } from "react-icons/cg";
import { FaRegCirclePause } from "react-icons/fa6";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { IoCheckmark } from "react-icons/io5";
import {
  type ControlSigningsType,
} from "@/types/signings";


//estado por defecto para los fichajes
export const controlDataState: ControlSigningsType = {
  info: [
    {
      name: "timeWorker",
      icon: {
        bgColor: "bg-secondary-300",
        color: "text-secondary-600",
        icon: HiOutlineClock,
      },
      title: "Tiempo Trabajado",
      hour: { h: 0, m: 0, s: 0 },
    },
    {
      name: "timePause",
      icon: {
        bgColor: "bg-warning-400",
        color: "text-accent-primary-600",
        icon: LuClockAlert,
      },
      title: "Tiempo pausado",
      hour: { h: 0, m: 0, s: 0 },
    },
    {
      name: "timeOut",
      icon: {
        bgColor: "bg-accent-tertiary-400",
        color: "text-accent-tertiary-600",
        icon: LuAlarmClockCheck,
      },
      title: "Hora de salida esperada",
      hour: { h: 0, m: 0, s: 0 },
    },
  ],
  controls: [
    {
      name: "start",
      disabled: false,
      hidden: false,
      icon: {
        bgColor: "bg-[#9AFF8D]",
        color: "text-[#065F46]",
        icon: CgPlayButtonO,
      },
      title: "Comenzar",
    },
    {
      name: "pause",
      disabled: true,
      hidden: false,
      icon: {
        bgColor: "bg-error-400",
        color: "text-[#9B0505]",
        icon: FaRegCirclePause,
      },
      title: "Pausar",
    },
    {
      name: "play",
      disabled: true,
      hidden: false,
      icon: {
        bgColor: "bg-success-400",
        color: "text-success-700",
        icon: GiAnticlockwiseRotation,
      },
      title: "Reanudar",
    },
    {
      name: "finish",
      disabled: true,
      hidden: false,
      icon: {
        bgColor: "bg-success-400",
        color: "text-success-700",
        icon: IoCheckmark,
      },
      title: "Finalizar",
    },
  ],
};