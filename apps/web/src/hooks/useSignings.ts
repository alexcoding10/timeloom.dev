"use client";

import { useAuthContext } from "@/context/AuthContext";
import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useState } from "react";
import { CreateTimeBreak, NameInfo, TimeEntry } from "@/types/signings";
import { getLocation } from "@/utils/navigator";
import { usePauseType } from "./usePauseType";
import { controlDataState } from "@/state/signings.state";


export const useSignings = () => {
  const [controlData, setControlData] = useState(controlDataState);
  const { user } = useAuthContext();
  const [signings, setSignings] = useState<TimeEntry | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingSignings, setLoadingSignings] = useState(true);
  const [runningTimeWorker, setRunningTimeWorker] = useState(false);
  const [runningTimePause, setRunningTimePause] = useState(false);
  const [openPauseModal, setOpenPauseModal] = useState(false)
  const { pauseType } = usePauseType()


  const closePauseModal = () => {
    setOpenPauseModal(false)
  }

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
        clockIn: new Date().toISOString(),
        userId: user.id,
        coordinates: coordinates,
      };

      const response = await fetch(
        `${URL_BACKEND_DEV}/signings/start/${user.id}`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al iniciar fichaje");
      }

      const responseData = await response.json();
      setSignings(responseData);

      // Ahora puedes llamar a startTimer sin problemas
      startTimer("timeWorker");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Hubo un error:", error.message);
      } else {
        console.error("Hubo un error desconocido:", error);
      }
    }
  };

  const fetchCreatePause = async (createPause: CreateTimeBreak) => {
    const response = await fetch(`${URL_BACKEND_DEV}/signings/pause`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createPause)
    })
    if (!response.ok) throw new Error('No se a podido crear una pausa')
    const data = await response.json()
    console.log('pausa', data)
    //agrego la pausa
    setSignings(prev =>
      prev ? {
        ...prev,
        timebreaks: [...(prev.timebreaks || []), data.pause]  // Crear una nueva referencia para timebreaks
      } : prev
    );

  }

  const fetchStopPause = async () => {
    const clockOut = new Date()
    const lastPause = signings?.timebreaks?.at(-1)
    const response = await fetch(`${URL_BACKEND_DEV}/signings/pause/stop/${lastPause?.id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clockOut: clockOut })
    })
    if (!response.ok) throw new Error('No se a podido parar la pausa')
    const data = await response.json();
    //setear el clockOut en el ultimo timeBreak
    setSignings(prev =>
      prev ? {
        ...prev,
        timebreaks: prev.timebreaks?.map(pausa =>
          lastPause && (pausa.id === lastPause.id) ?
            { ...pausa, clockOut: clockOut.toISOString() } : pausa
        )
      } : prev

    )

  }


  const fetchFinishSignings = async () => {
    const clockOut = new Date()
    const response = await fetch(`${URL_BACKEND_DEV}/signings/finish/${signings?.id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clockOut: clockOut })
    })
    if (!response.ok) throw new Error('No se a podido parar la pausa')
    const data = await response.json();
    //setear el clockOut en el ultimo timeBreak
    setSignings(prev =>
      prev ? {
        ...prev,
        clockOut: clockOut.toISOString()
      } : prev

    )
  }

  const getControl = (name: string) => {
    return controlData.controls.find((control) => control.name === name);
  };

  const handlerToggleDisabledControl = (names: string[], value?: boolean) => {
    //Funcion que cambiara al valor contrario el disable de los
    //controles que se pasen por parametro.
    setControlData((prev) => ({
      ...prev,
      controls: prev.controls.map((control) =>
        names.includes(control.name)
          ? { ...control, disabled: value ? value : !control.disabled }
          : control
      ),
    }));
  };

  const handlerDisableAll = () => {
    setControlData((prev) => ({
      ...prev,
      controls: prev.controls.map((control) => ({
        ...control,
        disabled: true,
      })),
    }));
  };

  const startTimer = (name: NameInfo) => {

    let clockInStr: string | null = null;

    if (name === 'timeWorker') {
      clockInStr = signings?.clockIn ?? null;
    } else if (name === 'timePause' && runningTimePause) {
      clockInStr = signings?.timebreaks?.at(-1)?.clockIn ?? null;
    }

    if (!clockInStr) return;

    const clockIn = new Date(clockInStr).getTime();
    const now = Date.now();

    // Cálculo de la diferencia de tiempo inicial
    const initialDiffSeconds = Math.floor((now - clockIn) / 1000);

    let count = initialDiffSeconds; // Comienza con la diferencia ya calculada

    // Establecer el intervalo
    const intervalId = setInterval(() => {
      count++; // Incrementa el contador por cada intervalo de 1 segundo

      const hours = Math.floor(count / 3600); // Calcular las horas
      const minutes = Math.floor((count % 3600) / 60); // Calcular los minutos
      const seconds = count % 60; // Calcular los segundos restantes

      // Actualizar el estado de controlData para mostrar la hora correctamente
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
    }, 1000); // Cada segundo

    return intervalId; // Retorna el intervalId para limpiarlo luego si es necesario
  };

  const getTimePause = () => {
    let timePause = 0;
    // obtener el tiempo en pausa
    if (signings && signings.timebreaks && signings.timebreaks?.length != 0) {
      signings.timebreaks.forEach((pausa) => {
        if (pausa.clockOut) {
          const start = new Date(pausa.clockIn);
          const end = new Date(pausa.clockOut);
          timePause += end.getTime() - start.getTime(); // tiempo en ms
        } else {
          //esta en una pausa por lo que debe seguir
          const start = new Date(pausa.clockIn);
          const end = new Date();
          timePause += end.getTime() - start.getTime(); // tiempo en ms
        }
      });
    }

    return timePause;
  };

  const setTimeControl = (data: Date, name: NameInfo) => {
    const h = data.getHours();
    const m = data.getMinutes();
    const s = data.getSeconds();

    setControlData((prev) => ({
      ...prev,
      info: prev.info.map((i) =>
        i.name === name ? { ...i, hour: { h, m, s } } : i
      ),
    }));
  };

  const onClickControl = (name: string) => {
    const control = getControl(name);
    if (control && control.disabled) {
      return; // si esta desactivado no tiene accion
    }
    switch (name) {
      case "start":
        fetchStartSigning();
        break;
      case "pause":
        setOpenPauseModal(true)
        break;
      case "play":
        fetchStopPause()
        break;
      case "finish":
        fetchFinishSignings()
        break;
      default:
        console.error(`${name} no es un valor correcto.`);
        break;
    }
  };


  const setInfo = () =>{
    if(!signings){
      return
    }
      const clockIn = new Date(signings.clockIn);
      const clockOut = signings.clockOut ? new Date(signings.clockOut) : null
      const timeOut = new Date(clockIn.getTime() + 8 * 60 * 60 * 1000); //!mas 8 horas de momento
      let timePause = getTimePause();
      //Setear tiempo de salida
      setTimeControl(timeOut, "timeOut");

      if (timePause != 0) {
        const pauseAsDate = new Date(timePause);
        //seta las pausa
        setTimeControl(pauseAsDate, "timePause");
      }

      if(clockOut){
        const differenceInMilliseconds = clockOut.getTime() - clockIn.getTime();
        const difference = new Date(differenceInMilliseconds)
        setTimeControl(difference,'timeWorker')
      }
  }

  useEffect(() => {
    //cargar los fichajes cuando se monta el componente
    fetchGetSignings();
  }, []);

  //mapear la informacion
  useEffect(() => {
    setLoadingSignings(true); // esta cargando
    console.log("fichajes", signings);
    if (loading) {
      // Aún se están cargando los datos, no hacer nada
      return;
    }

    if (!signings) {
      // No hay fichaje iniciado
      // Mostrar botón "Comenzar"
      handlerDisableAll()
      handlerToggleDisabledControl(['start'])
      setLoadingSignings(false);
      return;
    }

    if (signings.clockOut) {
      // Fichaje finalizado
      // Desactivar todos los botones (el usuario no puede hacer nada)
      handlerDisableAll()
      //setear todo sin contadores
      setInfo()
      setLoadingSignings(false);
      return;
    }

    // Si hay fichaje pero aún no ha finalizado
    const lastPause = signings.timebreaks?.at(-1);

    if (lastPause && !lastPause.clockOut) {
      // Está en pausa activa
      // Activar botones "Reanudar" y "Finalizar"
      handlerDisableAll()
      handlerToggleDisabledControl(['play', 'finish'])
      setRunningTimePause(true);
      setRunningTimeWorker(false);
      setLoadingSignings(false);
    } else {
      // No está en pausa
      setInfo()
      //empezar el contador??
      setRunningTimeWorker(true);
      setRunningTimePause(false);

      handlerDisableAll()
      handlerToggleDisabledControl(['pause', 'finish'])
      //dejar de cargar
      setLoadingSignings(false);
    }
  }, [signings]); // importante agregar `signings` como dependencia también

  //useEffect para los contadores
  useEffect(() => {
    if (runningTimeWorker) {
      startTimer("timeWorker");
    } else {
      //para crono
    }
  }, [runningTimeWorker]);

  useEffect(() => {
    if (runningTimePause) {
      startTimer("timePause");
    } else {
      //parar crono
    }
  }, [runningTimePause]);

  return { signings, loading, loadingSignings, controlData, onClickControl, openPauseModal, closePauseModal, pauseType, fetchCreatePause };
};
