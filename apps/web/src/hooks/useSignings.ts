"use client";

import { useAuthContext } from "@/context/AuthContext";
import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useRef, useState } from "react";
import { HiOutlineClock } from "react-icons/hi";
import { LuClockAlert, LuAlarmClockCheck } from "react-icons/lu";
import { CgPlayButtonO } from "react-icons/cg";
import { FaRegCirclePause } from "react-icons/fa6";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { IoCheckmark } from "react-icons/io5";
import { NameInfo, TimeEntry, type ControlSigningsType } from "@/types/signings";
import { getLocation } from "@/utils/navigator";
import { Preahvihear } from "next/font/google";

//estado por defecto 
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
  const [signings, setSignings] = useState<TimeEntry | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingSignings, setLoadingSignings] = useState(true)

  const [isRunning, setIsRunning] = useState({
    timeWorker: false,
    timePause: false,
    timeOut: false
  })

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
    setSignings(data[0]); // seteo los fichajes
    setError("");
    setLoading(false);
  };




  const fetchStartSigning = async () => {
    try {
      // Obtener coordenadas
      const coordinates = await getLocation();

      if (!coordinates) {
        throw new Error("No se pudo obtener la ubicación.");
      }

      const data: TimeEntry = {
        clockIn: new Date(),
        userId: user.id,
        coordinates: coordinates,
      };

      const response = await fetch(`${URL_BACKEND_DEV}/signings/start/${user.id}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al iniciar fichaje");
      }

      const responseData = await response.json();
      setSignings(responseData);

      // Ahora puedes llamar a startTimer sin problemas
      startTimer('timeWorker');

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Hubo un error:", error.message);
      } else {
        console.error("Hubo un error desconocido:", error);
      }
    }
  };

  const getControl = (name: string) => {
    return controlData.controls.find((control) => control.name === name);
  };
  const getInfo = (name: string) => {
    return controlData.info.find((info) => info.name === name);
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

  const pauseTimer = (name: NameInfo) => {
    setIsRunning(prev => ({ ...prev, [name]: false }))
  }

const startTimer = (name: NameInfo) => {
    if (isRunning[name]) return;

    setIsRunning((prev) => ({ ...prev, [name]: true }));

    const timerInfo = getInfo(name)
    const initialSeconds =
      (timerInfo?.hour?.h ?? 0) * 3600 + (timerInfo?.hour?.m ?? 0) * 60 + (timerInfo?.hour?.s ?? 0);
    let count = 0;

    const intervalId = setInterval(() => {
      count++;
      const totalSeconds = initialSeconds + count;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setControlData((prev) => ({
        ...prev,
        info: prev.info.map((i) =>
          i.name === name
            ? {
                ...i,
                hour: { h: hours, m: minutes, s: seconds },
              }
            : i
        ),
      }));
    }, 1000);

    return intervalId; // útil para pausar luego con clearInterval
  };

  const setTimeControl = (data: Date, name: NameInfo) => {
    const h = data.getHours()
    const m = data.getMinutes()
    const s = data.getSeconds()

    setControlData(prev => ({
      ...prev,
      info: prev.info.map(i =>
        i.name === name
          ? { ...i, hour: { h, m, s } }
          : i),
    }))

  }

  const onClickControl = (name: string) => {
    const control = getControl(name);
    if (control && control.disabled) {
      return; // si esta desactivado no tiene accion
    }
    switch (name) {
      case "start":
        fetchStartSigning()
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

  useEffect(() => {
    // Ejecutar lógica cuando el temporizador se inicie o detenga
    for (const name in isRunning) {
      if (isRunning[name as NameInfo]) {
        const interval = startTimer(name as NameInfo);
        return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
      }
    }
  }, [isRunning]);


  //mapear la informacion
  useEffect(() => {
    setLoadingSignings(true) // esta cargando
    console.log('fichajes', signings)
    if (loading) {
      // Aún se están cargando los datos, no hacer nada
      return;
    }

    if (!signings) {
      // No hay fichaje iniciado
      // Mostrar botón "Comenzar"
      setLoadingSignings(false)
      return;
    }

    if (signings.clockOut) {
      // Fichaje finalizado
      // Desactivar todos los botones (el usuario no puede hacer nada)

      setLoadingSignings(false)
      return;
    }

    // Si hay fichaje pero aún no ha finalizado
    const lastPause = signings.timebreaks ? signings.timebreaks[signings.timebreaks.length - 1] : null;

    if (lastPause && !lastPause.clockOut) {
      // Está en pausa activa
      // Activar botones "Reanudar" y "Finalizar"

      setLoadingSignings(false)
    } else {
      // No está en pausa
      // Activar botones "Pausar" y "Finalizar"
      console.log('Esta comenzado el fichaje y deberia de estar activo las pausa y finalizar')
      //desactivar botones
      handlerToggleDisabledControl(["start", "pause", "finish"]);


      //obtener el tiempo trabajado
      setTimeControl(new Date(signings.clockIn), 'timeWorker')

      // obtener el tiempo en pausa

      //dejar de cargar
      setLoadingSignings(false)
    }

  }, [loading]); // importante agregar `signings` como dependencia también


  return { signings, loading, loadingSignings, controlData, onClickControl };
};
