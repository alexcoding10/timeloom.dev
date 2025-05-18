"use client";

import { useAuthContext } from "@/context/AuthContext";
import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useState } from "react";
import { HiOutlineClock } from "react-icons/hi";
import { LuClockAlert, LuAlarmClockCheck } from "react-icons/lu";
import { CgPlayButtonO } from "react-icons/cg";
import { FaRegCirclePause } from "react-icons/fa6";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { IoCheckmark } from "react-icons/io5";
import type { ControlSigningsType } from "@/types/signings";

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

export const useSignings = () => {
  const [controlData, setControlData] = useState(controlDataState);
  const { user } = useAuthContext();
  const [signings, setSignings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchGetSignings = async () => {
    setLoading(true);
    const response = await fetch(
      `${URL_BACKEND_DEV}/signings/user/${user.id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      setError("No se ha podido obtener los fichajes");
      console.error("No se ha podido obtener los mensajes");
      setLoading(false);
      return;
    }
    const data = await response.json();
    setSignings(data); // seteo los fichajes
    setError("");
    setLoading(false);
  };

  const getControl = (name: string) => {
    return controlData.controls.find((control) => control.name === name);
  };

  const handlerToggleDisabledControl = (names: string[]) => {
    //Funcion que cambiara al valor contrario el disable de los
    //controles que se pasen por parametro.
    setControlData((prev) => ({
      ...prev,
      controls: prev.controls.map((control) =>
        names.includes(control.name)
          ? { ...control, disabled: !control.disabled }
          : control
      ),
    }));
  };

  const onClickControl = (name: string) => {
    switch (name) {
      case "start":
        console.log(signings);
        const control = getControl(name);
        if (control && control.disabled) {
          return; //solo puede hacer la accion una vez
        }
        handlerToggleDisabledControl(["start", "pause", "finish"]);
        break;
      case "pause":
        handlerToggleDisabledControl(["pause", "play"]);
        break;
      case "play":
        handlerToggleDisabledControl(["pause", "play"]);
        break;
      case "finish":
        break;
      default:
        console.error(`${name} no es un valor correcto.`);
        break;
    }
  };

  useEffect(() => {
    //cargar los fichajes cuando se monta el componente
    fetchGetSignings();
  }, []);

  return { signings, loading , controlData , onClickControl };
};
