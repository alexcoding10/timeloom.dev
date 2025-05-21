'use client'
import Loading from "@/components/Loading";
import ClockView from "@/components/signings/ClockView";
import ControlSignings from "@/components/signings/ControlSignings";
import { useSigningsContext } from "@/context/SigningsContext";
import React from "react";
import ModalPause from "./components/ModalPause";
import DetailSignings from "./components/DetailSignings";

export default function SigningsView() {
  const { loadingSignings: loading } = useSigningsContext()

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
        <DetailSignings/>
      </div>
    </div>

  );
}
