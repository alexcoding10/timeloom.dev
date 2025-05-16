import Container from "@/components/Container";
import ClockView from "@/components/signings/ClockView";
import ControlSignings from "@/components/signings/ControlSignings";
import React from "react";

export default function SigningsView() {
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
