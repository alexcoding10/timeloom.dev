'use client'
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import ClockView from "@/components/signings/ClockView";
import ControlSignings from "@/components/signings/ControlSignings";
import { useSigningsContext } from "@/context/SigningsContext";
import React, { useEffect } from "react";
import ModalPause from "./components/ModalPause";

export default function SigningsView() {
  const { loadingSignings: loading, signings } = useSigningsContext()
  useEffect(() => {
    console.log(signings) //solo para dev
  }, [])

  const formatDate = (date: string): string => {
    const parsedDate = new Date(date);

    // Obtener las partes de la fecha y hora
    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    const seconds = parsedDate.getSeconds().toString().padStart(2, '0');
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Los meses son 0-indexados
    const year = parsedDate.getFullYear();

    // Formatear la fecha como hh:mm:ss dd/mm/yyyy
    return `${hours}:${minutes}:${seconds}`;
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr]  grid-rows-[auto_1fr] gap-5">
      <ModalPause />
      <div className="min-w-[370px] lg:max-w-[400px] ">
        <ClockView />
      </div>
      <div className="min-w-[370px] lg:max-w-[400px]  col-start-1">
        <ControlSignings />
      </div>
      <div className="lg:row-span-2 lg:row-start-1  lg:col-start-2 min-w-[370px]">
        <Container>
          <h1 className="text-xl font-bold font-montserrat text-neutral-dark-400 w-full text-start px-4">Detalles de mi fichaje</h1>
          <div>
            <label className="grid grid-cols-[150px_auto]">
              <p>Hora de entrada: </p>
              <p className="font-semibold">
                {signings?.clockIn ? formatDate(signings?.clockIn) : 'Aun no has comenzado'}
              </p>
            </label>
            <label className="grid grid-cols-[150px_auto]">
              <p>Hora de salida:</p>
              <p className="font-semibold">
                {signings?.clockOut ? formatDate(signings?.clockOut) : 'En proceso'}
              </p>
            </label>
          </div>
        </Container>
      </div>
    </div>

  );
}
