"use client";

import { useAuthContext } from "@/context/AuthContext";
import { URL_BACKEND_DEV } from "@/utils/config";
import { useEffect, useRef, useState } from "react";
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
  const [openPauseModal, setOpenPauseModal] = useState(false);
  const { pauseType } = usePauseType();
  const timersRef = useRef<
    Record<
      string,
      { intervalId: ReturnType<typeof setInterval> | null; count: number }
    >
  >({});

  const closePauseModal = () => {
    setOpenPauseModal(false);
  };

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
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createPause),
    });
    if (!response.ok) throw new Error("No se a podido crear una pausa");
    const data = await response.json();
    //console.log("pausa", data);
    //agrego la pausa
    setSignings((prev) =>
      prev
        ? {
            ...prev,
            timebreaks: [...(prev.timebreaks || []), data.pause], // Crear una nueva referencia para timebreaks
          }
        : prev
    );
  };

  const fetchStopPause = async () => {
    const clockOut = new Date();
    const lastPause = signings?.timebreaks?.at(-1);
    const response = await fetch(
      `${URL_BACKEND_DEV}/signings/pause/stop/${lastPause?.id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clockOut: clockOut }),
      }
    );
    if (!response.ok) throw new Error("No se a podido parar la pausa");
    //setear el clockOut en el ultimo timeBreak
    setSignings((prev) =>
      prev
        ? {
            ...prev,
            timebreaks: prev.timebreaks?.map((pausa) =>
              lastPause && pausa.id === lastPause.id
                ? { ...pausa, clockOut: clockOut.toISOString() }
                : pausa
            ),
          }
        : prev
    );
  };

  const fetchFinishSignings = async () => {
    const clockOut = new Date();
    const response = await fetch(
      `${URL_BACKEND_DEV}/signings/finish/${signings?.id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clockOut: clockOut }),
      }
    );
    if (!response.ok) throw new Error("No se a podido parar la pausa");
    //setear el clockOut en el ultimo timeBreak
    setSignings((prev) =>
      prev
        ? {
            ...prev,
            clockOut: clockOut.toISOString(),
          }
        : prev
    );
  };

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
    if (timersRef.current[name]) return; // ❗ Ya existe, no hacer nada

    let clockInStr: string | null = null;
    if (name === "timeWorker") {
      clockInStr = signings?.clockIn ?? null;
    } else if (name === "timePause") {
      clockInStr = signings?.timebreaks?.at(-1)?.clockIn ?? null;
    }

    if (!clockInStr) return;

    let count = Math.floor(
      (Date.now() - new Date(clockInStr).getTime()) / 1000
    );

    const intervalId = setInterval(() => {
      count++;
      timersRef.current[name] = { intervalId, count };

      const hours = Math.floor(count / 3600);
      const minutes = Math.floor((count % 3600) / 60);
      const seconds = count % 60;

      setControlData((prev) => ({
        ...prev,
        info: prev.info.map((i) =>
          i.name === name
            ? { ...i, hour: { h: hours, m: minutes, s: seconds } }
            : i
        ),
      }));
    }, 1000);

    timersRef.current[name] = { intervalId, count };
  };

  const pauseTimer = (name: NameInfo) => {
    const timer = timersRef.current[name];
    if (timer?.intervalId) {
      clearInterval(timer.intervalId);
      timersRef.current[name].intervalId = null;
    }
  };

  const resumeTimer = (name: NameInfo) => {
    const timer = timersRef.current[name];
    if (timer && timer.intervalId == null) {
      let count = timer.count;

      const intervalId = setInterval(() => {
        count++;
        timersRef.current[name] = { intervalId, count };

        const hours = Math.floor(count / 3600);
        const minutes = Math.floor((count % 3600) / 60);
        const seconds = count % 60;

        setControlData((prev) => ({
          ...prev,
          info: prev.info.map((i) =>
            i.name === name
              ? { ...i, hour: { h: hours, m: minutes, s: seconds } }
              : i
          ),
        }));
      }, 1000);

      timersRef.current[name] = { intervalId, count };
    }
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
        setOpenPauseModal(true);
        break;
      case "play":
        fetchStopPause();
        break;
      case "finish":
        fetchFinishSignings();
        break;
      default:
        console.error(`${name} no es un valor correcto.`);
        break;
    }
  };

  const setInfo = () => {
    if (!signings) {
      return;
    }
    const clockIn = new Date(signings.clockIn);
    const clockOut = signings.clockOut
      ? new Date(signings.clockOut)
      : new Date();
    const timeOut = new Date(clockIn.getTime() + 8 * 60 * 60 * 1000); //!mas 8 horas de momento
    let timePause = getTimePause();
    //Setear tiempo de salida
    setTimeControl(timeOut, "timeOut");

    if (timePause != 0) {
      setTimerMs(timePause, "timePause");
    }

    //time worker si no hay una pausa final se setea con la hora actual
    const differenceInMilliseconds = clockOut.getTime() - clockIn.getTime();
    setTimerMs(differenceInMilliseconds, "timeWorker");
  };

  const setTimerMs = (time: number, name: string) => {
    const totalSeconds = Math.floor(time / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    setControlData((prev) => ({
      ...prev,
      info: prev.info.map((i) =>
        i.name === name ? { ...i, hour: { h, m, s } } : i
      ),
    }));
  };

  useEffect(() => {
    //cargar los fichajes cuando se monta el componente
    fetchGetSignings();
  }, []);

  //mapear la informacion
  useEffect(() => {
    setLoadingSignings(true); // esta cargando
    //console.log("fichajes", signings);
    if (loading) {
      // Aún se están cargando los datos, no hacer nada
      return;
    }

    if (!signings) {
      // No hay fichaje iniciado
      // Mostrar botón "Comenzar"
      handlerDisableAll();
      handlerToggleDisabledControl(["start"]);
      setLoadingSignings(false);
      return;
    }

    if (signings.clockOut) {
      // Fichaje finalizado
      // Desactivar todos los botones (el usuario no puede hacer nada)
      handlerDisableAll();
      //setear todo sin contadores
      setInfo();
      setLoadingSignings(false);
      return;
    }

    // Si hay fichaje pero aún no ha finalizado
    const lastPause = signings.timebreaks?.at(-1);
    console.log(lastPause)

    if (lastPause && !lastPause.clockOut) {
      // Está en pausa activa
      // Activar botones "Reanudar" y "Finalizar"
      handlerDisableAll();
      handlerToggleDisabledControl(["play", "finish"]);
      //si la pausa es pagada se activa el timeWorker
      //Si no se para
      console.log('pausa pagada? ',lastPause)
      setRunningTimePause(true);
      //setRunningTimeWorker(lastPause.pauseType.isPaid);
      setLoadingSignings(false);
    } else {
      // No está en pausa
      setInfo();
      //empezar el contador??
      setRunningTimeWorker(true);
      setRunningTimePause(false);

      handlerDisableAll();
      handlerToggleDisabledControl(["pause", "finish"]);
      //dejar de cargar
      setLoadingSignings(false);
    }
  }, [signings]); // importante agregar `signings` como dependencia también

  //useEffect para los contadores
  useEffect(() => {
    if (runningTimeWorker) {
      if (!timersRef.current["timeWorker"]) {
        startTimer("timeWorker"); // primera vez
      } else {
        resumeTimer("timeWorker"); // continuar si estaba pausado
      }
    } else {
      pauseTimer("timeWorker");
    }
  }, [runningTimeWorker]);

  useEffect(() => {
    if (runningTimePause) {
      if (!timersRef.current["timePause"]) {
        startTimer("timePause");
      } else {
        resumeTimer("timePause");
      }
    } else {
      pauseTimer("timePause");
    }
  }, [runningTimePause]);

  return {
    signings,
    loading,
    loadingSignings,
    controlData,
    onClickControl,
    openPauseModal,
    closePauseModal,
    pauseType,
    fetchCreatePause,
  };
};
