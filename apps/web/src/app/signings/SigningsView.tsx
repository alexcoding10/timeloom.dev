'use client'
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import ClockView from "@/components/signings/ClockView";
import ControlSignings from "@/components/signings/ControlSignings";
import { useSigningsContext } from "@/context/SigningsContext";
import React from "react";

export default function SigningsView() {
  const {loadingSignings:loading} = useSigningsContext()

  if(loading){
    return(
      <Loading/>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[auto_1fr] gap-5 h-full">
      <div>
        <ClockView />
      </div>
      <div className="col-start-1">
        <ControlSignings />
      </div>
      <div className="lg:row-span-2 lg:row-start-1 lg:col-start-2">
        <Container>HOla</Container>
      </div>
    </div>
  );
}
